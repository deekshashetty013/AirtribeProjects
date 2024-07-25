const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    vehicleId: { type: String, required: true, unique: true },
    size: { type: String, enum: ['MOTORCYCLE', 'CAR', 'BUS'], required: true },
    registrationNumber: { type: String, required: true }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
