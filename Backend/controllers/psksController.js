import PSKS from '../models/psksSchema.js';
import { psksPrintData } from '../utils/psksDummyData.js';
import { psksData } from '../utils/psksData.js';

export const getPSKSTypes = (req, res) => {
  const formattedData = psksData.map((entry, index) => ({
    no: index + 1,
    nama: entry.nama,
    kepanjangan: entry.kepanjangan,
  }));

  res.json(formattedData);
};

export const getSinglePSKSType = (req, res) => {
  const { nama } = req.params;
  const entry = psksData.find(item => item.nama === nama);

  if (entry) {
    res.json({
      no: psksData.indexOf(entry) + 1,
      nama: entry.nama,
      kepanjangan: entry.kepanjangan,
    });
  } else {
    res.status(404).json({ message: 'Type not found' });
  }
};

export const getPSKSData = async (req, res) => {
  const { Jenis_PSKS } = req.query;
  try {
    let psksData;
    if (Jenis_PSKS) {
      psksData = await PSKS.find({ __t: Jenis_PSKS });
    } else {
      psksData = await PSKS.find();
    }
    res.json(psksData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPSKSPrintData = (req, res) => {
  res.json(psksPrintData);
};

export const createPSKSData = async (req, res) => {
  const { Jenis_PSKS, ...psksBody } = req.body;
  try {
    if (!PSKS.discriminators[Jenis_PSKS]) {
      return res.status(400).json({ message: 'Invalid PSKS type provided' });
    }
    
    const PSKSModel = PSKS.discriminators[Jenis_PSKS];
    const psksData = new PSKSModel(psksBody);
    const newPSKSData = await psksData.save();
    res.status(201).json(newPSKSData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePSKSData = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  
  try {
    const existingPSKS = await PSKS.findById(id);
    if (!existingPSKS) {
      return res.status(404).json({ message: 'PSKS data not found' });
    }

    if (updateBody.__t && updateBody.__t !== existingPSKS.__t) {
      return res.status(400).json({ message: 'Changing PSKS type is not allowed' });
    }

    const PSKSModel = PSKS.discriminators[existingPSKS.__t];
    const updatedPSKSData = await PSKSModel.findByIdAndUpdate(id, updateBody, { new: true, runValidators: true });

    res.json(updatedPSKSData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePSKSData = async (req, res) => {
  try {
    const deletedPSKSData = await PSKS.findByIdAndDelete(req.params.id);
    if (!deletedPSKSData) {
      return res.status(404).json({ message: 'PSKS data not found' });
    }
    res.json({ message: 'PSKS data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};