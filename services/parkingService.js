const parkingUtils = require('../utils/parkingUtils');
const vehicleUtils = require('../utils/vehicleUtils');
const transactionUtils = require('../utils/transactionUtils.js');
const uuid = require('uuid');

class ParkingService {
    async allocateParkingSpot(vehicle) {
        const availableSpot = await parkingUtils.findAvailableSpot(vehicle.size);
        
        if (availableSpot) {
            await parkingUtils.markSpotAsOccupied(availableSpot.spotId);
            const transaction = {
                transactionId: uuid.v4(),
                vehicleId: vehicle.vehicleId,
                spotId: availableSpot.spotId,
                entryTime: Date.now()
            };

            await transactionUtils.save(transaction);
            return availableSpot.spotId;
        } else {
            throw new Error('No available parking spot');
        }
    }

    async calculateFee(vehicleId) {
        const transaction = await transactionUtils.findActiveTransactionByVehicleId(vehicleId);
        if (!transaction) throw new Error('No active transaction found for vehicle');

        const exitTime = Date.now();
        const durationInSeconds = (exitTime - transaction.entryTime) / 1000;
        const durationInHours = durationInSeconds / 3600.0;

        const vehicle = await vehicleUtils.findById(vehicleId);
        const rate = this.getRate(vehicle.size);
        const fee = durationInHours * rate;

        transaction.exitTime = exitTime;
        transaction.fee = fee;
        await transactionUtils.save(transaction);

        return fee;
    }

    async getAvailableSpot() {
        const availableSpot = await parkingUtils.findAvailableSpotsByFloor();
        return availableSpot;
    }
    getRate(size) {
        switch (size) {
            case 'MOTORCYCLE': return 1.0;
            case 'CAR': return 2.0;
            case 'BUS': return 3.0;
            default: throw new Error('Unknown vehicle size');
        }
    }
    async markSpotAsAvailable(spotId) {
        return await parkingUtils.markSpotAsAvailable(spotId);
    }
}

module.exports = new ParkingService();
