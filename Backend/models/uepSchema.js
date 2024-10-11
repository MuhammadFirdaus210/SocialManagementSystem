import mongoose from 'mongoose';

const uepSchema = new mongoose.Schema({
  nik: {
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
    enum: ['PERTANIAN PALAWIJA', 'PERTERNAKAN UNGGAS', 'PERIKANAN AIR TAWAR / ASIN', 'PERTUKANGAN PERABOTAN', 'PERBENGKELAN', 'MENJAHIT', 'KERAJINAN TANGAN / HOME INDUSTRI', 'JUALAN'],
    required: [true, "Bidang Bantuan is required"],
  },
  jenisBantuan: {
    type: String,
    required: [true, "Jenis Bantuan is required"],
  },
  alamatUsaha: {
    type: String,
    required: [true, "Alamat Usaha is required"],
  },
  verifikasiUEP: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VerifikasiUEP'
  },
  evaluasiUEP: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EvaluasiUEP'
  }
});

export const Uep = mongoose.model("Uep", uepSchema);