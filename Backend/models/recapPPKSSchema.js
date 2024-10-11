import mongoose from 'mongoose';

const recapPPKSSchema = new mongoose.Schema({
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
    enum: [
      'Rekap PPKS',
      'Rekap PPKS Jenis Kelamin',
      'Rekap PPKS Kategori Anak',
      'Rekap PPKS Kategori Kemiskinan',
      'Rekap PPKS Kategori Disabilitas',
      'Rekap PPKS Kategori Bencana',
      'Rekap PPKS Kategori Penyakit Sosial',
      'Rekap PPKS Yang Sudah Dibantu',
      'Rekap PPKS Yang Belum Dibantu',
      'Rekap Anak Dengan Kecacatan (ADK)',
      'Rekap ADK Berdasarkan Tingkat Pendidikan',
      'Rekap ADK Berdasarkan Status Anak',
      'Rekap Orang Dengan Kecacatan Berat (ODKB)',
      'Rekap Penyandang Disabilitas (PD)',
      'Rekap PD Berdasarkan Tingkat Pendidikan',
      'Rekap Anak Yatim, Piatu, Yatim Piatu (AYPYP)',
      'Rekap AYPYP Berdasarkan Tingkat Pendidikan'
    ]
  }
}, { timestamps: true });

export const PPKSRecap = mongoose.model('PPKSRecap', recapPPKSSchema);
