const Vehicle = require('../Models/vehicle');

class VehicleRepository {
    async save(vehicle) {
        return await Vehicle.create(vehicle);
    }

    async findById(vehicleId) {
        return await Vehicle.findOne({ vehicleId });
    }
}

module.exports = new VehicleRepository();
