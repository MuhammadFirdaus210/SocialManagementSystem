import mongoose from "mongoose";

const manfaatSchema = new mongoose.Schema({
  NIK: {
    type: String,
    required: [true, "NIK is required"],
  },
  nomorHP: {
    type: String,
    required: [true, "Nomor HP is required"],
  },
  nomorAgendaPermohonan: {
    type: String,
    required: [true, "Nomor Agenda Permohonan is required"],
  },
  tanggalPermohonan: {
    type: Date,
    required: [true, "Tanggal Permohonan is required"],
  },
  suratKurangMampu: {
    type: String,
    required: [true, "Surat Kurang Mampu (No & TGL) is required"],
  },
  rekomendasiCamat: {
    type: String,
    required: [true, "Rekomendasi Camat (No & TGL) is required"],
  },
  bidangBantuan: {
    type: String,
    required: [true, "Bidang Bantuan is required"],
    enum: ['BECAK', 'REHAB RUMAH', 'ALAT BANTU DISABILITAS', 'JADUP'],
  },
  jenisBantuan: {
    type: String,
    required: [true, "Jenis Bantuan is required"],
  },
  verifikasiManfaat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VerifikasiManfaat'
  },
  evaluasiManfaat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EvaluasiManfaat'
  }
});

export const Manfaat = mongoose.model("Manfaat", manfaatSchema);