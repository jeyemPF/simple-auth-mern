// seed.js

const mongoose = require('mongoose');
const Desk = require('./models/Desk');


require('dotenv').config();

async function seedDesks() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    // Check if desks already exist
    const existingDesks = await Desk.find();
    if (existingDesks.length > 0) {
      console.log('Desks already exist in the database. Skipping seeding.');
      return;
    }

    // Generate desks
    const desks = [];
    for (let i = 1; i <= 30; i++) {
      desks.push({
        name: `Desk ${i}`,
        location: `Location ${i}`,
        description: `Description of Desk ${i}`,
        available: true
      });
    }

    // Insert desks into the database
    await Desk.create(desks);
    console.log('Desks seeded successfully.');
  } catch (error) {
    console.error('Error seeding desks:', error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
}

// Call the function to seed desks
seedDesks();
