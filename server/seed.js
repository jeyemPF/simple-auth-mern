const mongoose = require('mongoose');
const Desk = require('./models/Desk');
require('dotenv').config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error
  }
}

async function checkExistingDesks() {
  try {
    const existingDesks = await Desk.find();
    return existingDesks.length > 0;
  } catch (error) {
    console.error('Error checking existing desks:', error);
    return true; // Treat as desks exist to avoid seeding
  }
}

async function generateDesks() {
  const desks = [];
  for (let i = 1; i <= 50; i++) {
    desks.push({
      name: `Desk ${i}`,
      description: `Description of Desk ${i}`,
      available: true
    });
  }
  return desks;
}

async function seedDesks() {
  try {
    await connectToDatabase();

    const desksExist = await checkExistingDesks();
    if (desksExist) {
      console.log('Desks already exist in the database. Skipping seeding.');
      return false; // Desks were not seeded because they already exist
    }

    const desksToSeed = await generateDesks();
    await Desk.create(desksToSeed);
    console.log('Desks seeded successfully.');
    return true; // Desks were successfully seeded
  } catch (error) {
    console.error('Error seeding desks:', error);
    return false; // Desks were not seeded due to an error
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

async function runSeed() {
  const desksSeeded = await seedDesks();
  console.log('Desks seeding status:', desksSeeded);
}

runSeed();
