import mongoose from 'mongoose';

const evaluasiUEPSchema = new mongoose.Schema({
  statusBantuan: {
    type: String,
    required: true,
    enum: ['Tetap', 'Berjalan', 'Hilang', '-']
  },
  namaPendamping: {
    type: String,
    required: true
  },
  pekerjaanPendamping: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const EvaluasiUEP = mongoose.model('EvaluasiUEP', evaluasiUEPSchema);