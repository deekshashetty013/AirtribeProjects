const Transaction = require('../Models/transaction');

class TransactionRepository {
    async save(transaction) {
        return await Transaction.create(transaction);
    }

    async findActiveTransactionByVehicleId(vehicleId) {
        return await Transaction.findOne({ vehicleId, exitTime: null });
    }

    async findOccupiedSpots() {
        return await Transaction.distinct('spotId', { exitTime: null });
    }

    async getSpotIdByVehicleId(vehicleId) {
        // Find the active transaction by vehicleId
        const transaction = await Transaction.findOne({vehicleId});

        if (transaction) {
            // Return the spotId from the found transaction
            return transaction.spotId;
        } else {
            throw new Error('No active transaction found for the vehicle');
        }
    }
}

module.exports = new TransactionRepository();
