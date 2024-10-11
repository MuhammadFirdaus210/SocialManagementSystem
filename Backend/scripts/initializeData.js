// Backend/scripts/initializeData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Kabupaten, Kecamatan } from '../models/socialWelfareModels.js';

dotenv.config({ path: '../config/config.env' });

const kabupatenData = [
  "Aceh Barat", "Aceh Barat Daya", "Aceh Besar", "Aceh Jaya", "Aceh Selatan", 
  "Aceh Singkil", "Aceh Tamiang", "Aceh Tengah", "Aceh Tenggara", "Aceh Timur", 
  "Aceh Utara", "Bener Meriah", "Bireuen", "Gayo Lues", "Kota Banda Aceh", 
  "Kota Langsa", "Kota Lhokseumawe", "Kota Sabang", "Kota Subulussalam", 
  "Nagan Raya", "Pidie", "Pidie Jaya", "Simeulue"
];

const kecamatanData = [
    "Longkib", "Penanggalan", "Rundeng", "Simpang Kiri", "Sultan Daulat"
  ];

const initializeData = async () => {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017', {
        dbName: "DINAS_SOSIAL_ACEH",
      })
      
    console.log('MongoDB connected successfully');

    // Inisialisasi data kabupaten
    for (const name of kabupatenData) {
      const kabupaten = new Kabupaten({ name });
      await kabupaten.save();
    }

    console.log('Kabupaten data initialized successfully');

    // Inisialisasi data kecamatan
    for (const { name, kabupaten: kabupatenName } of kecamatanData) {
      const kabupaten = await Kabupaten.findOne({ name: kabupatenName });
      if (kabupaten) {
        const kecamatan = new Kecamatan({ name, kabupaten: kabupaten._id });
        await kecamatan.save();
      }
    }

    console.log('Kecamatan data initialized successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing data:', error.message);
    mongoose.connection.close();
  }
};

initializeData();