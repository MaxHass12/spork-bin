const apiRouter = require('express').Router();
// require functions from './config/db' to connect to MongoDB and PostgreSQL

// invoke functions from './config/db' to connect to MongoDB and PostgreSQL

// ASCII codes for digits are 48-57
// ASCII codes for lowercase letters are 97-122

const BIN_ID_LENGTH = 7;

function getRandomChar() {
  let asciiCode;

  if (Math.random() < 0.4) {
    asciiCode = Math.floor(Math.random() * 10 + 48); 
  } else {
    asciiCode = Math.floor(Math.random() * 26 + 97); 
  }

  return String.fromCharCode(asciiCode);
}

function createNewBinID() {
  let binID = '';

  for (let i = 0; i <= 7; i++) {
    binID += getRandomChar();
  }

  return binID;
}

function binIdInUse(binID) {
  // check if `binID` already exists in the PG `bins` table
}

function isValidBinID(binID) {
  return binID.replaceAll(/[^a-z0-9]/g, '').length === BIN_ID_LENGTH;
}

// GET /api/new_bin_id (to get a new random_id)
apiRouter.get('/new_bin_id', async (req, res) => {
  let newBinID = createNewBinID();
  // implement `binIdInUse` function to talk to PG database
  while (binIdInUse(newBinID)) {
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
  if (isValidBinID) {
    //replace pgQueries method with PG method from './config/db'
    const newBin = await pgQueries.addBin(newBinID);
    res.status(201).json(newBin);
  } else {
    res.status(400).send("Invalid bin name. Bin names should only include " +
      "digits 0-9 and lowercase letters."
    )
  }
});

module.exports = apiRouter;