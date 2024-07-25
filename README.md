# Smart Parking Lot Management System

## Overview

This project is a backend system for a smart parking lot that manages vehicle entry and exit, parking space allocation, and fee calculation. The system assigns parking spots based on vehicle size and availability, tracks the time each vehicle spends in the parking lot, and calculates parking fees upon exit.

## Features

- **Parking Spot Allocation**: Automatically assigns an available parking spot to a vehicle based on its size (motorcycle, car, bus).
- **Check-In and Check-Out**: Records entry and exit times of vehicles.
- **Parking Fee Calculation**: Calculates fees based on the duration of stay and vehicle type.
- **Real-Time Availability Update**: Updates the availability of parking spots in real-time as vehicles enter and leave.


## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**:
    ```bash
    git clone  https://github.com/deekshashetty013/parking.git
    cd parking
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

### Start the server

```bash
npm start
```

### API Endpoints
Vehicle Entry 
Endpoint: POST /parking/entry

Request Body:
{
  "vehicleId": "V123",
  "vehicleType": "CAR",
  "registrationNumber": "test123"
}

Vehicle Exit : 
Endpoint: POST /parking/exit/:vehicleId/:vehicleType

Parameters:

vehicleId: ID of the exiting vehicle
vehicleType: Type of the vehicle (e.g., CAR, MOTORCYCLE, BUS)
Response:


Get Available Spots : API to get the number of available spots
Endpoint: GET /parking/availablespots
