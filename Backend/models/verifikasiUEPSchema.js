import mongoose from "mongoose";

const verifikasiUEPSchema = new mongoose.Schema({
  tahun: {
    type: Number,
    required: true // User is required to fill in the year
  },
  jumlahBantuan: {
    type: Number,
    required: true // User must fill in the amount of assistance
  },
  sumberDana: {
    type: String,
    required: true // User must select a funding source
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', '-'],
    default: 'pending',
    required: true // User must provide the verification status
  },
  keterangan: {
    type: String,
    default: '' // Optional description field
  }
}, { timestamps: true });

export const VerifikasiUEP = mongoose.model('VerifikasiUEP', verifikasiUEPSchema);
