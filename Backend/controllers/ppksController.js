import PPKS from '../models/ppksSchema.js';
import { ppksPrintData } from '../utils/ppksDummyData.js';
import { ppksData } from '../utils/ppksData.js';

export const getPPKSTypes = (req, res) => {
  const formattedData = ppksData.map((entry, index) => ({
      no: index + 1, // Set 'no' starting from 1
      nama: entry.nama,
      kepanjangan: entry.kepanjangan,
  }));

  res.json(formattedData);
};

export const getSinglePPKSType = (req, res) => {
  const { nama } = req.params;
  const entry = ppksData.find(item => item.nama === nama);

  if (entry) {
      res.json({
          no: ppksData.indexOf(entry) + 1, // Set 'no' starting from 1
          nama: entry.nama,
          kepanjangan: entry.kepanjangan,
      });
  } else {
      res.status(404).json({ message: 'Type not found' });
  }
};

// Get all PPKS data or filter by type
export const getPPKSData = async (req, res) => {
  const { Jenis_PPKS } = req.query;
  try {
    let ppksData;
    if (Jenis_PPKS) {
      ppksData = await PPKS.find({ __t: Jenis_PPKS });
    } else {
      ppksData = await PPKS.find();
    }
    res.json(ppksData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dummy print data
export const getPPKSPrintData = (req, res) => {
  res.json(ppksPrintData);
};

// Create new PPKS data
export const createPPKSData = async (req, res) => {
  const { Jenis_PPKS, ...ppksBody } = req.body;
  try {
    if (!PPKS.discriminators[Jenis_PPKS]) {
      return res.status(400).json({ message: 'Invalid PPKS type provided' });
    }
    
    const PPKSModel = PPKS.discriminators[Jenis_PPKS];
    const ppksData = new PPKSModel(ppksBody);
    const newPPKSData = await ppksData.save();
    res.status(201).json(newPPKSData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update existing PPKS data
export const updatePPKSData = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  
  try {
    const existingPPKS = await PPKS.findById(id);
    if (!existingPPKS) {
      return res.status(404).json({ message: 'PPKS data not found' });
    }

    // Prevent changing the type
    if (updateBody.__t && updateBody.__t !== existingPPKS.__t) {
      return res.status(400).json({ message: 'Changing PPKS type is not allowed' });
    }

    // Use the correct discriminator model for the update
    const PPKSModel = PPKS.discriminators[existingPPKS.__t];
    const updatedPPKSData = await PPKSModel.findByIdAndUpdate(id, updateBody, { new: true, runValidators: true });

    res.json(updatedPPKSData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete PPKS data
export const deletePPKSData = async (req, res) => {
  try {
    const deletedPPKSData = await PPKS.findByIdAndDelete(req.params.id);
    if (!deletedPPKSData) {
      return res.status(404).json({ message: 'PPKS data not found' });
    }
    res.json({ message: 'PPKS data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



