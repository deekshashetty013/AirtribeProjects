const ParkingSpot = require('../Models/parkingSpot');

class ParkingSpotRepository {

    async findAvailableSpot(size) {
        return await ParkingSpot.findOne({
            size,
            isOccupied: false // Check if the spot is not occupied
        }).sort({ spotId: 1 });
    }
    async markSpotAsOccupied(spotId) {
        // Update the parking spot to mark it as occupied
        return await ParkingSpot.findOneAndUpdate(
            { spotId },
            { $set: { isOccupied: true } }, // Set isOccupied to true
            { new: true } // Return the updated document
        );
    }
    async findAvailableSpotsByFloor() {
        try {
            // Get the list of occupied spots
            const occupiedSpots = await TransactionRepository.findOccupiedSpots();

            // Find all available spots and group them by floor
            const availableSpots = await ParkingSpot.find({
                spotId: { $nin: occupiedSpots }
            }).exec();

            // Group available spots by floor
            const spotsByFloor = availableSpots.reduce((acc, spot) => {
                if (!acc[spot.floor]) {
                    acc[spot.floor] = [];
                }
                acc[spot.floor].push(spot);
                return acc;
            }, {});

            return spotsByFloor;
        } catch (error) {
            console.error('Error finding available spots by floor:', error);
            throw error;
        }
    }

    async markSpotAsAvailable(spotId) {

        return await ParkingSpot.findOneAndUpdate(
            { spotId },
            { $set: { isOccupied: false } },  // Assuming there is an isOccupied field
            { new: true }
        );
    }

}

module.exports = new ParkingSpotRepository();
