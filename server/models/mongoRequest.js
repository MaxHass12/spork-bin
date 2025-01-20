const mongoose = require('mongoose');

const PayloadSchema = new mongoose.Schema({
    request_id: { type: Number, required: true },
    payload: { type: String },
});

module.exports = mongoose.model('MongoRequest', PayloadSchema);