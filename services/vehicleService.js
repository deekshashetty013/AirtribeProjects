
const Vehicle = require('../Models/vehicle');

class VehicleService {
    async registerVehicle(vehicleData) {
        const { vehicleId, size, registrationNumber } = vehicleData;

        // Check if vehicle already exists
        let vehicle = await Vehicle.findOne({ vehicleId });
        if (!vehicle) {
            // Create new vehicle
        vehicle = new Vehicle({
            vehicleId,
            size,
            registrationNumber
        });

        // Save to database
        await vehicle.save();
        }
        return vehicle;
    }

    async findVehicleById(vehicleId) {
        return await Vehicle.findOne({ vehicleId });
    }
}

module.exports = new VehicleService();
