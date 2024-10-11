import { PPKSRecap } from '../models/recapPPKSSchema.js';

// Fungsi validasi untuk data PPKS Recap
const validatePPKSData = (data) => {
  const errors = {};
  if (!data.kabupatenKota) errors.kabupatenKota = 'Kabupaten/Kota is required';
  if (!data.kecamatan) errors.kecamatan = 'Kecamatan is required';
  if (!data.jenisRekapitulasi) errors.jenisRekapitulasi = 'Jenis Rekapitulasi is required';
  return errors; // Menghapus validasi 'data' karena sudah tidak dibutuhkan
};

// Membuat data PPKS Recap baru
export const createPPKSRecap = async (req, res) => {
  try {
    const validationErrors = validatePPKSData(req.body);
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const recap = new PPKSRecap(req.body);
    await recap.save();
    res.status(201).json(recap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mendapatkan semua data PPKS Recap atau melakukan filter berdasarkan query
export const getPPKSRecaps = async (req, res) => {
  try {
    const { kabupatenKota, kecamatan, jenisRekapitulasi } = req.query;
    const query = {};
    if (kabupatenKota) query.kabupatenKota = kabupatenKota;
    if (kecamatan) query.kecamatan = kecamatan;
    if (jenisRekapitulasi) query.jenisRekapitulasi = jenisRekapitulasi;

    const recaps = await PPKSRecap.find(query);
    res.json(recaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan data PPKS Recap berdasarkan ID
export const getPPKSRecapById = async (req, res) => {
  try {
    const recap = await PPKSRecap.findById(req.params.id);
    if (!recap) return res.status(404).json({ message: 'PPKS Recap not found' });
    res.json(recap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Memperbarui data PPKS Recap berdasarkan ID
export const updatePPKSRecap = async (req, res) => {
  try {
    const validationErrors = validatePPKSData(req.body);
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const recap = await PPKSRecap.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!recap) return res.status(404).json({ message: 'PPKS Recap not found' });
    res.json(recap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Menghapus data PPKS Recap berdasarkan ID
export const deletePPKSRecap = async (req, res) => {
  try {
    const recap = await PPKSRecap.findByIdAndDelete(req.params.id);
    if (!recap) return res.status(404).json({ message: 'PPKS Recap not found' });
    res.json({ message: 'PPKS Recap deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mencetak data PPKS Recap dengan format khusus
export const printPPKSRecap = async (req, res) => {
  try {
    const { id } = req.params;
    const recap = await PPKSRecap.findById(id);

    if (!recap) {
      return res.status(404).json({ message: 'PPKS Recap not found' });
    }

    const printableRecap = {
      title: 'PPKS Recap',
      kabupatenKota: recap.kabupatenKota,
      kecamatan: recap.kecamatan,
      jenisRekapitulasi: recap.jenisRekapitulasi,
      createdAt: recap.createdAt,
      updatedAt: recap.updatedAt
    };

    res.json(printableRecap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
