const binsRouter = require('express').Router();
const { connectMongoDB } = require('../config/mongoDB');
const { createPGTables, pgQueries } = require('../config/postgresDB');
const { isValidBinID, binIDInUse } = require('../utils/utils');
const MongoRequest = require('../models/mongoRequest');

connectMongoDB();
createPGTables();

binsRouter.post('/:random_id', async (req, res) => {
  const binRandomID = req.params.random_id;
  const { method, headers, body } = req;
  const timestamp = String(new Date());
  const date = timestamp.match(/[A-Z]{1}[a-z]{2} \d{2} \d{4}/)[0];
  const time = timestamp.match(/\d{2}:\d{2}:\d{2}/)[0];

  let allBins = await pgQueries.getAllBins();

  // code for testing route
  // console.log(binRandomID, method, headers, body, date, time);
  // res.status(200).send();
  
  if (isValidBinID(binRandomID) && binIDInUse(binRandomID, allBins)) {
    const newBinRequest = await pgQueries.addRequest(binRandomID, method, headers, date, time);
    const bin_id = newBinRequest.bin_id;
    const request_id = newBinRequest.id;
    const newRequestBody = new MongoRequest({ 
      request_id, 
      bin_id, 
      payload: body 
    });
    await newRequestBody.save();
    
    const requestInfo = {
      method: newBinRequest.method,
      date: newBinRequest.date,
      time: newBinRequest.time,
      headers: newBinRequest.headers,
      body: newRequestBody['payload'],
    }
    res.status(201).json(requestInfo);
  } else {
    res.status(400).send(`Couldn't complete request. Invalid bin ID (${binRandomID}) in URL`);
  }
});

module.exports = binsRouter;