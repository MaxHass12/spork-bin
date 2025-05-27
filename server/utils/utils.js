const BIN_ID_LENGTH = 7;

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

  for (let i = 1; i <= BIN_ID_LENGTH; i++) {
    binID += getRandomChar();
  }

  return binID;
}

function binIDInUse(binID, allBins) {
  let allBinIDs = allBins.map(bin => bin.random_id);
  return allBinIDs.includes(binID);
}

function isValidBinID(binID) {
  return binID.replaceAll(/[^a-z0-9]/g, '').length === BIN_ID_LENGTH;
}

module.exports = {
  BIN_ID_LENGTH,
  getRandomChar,
  createNewBinID,
  binIDInUse,
  isValidBinID,
};