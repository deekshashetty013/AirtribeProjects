const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkingSpotSchema = new Schema({
    spotId: { type: String, required: true, unique: true },
    floor: { type: Number, required: true },
    size: { type: String, enum: ['MOTORCYCLE', 'CAR', 'BUS'], required: true },
    isOccupied: { type: Boolean, default: false }
});

module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema);
