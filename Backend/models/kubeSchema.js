import mongoose from "mongoose";

const kubeSchema = new mongoose.Schema({
  namaKelompok: {
    type: String,
    required: [true, "Nama Kelompok is required"],
  },
  nomorHP: {
    type: String,
    required: [true, "Nomor HP is required"],
  },
  NIKKetua: {
    type: String,
    required: [true, "NIK Ketua is required"],
  },
  nomorAgendaPermohonan: {
    type: String,
    required: [true, "Nomor Agenda Permohonan is required"],
  },
  NIKSekretaris: {
    type: String,
    required: [true, "NIK Sekretaris is required"],
  },
  tanggalPermohonan: {
    type: Date,
    required: [true, "Tanggal Permohonan is required"],
  },
  NIKBendahara: {
    type: String,
    required: [true, "NIK Bendahara is required"],
  },
  suratKurangMampu: {
    type: String,
    required: [true, "Surat Kurang Mampu (No & TGL) is required"],
  },
  anggota: [
    {
      NIK: {
        type: String,
        required: [true, "NIK Anggota is required"],
      }
    }
  ],
  rekomendasiCamat: {
    type: String,
    required: [true, "Rekomendasi Camat (No & TGL) is required"],
  },
  bidangBantuan: {
    type: String,
    required: [true, "Bidang Bantuan is required"],
    enum: [
      "PERTANIAN PALAWIJA",
      "PERTERNAKAN UNGGAS",
      "PERIKANAN AIR TAWAR / ASIN",
      "PERTUKANGAN PERABOTAN",
      "PERBENGKELAN",
      "MENJAHIT",
      "KERAJINAN TANGAN / HOME INDUSTRI",
      "JUALAN"
    ]
  },
  jenisBantuan: {
    type: String,
    required: [true, "Jenis Bantuan is required"],
  },
  alamatUsaha: {
    type: String,
    required: [true, "Alamat Usaha is required"],
  },
  verifikasiKUBE: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VerifikasiKUBE'
  },
  evaluasiKUBE: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EvaluasiKUBE'
  }
});

export const Kube = mongoose.model("Kube", kubeSchema);