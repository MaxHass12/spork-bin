const binsRouter = require('express').Router();
const { isValidBinID, binIDInUse } = require('../utils/utils');
// require functions from './config/db' to connect to MongoDB and PostgreSQL

// invoke functions from './config/db' to connect to MongoDB and PostgreSQL

// POST /bins/:id
binsRouter.post('/:id', async (req, res) => {
  const binID = req.params.id;
  const { method, headers, body } = req;
  const timestamp = String(new Date());
  const date = timestamp.match(/[A-Z]{1}[a-z]{2} \d{2} \d{4}/)[0];
  const time = timestamp.match(/\d{2}:\d{2}:\d{2}/)[0];

  // console.log(binID, method, headers, body, date, time);
  // res.status(200).send();
  
  if (isValidBinID(binID) && binIDInUse(binID)) {
    // replace MongoRequest w/ actual MongoDB model export
    const newRequestBody = new MongoRequest({ body });
    await newRequestBody.save();
    // need to add MongoID attribute to `requests` table and `addRequest` method
    const newBinRequest = await pgQueries.addRequest(binID, method, headers, date, time, newRequestBody['_id']);
    const requestInfo = {
      method: newBinRequest.method,
      date: newBinRequest.date,
      time: newBinRequest.time,
      headers: newBinRequest.headers,
      body: newRequestBody['body'],
    }
    res.status(201).json(requestInfo);
  } else {
    res.status(400).send(`Invalid bin ID (${binID}) in URL`);
  }
});

module.exports = binsRouter;