import { PSKSRecap } from '../models/recapPSKSSchema.js';

const validatePSKSData = (data) => {
  const errors = {};
  if (!data.kabupatenKota) errors.kabupatenKota = 'Kabupaten/Kota is required';
  if (!data.kecamatan) errors.kecamatan = 'Kecamatan is required';
  if (!data.jenisRekapitulasi) errors.jenisRekapitulasi = 'Jenis Rekapitulasi is required';
  return errors;
};

export const createPSKSRecap = async (req, res) => {
  try {
    const validationErrors = validatePSKSData(req.body);
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const recap = new PSKSRecap(req.body);
    await recap.save();
    res.status(201).json(recap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPSKSRecaps = async (req, res) => {
  try {
    const { kabupatenKota, kecamatan } = req.query;
    const query = {};
    if (kabupatenKota) query.kabupatenKota = kabupatenKota;
    if (kecamatan) query.kecamatan = kecamatan;

    const recaps = await PSKSRecap.find(query);
    res.json(recaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPSKSRecapById = async (req, res) => {
  try {
    const recap = await PSKSRecap.findById(req.params.id);
    if (!recap) return res.status(404).json({ message: 'PSKS Recap not found' });
    res.json(recap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePSKSRecap = async (req, res) => {
  try {
    const validationErrors = validatePSKSData(req.body);
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const recap = await PSKSRecap.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!recap) return res.status(404).json({ message: 'PSKS Recap not found' });
    res.json(recap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePSKSRecap = async (req, res) => {
  try {
    const recap = await PSKSRecap.findByIdAndDelete(req.params.id);
    if (!recap) return res.status(404).json({ message: 'PSKS Recap not found' });
    res.json({ message: 'PSKS Recap deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const printPSKSRecap = async (req, res) => {
  try {
    const { id } = req.params;
    const recap = await PSKSRecap.findById(id);
    
    if (!recap) {
      return res.status(404).json({ message: 'PSKS Recap not found' });
    }

    const printableRecap = {
      title: 'PSKS Recap',
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
