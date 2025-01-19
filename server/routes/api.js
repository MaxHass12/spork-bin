const apiRouter = require('express').Router();
// require functions from './config/db' to connect to MongoDB and PostgreSQL

// invoke functions from './config/db' to connect to MongoDB and PostgreSQL

// ASCII codes for digits are 48-57
// ASCII codes for lowercase letters are 97-122
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

// GET /api/new_bin_id (to get a new random_id)
apiRouter.get('/new_bin_id', async (req, res) => {
  let newBinID = createNewBinID();
  // implement `binIdInUse` function to talk to PG database
  while (binIdInUse(newBinID)) {
    newBinID = createNewBinID();
  }
  res.send(newBinID);
});

module.exports = apiRouter;