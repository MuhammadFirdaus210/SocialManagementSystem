import mongoose from 'mongoose';

const recapPSKSSchema = new mongoose.Schema({
  kabupatenKota: {
    type: String,
    required: [true, 'Kabupaten/Kota is required']
  },
  kecamatan: {
    type: String,
    required: [true, 'Kecamatan is required']
  },
  jenisRekapitulasi: {
    type: String,
    required: [true, 'Jenis Rekapitulasi is required'],
    enum: ['Rekap PSKS']
  }
}, { timestamps: true });

export const PSKSRecap = mongoose.model('PSKSRecap', recapPSKSSchema);
