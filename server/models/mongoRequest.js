const mongoose = require('mongoose');

const PayloadSchema = new mongoose.Schema({
    request_id: { type: Number, required: true },
    bin_id: { type: Number, required: true },
    payload: { type: Object },
});

module.exports = mongoose.model('MongoRequest', PayloadSchema);