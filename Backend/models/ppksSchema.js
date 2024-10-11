import mongoose from 'mongoose';

// Base schema for all PPKS types
const ppksBaseSchema = new mongoose.Schema({
  Kabupaten: { type: String, required: true },
  Kecamatan: { type: String, required: true },
  Gampong: { type: String, required: true },
  Nama: { type: String, required: true },
  NIK: { type: String, required: true },
  JK: { type: String, required: true },
  Tanggal_Lahir: { type: Date, required: true },
  Pendidikan: { type: String, required: true },
  Alamat: { type: String, required: true }
});

// Specific schemas for each PPKS type
const ODKBSchema = new mongoose.Schema({
  Pernah_Mendapat_Bantuan: { type: String, required: true },
  Jenis_Bantuan: { type: String, required: true }
});

const ADKSchema = new mongoose.Schema({
  Jenis_Kecacatan: { type: String, required: true },
  Status_Anak: { type: String, required: true },
  Ayah: { type: String, required: true },
  Pekerjaan_Ayah: { type: String, required: true },
  Ibu: { type: String, required: true },
  Pekerjaan_Ibu: { type: String, required: true },
  Wali: String,
  Pekerjaan_Wali: String
});

const AY_AP_AYPSchema = new mongoose.Schema({
  Status_Anak: { type: String, required: true },
  Ayah: { type: String, required: true },
  Pekerjaan_Ayah: { type: String, required: true },
  Ibu: { type: String, required: true },
  Pekerjaan_Ibu: { type: String, required: true },
  Wali: String,
  Pekerjaan_Wali: String
});

const ATSchema = new mongoose.Schema({
  Pendidikan: { type: String, required: true }
});

const ABHSchema = new mongoose.Schema({
  Status_ABH: { type: String, required: true },
  Jenis_Kasus: { type: String, required: true },
  Tanggal_Masuk: { type: Date, required: true },
  Tanggal_Keluar: { type: Date, required: true },
  Pernah_Mendapat_Bimbingan: { type: String, required: true },
  Pernah_Mendapat_Pendamping_Hukum: { type: String, required: true }
});

const AJKSchema = new mongoose.Schema({
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const ABTSchema = new mongoose.Schema({
  Lokasi_Penemuan: { type: String, required: true },
  Yang_Menemukan: { type: String, required: true },
  Pengasuh_Sementara: { type: String, required: true }
});

const AKTKSchema = new mongoose.Schema({
  Jenis_Kekerasan: { type: String, required: true },
  Ayah: { type: String, required: true },
  Pekerjaan_Ayah: { type: String, required: true },
  Ibu: { type: String, required: true },
  Pekerjaan_Ibu: { type: String, required: true },
  Wali: String,
  Pekerjaan_Wali: String,
  Pernah_Mendapat_Pendamping_Hukum: { type: String, required: true }
});

const PRSESchema = new mongoose.Schema({
  Pekerjaan: { type: String, required: true }
});

const KTKSchema = new mongoose.Schema({
  Jenis_Kekerasan: { type: String, required: true },
  Pernah_Mendapat_Pendamping_Hukum: { type: String, required: true }
});

const LUTSchema = new mongoose.Schema({
  Pernah_Mendapat_Bantuan: { type: String, required: true }
});

const PDSchema = new mongoose.Schema({
  Jenis_Disabilitas: { type: String, required: true }
});

const TSSchema = new mongoose.Schema({
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const PGMSSchema = new mongoose.Schema({
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const GLDGSchema = new mongoose.Schema({
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const BWBLKSchema = new mongoose.Schema({
  Ayah: { type: String, required: true },
  Pekerjaan_Ayah: { type: String, required: true },
  Ibu: { type: String, required: true },
  Pekerjaan_Ibu: { type: String, required: true },
  Wali: String,
  Pekerjaan_Wali: String,
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const NAPZASchema = new mongoose.Schema({
  Ayah: { type: String, required: true },
  Pekerjaan_Ayah: { type: String, required: true },
  Ibu: { type: String, required: true },
  Pekerjaan_Ibu: { type: String, required: true },
  Wali: String,
  Pekerjaan_Wali: String,
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const FMSchema = new mongoose.Schema({
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const RTLHSchema = new mongoose.Schema({
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const KRSchema = new mongoose.Schema({
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const KBSPKSchema = new mongoose.Schema({
  Pernah_Mendapat_Penanganan_Khusus: { type: String, required: true }
});

const KATSchema = new mongoose.Schema({
  Pernah_Mendapat_Bimbingan: { type: String, required: true }
});

const KBASchema = new mongoose.Schema({
  Jumlah_Tanggungan: { type: Number, required: true },
  Jenis_Bencana: { type: String, required: true }
});

const KBSSchema = new mongoose.Schema({
  Faktor_Mengungsi: { type: String, required: true },
  Jumlah_Tanggungan: { type: Number, required: true }
});

const PMSchema = new mongoose.Schema({
  // No additional fields for PM
});

const ODHASchema = new mongoose.Schema({
  Pernah_Mendapat_Perawatan_Medis: { type: String, required: true }
});

// Create the main PPKS model
const PPKS = mongoose.model('PPKS', ppksBaseSchema);

// Create discriminator models for each PPKS type
const ODKB = PPKS.discriminator('ODKB', ODKBSchema);
const ADK = PPKS.discriminator('ADK', ADKSchema);
const AY_AP_AYP = PPKS.discriminator('AY_AP_AYP', AY_AP_AYPSchema);
const AT = PPKS.discriminator('AT', ATSchema);
const ABH = PPKS.discriminator('ABH', ABHSchema);
const AJK = PPKS.discriminator('AJK', AJKSchema);
const ABT = PPKS.discriminator('ABT', ABTSchema);
const AKTK = PPKS.discriminator('AKTK', AKTKSchema);
const PRSE = PPKS.discriminator('PRSE', PRSESchema);
const KTK = PPKS.discriminator('KTK', KTKSchema);
const LUT = PPKS.discriminator('LUT', LUTSchema);
const PD = PPKS.discriminator('PD', PDSchema);
const TS = PPKS.discriminator('TS', TSSchema);
const PGMS = PPKS.discriminator('PGMS', PGMSSchema);
const GLDG = PPKS.discriminator('GLDG', GLDGSchema);
const BWBLK = PPKS.discriminator('BWBLK', BWBLKSchema);
const NAPZA = PPKS.discriminator('NAPZA', NAPZASchema);
const FM = PPKS.discriminator('FM', FMSchema);
const RTLH = PPKS.discriminator('RTLH', RTLHSchema);
const KR = PPKS.discriminator('KR', KRSchema);
const KBSPK = PPKS.discriminator('KBSPK', KBSPKSchema);
const KAT = PPKS.discriminator('KAT', KATSchema);
const KBA = PPKS.discriminator('KBA', KBASchema);
const KBS = PPKS.discriminator('KBS', KBSSchema);
const PM = PPKS.discriminator('PM', PMSchema);
const ODHA = PPKS.discriminator('ODHA', ODHASchema);

// Export all models
export { 
  PPKS, ODKB, ADK, AY_AP_AYP, AT, ABH, AJK, ABT, AKTK, PRSE, KTK, LUT, PD, TS, PGMS, GLDG, BWBLK, NAPZA, FM, RTLH, KR, KBSPK, KAT, KBA, KBS, PM, ODHA 
};

// Default export
export default PPKS;