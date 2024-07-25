const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true },
    vehicleId: { type: String, required: true },
    spotId: { type: String, required: true },
    entryTime: { type: Number, required: true },
    exitTime: { type: Number },
    fee: { type: Number }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
