import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PPKS from '../models/ppksSchema.js';
import PSKS from '../models/psksSchema.js';
import { ppksData } from '../utils/ppksData.js';
import { psksData } from '../utils/psksData.js';

dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017', {
  dbName: "DINAS_SOSIAL_ACEH",
})
.then(async () => {
  console.log("Connected to database!");
  
  // Clear existing data
  await PPKS.deleteMany({});
  await PSKS.deleteMany({});

  // Insert PMKS data
  await PPKS.insertMany(ppksData);
  console.log("PPKS data inserted");

  // Insert PSKS data
  await PSKS.insertMany(psksData);
  console.log("PSKS data inserted");

  console.log("Database seeded successfully");
  mongoose.connection.close();
})
.catch((err) => {
  console.log("Error seeding database:", err);
  process.exit(1);
});