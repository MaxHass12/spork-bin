const apiRouter = require('express').Router();
const { connectMongoDB } = require('../config/mongoDB');
const { createPGTables, pgQueries } = require('../config/postgresDB');
const { createNewBinID, binIDInUse, isValidBinID } = require('../utils/utils');
const MongoRequest = require('../models/mongoRequest');
const { request } = require('express');

connectMongoDB();
// createPGTables();

function matchRequestBodies(requests, requestBodies) {
  // for (let i = 0; i < requests.length; i++) {
  //   console.log('request ID: ', requests[i].id);
    
  //   const mongoBody = await MongoRequest.find({ request_id: requests[i].id });
  //   console.log('mongo body: ', mongoBody);
  // }
  
  requests.forEach((request) => {
    const mongoBody = requestBodies.filter(reqBody => 
      reqBody['request_id'] === request.id
    )[0];
    // console.log('body: ', body);
    
    request.body = mongoBody['payload'];
  });
}

// GET /api/new_bin_id (to get a new random_id)
apiRouter.get('/new_bin_id', async (req, res) => {
  let newBinID = createNewBinID();
  let allBins = await pgQueries.getAllBins();

  while (binIDInUse(newBinID, allBins)) {
    newBinID = createNewBinID();
  }

  res.send(newBinID);
});

apiRouter.get('/bins', async (req, res) => {
  try {
    const bins = await pgQueries.getAllBins();
    res.json(bins);
  } catch (error) {
    res.status(500).send("Something went wrong - couldn't get bins");
  }
});

apiRouter.post('/bins', async (req, res) => {
  console.log('POST /api/bins', req.body); // Inserted for debugging
  let newBinID = req.body.newBinId;
  let allBins = await pgQueries.getAllBins();
  if (isValidBinID(newBinID) && !binIDInUse(newBinID, allBins)) {
    const newBin = await pgQueries.addBin(newBinID);
    res.status(201).json(newBin);
  } else {
    res
      .status(400)
      .send(
        'Invalid bin name. Bin names should only include ' +
          'digits 0-9 and lowercase letters.'
      );
  }
});

apiRouter.get('/bins/:random_id', async (req, res) => {
  const binRandomID = req.params.random_id;
  let allBins = await pgQueries.getAllBins();
  
  if (isValidBinID(binRandomID) && binIDInUse(binRandomID, allBins)) {
    const requests = await pgQueries.getAllRequests(binRandomID);
    // console.log('requests: ', requests);
    const pgBin = await pgQueries.getBin(binRandomID);
    const binPostgresID = pgBin.id;
    const requestBodies = await MongoRequest.find({ bin_id: binPostgresID });
    // console.log('request bodies: ', requestBodies);
    matchRequestBodies(requests, requestBodies);
    const binData = {
      random_id: binRandomID,
      requests,
    };
    res.json(binData);
  } else {
    res.status(404).send(`Bin "${binRandomID}" could not be found.`);
  }
});

apiRouter.delete('/bins/:random_id', async (req, res) => {
  const binRandomID = req.params.random_id;
  let allBins = await pgQueries.getAllBins();

  if (isValidBinID(binRandomID) && binIDInUse(binRandomID, allBins)) {
    const pgBin = await pgQueries.getBin(binRandomID);
    const binPostgresID = pgBin.id;
    await pgQueries.deleteBin(binRandomID);
    await MongoRequest.deleteMany({ bin_id: binPostgresID });
    res.sendStatus(204);
  } else {
    res.status(404).send(`Bin "${binRandomID}" could not be found.`);
  }
});

module.exports = apiRouter;
