const apiRouter = require('express').Router();
const { connectMongoDB } = require('../config/mongoDB');
const { createPGTables, pgQueries } = require('../config/postgresDB');
const { createNewBinID, binIDInUse, isValidBinID } = require('../utils/utils');
const { MongoRequest } = require('../models/mongoRequest');

connectMongoDB();
// createPGTables();

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

apiRouter.get('/bins/:id', async (req, res) => {
  const binID = req.params.id;
  const bin = await pgQueries.getBin(binID);
  if (bin) {
    const requests = await pgQueries.getAllRequests(binID);
    const requestBodies = await MongoRequest.find({ bin_id: binID });
    // function to stitch all data together for all requests in the bin
    res.json(binData);
  } else {
    res.status(404).send(`Bin "${binID}" could not be found.`);
  }
});

apiRouter.delete('/bins/:id', async (req, res) => {
  const binID = req.params.id;
  const bin = await pgQueries.getBin(binID);
  if (bin) {
    await pgQueries.deleteBin(binID);
    // revise deleteMany if we decide to do it another way
    await MongoRequest.deleteMany({ bin_id: binID });
    res.sendStatus(204);
  } else {
    res.status(404).send(`Bin "${binID}" could not be found.`);
  }
});

// // This API endpoint probably not needed - keeping for reference for now
// // GET /api/bins/:id/requests/:request_id
// // is it OK to use the request ID from the DB in the URL here?
// apiRouter.get('/bins/:id/requests/:request_id', async (req, res) => {
//   const requestID = req.params.request_id;
//   // replace pgQueries method with PG method from './config/db'
//   // how do we want to join together all of the needed bin info and requests
//   // for each bin, and return that all together?
//   const request = await pgQueries.getRequest(requestID);
//   if (request) {
//     let { method, date, time, headers } = request;
//     // replace mongo_id with actual PG attribute, replace body with actual MD property
//     const requestBody = await MongoRequest.findbyId(request.mongo_id)['body'];
//     const requestInfo = {
//       method: method,
//       date: date,
//       time: time,
//       headers: headers,
//       body: requestBody,
//     }
//     res.json(requestInfo);
//   } else {
//     res.status(404).send('Request could not be found.');
//   }
// });

module.exports = apiRouter;
