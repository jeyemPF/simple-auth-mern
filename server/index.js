const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');
const BookingModel = require('./models/Booking');
const Desk = require('./models/Desk');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  
// Route to fetch all desks
// Route to fetch all desks with the number of bookings
app.get("/desks", async (req, res) => {
    try {
        // Fetch all desks
        const desks = await Desk.find();

        // Get the number of bookings for each desk
        const desksWithBookings = await Promise.all(desks.map(async desk => {
            const bookingsCount = await BookingModel.countDocuments({ desk: desk._id });
            return {
                _id: desk._id,
                name: desk.name,
                location: desk.location,
                description: desk.description,
                available: desk.available,
                bookingsCount: bookingsCount
            };
        }));

        // Send the response with desks and their bookings count
        res.json(desksWithBookings);
    } catch (error) {
        console.error('Error fetching desks:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            console.log(user); // Log the user object
            if (user) {
                if (user.password === password) {
                    res.json({
                        status: "success",
                        user: {
                            username: user.name,
                            email: user.email,
                            avatar: user.avatar // Ensure avatar is included in the response
                        }
                    });
                } else {
                    res.status(401).json("incorrect_password"); // Return 401 status code for incorrect password
                }
            } else {
                res.status(404).json("not_found"); // Return 404 status code for no records found
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json("server_error"); // Return 500 status code for server errors
        });
});

app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees)) 
    .catch(err => res.json(err));
});

// Route for booking a desk
app.post("/book", async (req, res) => {
    try {
        const { employeeId, bookingDetails } = req.body;

        const employee = await EmployeeModel.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        const bookingId = uuidv4(); // Generate unique booking ID

        const booking = new BookingModel({
            bookingId: bookingId,
            employee: employeeId,
            date: bookingDetails.date,
            time: bookingDetails.time,
            // Include other booking details like duration, notes, etc. from bookingDetails
        });

        await booking.save();

        res.json({ status: "success", booking });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Server error" });
    }
});


// Route for booking a desk
app.post("/book-desk", async (req, res) => {
    try {
        const { deskId, bookingDetails } = req.body;

        const desk = await Desk.findById(deskId);
        if (!desk) {
            return res.status(404).json({ error: "Desk not found" });
        }

        const bookingId = uuidv4(); // Generate unique booking ID

        const booking = new BookingModel({
            bookingId: bookingId,
            desk: deskId,
            date: bookingDetails.date,
            time: bookingDetails.time,
            // Include other booking details like duration, notes, etc. from bookingDetails
        });

        await booking.save(); // Save the booking to the database

        // Update the desk availability status
        desk.available = false;
        await desk.save();

        res.json({ status: "success", booking });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
