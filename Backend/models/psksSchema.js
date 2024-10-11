import mongoose from 'mongoose';

// Base schema for all PSKS types
const psksBaseSchema = new mongoose.Schema({
  Kabupaten: { type: String, required: true },
  Kecamatan: { type: String, required: true },
  Gampong: { type: String, required: true },
  Nama: { type: String, required: true },
  NIK: { type: String, required: true },
  JK: { type: String, required: true },
  Tanggal_Lahir: { type: Date, required: true },
  Alamat: { type: String, required: true },
  Pendidikan: { type: String, required: true },
  Pekerjaan: { type: String, required: true }
}, { discriminatorKey: 'Jenis_PSKS' });

// Create the main PSKS model
const PSKS = mongoose.model('PSKS', psksBaseSchema);

// Specific schemas for each PSKS type
const PSPSchema = new mongoose.Schema({ /* Define additional fields specific to PSP here */ });
const PSMSchema = new mongoose.Schema({ /* Define additional fields specific to PSM here */ });
const TAGANASchema = new mongoose.Schema({ /* Define additional fields specific to TAGANA here */ });
const LKSSchema = new mongoose.Schema({
  Nama_Lembaga: { type: String, required: true },
  Jumlah_Klien_Laki_Laki: { type: Number, required: true },
  Jumlah_Klien_Perempuan: { type: Number, required: true }
});
const LKSASchema = new mongoose.Schema({
  Nama_Lembaga: { type: String, required: true },
  Jumlah_Klien_Laki_Laki: { type: Number, required: true },
  Jumlah_Klien_Perempuan: { type: Number, required: true }
});
const KTSchema = new mongoose.Schema({
  Nama_Lembaga: { type: String, required: true },
  Jumlah_Anggota_Laki_Laki: { type: Number, required: true },
  Jumlah_Anggota_Perempuan: { type: Number, required: true }
});
const LK3Schema = new mongoose.Schema({
  Nama_Lembaga: { type: String, required: true },
  Jumlah_Pengurus_Laki_Laki: { type: Number, required: true },
  Jumlah_Pengurus_Perempuan: { type: Number, required: true }
});
const K_PIONERSchema = new mongoose.Schema({ /* Define additional fields specific to K_PIONER here */ });
const WKSBMSchema = new mongoose.Schema({
  Nama_Lembaga: { type: String, required: true },
  Jumlah_Anggota_Laki_Laki: { type: Number, required: true },
  Jumlah_Anggota_Perempuan: { type: Number, required: true }
});
const WPKSSchema = new mongoose.Schema({ /* Define additional fields specific to WPKS here */ });
const PSSchema = new mongoose.Schema({ /* Define additional fields specific to PS here */ });
const D_USAHASchema = new mongoose.Schema({
  Nama_Lembaga: { type: String, required: true }
});
const TKSKSchema = new mongoose.Schema({ /* Define additional fields specific to TKSK here */ });

// Create discriminator models for each PSKS type
const PSP = PSKS.discriminator('PSP', PSPSchema);
const PSM = PSKS.discriminator('PSM', PSMSchema);
const TAGANA = PSKS.discriminator('TAGANA', TAGANASchema);
const LKS = PSKS.discriminator('LKS', LKSSchema);
const LKSA = PSKS.discriminator('LKSA', LKSASchema);
const KT = PSKS.discriminator('KT', KTSchema);
const LK3 = PSKS.discriminator('LK3', LK3Schema);
const K_PIONER = PSKS.discriminator('K_PIONER', K_PIONERSchema);
const WKSBM = PSKS.discriminator('WKSBM', WKSBMSchema);
const WPKS = PSKS.discriminator('WPKS', WPKSSchema);
const PS = PSKS.discriminator('PS', PSSchema);
const D_USAHA = PSKS.discriminator('D_USAHA', D_USAHASchema);
const TKSK = PSKS.discriminator('TKSK', TKSKSchema);

// Export all models
export { PSKS, PSP, PSM, TAGANA, LKS, LKSA, KT, LK3, K_PIONER, WKSBM, WPKS, PS, D_USAHA, TKSK };

// Default export
export default PSKS;
