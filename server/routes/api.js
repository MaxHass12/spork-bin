const express = require('express');
const apiRouter = express.Router();
const { connectMongoDB } = require('../config/mongoDB');
const { createPGTables, pgQueries } = require('../config/postgresDB');
const { createNewBinID, binIDInUse, isValidBinID } = require('../utils/utils');
const MongoRequest = require('../models/mongoRequest');

// apiRouter.use(express.json());

connectMongoDB();
// createPGTables();

function matchRequestBodies(requests, requestBodies) {
  requests.forEach(request => {
    const mongoBody = requestBodies.filter(reqBody => {
      return reqBody['request_id'] === request.id;
    })[0];

    console.log('mongoBody: ', mongoBody);
    
    request.body = mongoBody['payload'] || null;
  });
}

// GET /api/new_bin_id (to get a new random_id)
apiRouter.get('/new_bin_id', async (req, res) => {
  try {
    let newBinID = createNewBinID();
    const allBins = await pgQueries.getAllBins();

    while (binIDInUse(newBinID, allBins)) {
      newBinID = createNewBinID();
    }

    res.status(200).send(newBinID);
  } catch {
    res.status(500).send("Something went wrong - couldn't get new bin ID");
  }
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
  try {
    let newBinID = req.body.newBinId;
    const allBins = await pgQueries.getAllBins();

    if (isValidBinID(newBinID) && !binIDInUse(newBinID, allBins)) {
      const newBin = await pgQueries.addBin(newBinID);
      res.status(201).json(newBin);
    } else {
      res
        .status(400)
        .send(
          'Invalid bin name. Bin names should be 7 characters long and only ' +
          'include digits 0-9 and lowercase letters.'
        );
    }
  } catch {
    res.status(500).send("Something went wrong - couldn't create bin");
  }
});

apiRouter.get('/bins/:random_id', async (req, res) => {
  try {
    const binRandomID = req.params.random_id;
    const allBins = await pgQueries.getAllBins();
  
    if (isValidBinID(binRandomID) && binIDInUse(binRandomID, allBins)) {
      const requests = await pgQueries.getAllRequests(binRandomID);
      const pgBin = await pgQueries.getBin(binRandomID);
      const binPostgresID = pgBin.id;
      const requestBodies = await MongoRequest.find({ bin_id: binPostgresID });
      matchRequestBodies(requests, requestBodies);
      
      const binData = {
        random_id: binRandomID,
        requests,
      };
      res.json(binData);
    } else {
      res.status(404).send(`Bin "${binRandomID}" could not be found.`);
    }
  } catch {
    res.status(500).send("Something went wrong - couldn't get bin data");
  }
});

apiRouter.delete('/bins/:random_id', async (req, res) => {
  try {
    const binRandomID = req.params.random_id;
    const allBins = await pgQueries.getAllBins();
  
    if (isValidBinID(binRandomID) && binIDInUse(binRandomID, allBins)) {
      const pgBin = await pgQueries.getBin(binRandomID);
      const binPostgresID = pgBin.id;
      await pgQueries.deleteBin(binRandomID);
      await MongoRequest.deleteMany({ bin_id: binPostgresID });
      res.sendStatus(204);
    } else {
      res.status(404).send(`Bin "${binRandomID}" could not be found.`);
    }
  } catch {
    res.status(500).send(`Something went wrong - couldn't delete bin "${binRandomID}"`);
  }
});

module.exports = apiRouter;
