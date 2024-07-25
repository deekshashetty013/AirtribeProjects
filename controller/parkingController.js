const parkingService = require('../services/parkingService');
const transactionUtils= require('../utils/transactionUtils');
const VehicleService = require('../services/vehicleService');

class ParkingController {
    async vehicleEntry(req, res) {
        try {
            const vehicleData = req.body;

            // Register the vehicle if not already registered
            await VehicleService.registerVehicle(vehicleData);

            // Allocate parking spot
            const spotId = await parkingService.allocateParkingSpot(vehicleData);
            res.status(200).json({ message: `Allocated spot: ${spotId}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async vehicleExit(req, res) {
        const { vehicleId, vehicleType } = req.params;

        try {
            const spotId = await transactionUtils.getSpotIdByVehicleId(vehicleId);
            const fee = await parkingService.calculateFee(vehicleId, vehicleType);
             // Remove the transaction
            await parkingService.markSpotAsAvailable(spotId);
            res.status(200).json({ message: `Parking fee: $${fee.toFixed(2)}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAvailableSpotsByFloor(req, res) {
        try {
            const spotsByFloor = await parkingService.getAvailableSpot();
            res.status(200).json(spotsByFloor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ParkingController();
