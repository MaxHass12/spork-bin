const apiRouter = require('express').Router();
const { 
  createNewBinID, 
  binIDInUse, 
  isValidBinID
} = require('./utils/utils');
// require functions from './config/db' to connect to MongoDB and PostgreSQL

// invoke functions from './config/db' to connect to MongoDB and PostgreSQL

// GET /api/new_bin_id (to get a new random_id)
apiRouter.get('/new_bin_id', async (req, res) => {
  let newBinID = createNewBinID();
  // implement `binIdInUse` function to talk to PG database
  while (binIDInUse(newBinID)) {
    newBinID = createNewBinID();
  }
  res.send(newBinID);
});

// GET /api/bins
apiRouter.get('/bins', async (req, res) => {
  try {
    // replace pgQueries.getAllBins() with PG method from './config/db'
    const bins = await pgQueries.getAllBins();
    res.json(bins);
  } catch (error) {
    res.status(500).send("Something went wrong - couldn't get bins");
  }
});

// POST /api/bins 
apiRouter.post('/bins', async (req, res) => {
  let { newBinID } = req.body;
  if (isValidBinID(newBinID)) {
    //replace pgQueries method with PG method from './config/db'
    const newBin = await pgQueries.addBin(newBinID);
    res.status(201).json(newBin);
  } else {
    res.status(400).send("Invalid bin name. Bin names should only include " +
      "digits 0-9 and lowercase letters."
    )
  }
});

// GET /api/bins/:id
apiRouter.get('/bins/:id', async (req, res) => {
  const binID = req.params.id;
  // replace pgQueries method with PG method from './config/db'
  // how do we want to join together all of the needed bin info and requests
  // for each bin, and return that all together?
  const bin = await pgQueries.getBin(binID);
  if (bin) {
    res.json(bin);
  } else {
    res.status(404).send(`Bin "${binID}" could not be found.`);
  }
});

// DELETE /api/bins/:id
apiRouter.delete('/bins/:id', async (req, res) => {
  const binID = req.params.id;
  // replace pgQueries method with PG method from './config/db'
  // how do we want to delete on cascade all of the requisite bin info from
  // both PG and MD?
  const bin = await pgQueries.getBin(binID);
  if (bin) {
    await pgQueries.deleteBin(binID);
    res.sendStatus(204);
  } else {
    res.status(404).send(`Bin "${binID}" could not be found.`);
  }
});

// GET /api/bins/:id/requests/:request_id
// is it OK to use the request ID from the DB in the URL here? 
apiRouter.get('/bins/:id/requests/:request_id', async (req, res) => {
  const requestID = req.params.request_id;
  // replace pgQueries method with PG method from './config/db'
  // how do we want to join together all of the needed bin info and requests
  // for each bin, and return that all together?
  const request = await pgQueries.getRequest(requestID);
  if (request) {
    let { method, date, time, headers } = request;
    // replace MongoRequest with actual MongoDB model export
    // replace mongo_id with actual PG attribute, replace body with actual MD property
    const requestBody = await MongoRequest.findbyId(request.mongo_id)['body'];
    const requestInfo = {
      method: method,
      date: date,
      time: time,
      headers: headers,
      body: requestBody,
    }
    res.json(requestInfo);
  } else {
    res.status(404).send('Request could not be found.');
  }
});

module.exports = apiRouter;