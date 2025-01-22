const binsRouter = require('express').Router();
const { connectMongoDB } = require('../config/mongoDB');
const { createPGTables, pgQueries } = require('../config/postgresDB');
const { isValidBinID, binIDInUse } = require('../utils/utils');
const MongoRequest = require('../models/mongoRequest');

connectMongoDB();
createPGTables();

function extractRequestData(req) {
  const binRandomID = req.params.random_id;
  const { method, headers, originalUrl, body } = req;

  const timestamp = String(new Date());
  const date = timestamp.match(/[A-Z]{1}[a-z]{2} \d{2} \d{4}/)[0];
  const time = timestamp.match(/\d{2}:\d{2}:\d{2}/)[0];

  return {
    binRandomID,
    method,
    headers,
    path: originalUrl,
    date,
    time,
    body,
  };
}

function formatRequestData(pgBinRequest, mongoRequestBody) {
  let body = mongoRequestBody['payload'];
  console.log('body from format: ', body);
  
  if (!body || Object.keys(body).length === 0) {
    body = null;
  } 
  
  return {
    method: pgBinRequest.method,
    headers: pgBinRequest.headers,
    path: pgBinRequest.path,
    date: pgBinRequest.date,
    time: pgBinRequest.time,
    body: body,
  };
}

binsRouter.all('/:random_id([a-z0-9]{7})', async (req, res) => {
  try {
    const { binRandomID, method, headers, path, date, time, body } = extractRequestData(req);
    const allBins = await pgQueries.getAllBins();
    
    if (isValidBinID(binRandomID) && binIDInUse(binRandomID, allBins)) {
      const newBinRequest = await pgQueries.addRequest(
        binRandomID, method, headers, path, date, time
      );

      const newRequestBody = new MongoRequest({ 
        request_id: newBinRequest.id, 
        bin_id: newBinRequest.bin_id, 
        payload: body, 
      });
      await newRequestBody.save();
      
      const requestInfo = formatRequestData(newBinRequest, newRequestBody);
      res.status(200).json(requestInfo);
    } else {
      res.status(400).send(`Couldn't complete request. Invalid bin ID ` +
        `(${binRandomID}) in URL`);
    }
  } catch {
    res.status(500).send('Server error');
  } 
});

module.exports = binsRouter;