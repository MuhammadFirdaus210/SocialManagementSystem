// Backend/controllers/socialWelfareControllerPSKS.js
import { socialWelfarePSKSData } from '../models/socialWelfareModelPSKS.js';

// Create PSKS Data
export const createPSKSData = async (req, res) => {
  const { type, gampong, ...rest } = req.body;

  // Validate the type for PSKS
  if (!type || type !== 'PSKS') {
    return res.status(400).json({ message: "Invalid type for PSKS" });
  }

  try {
    // Create a new entry in the database
    const newData = new socialWelfarePSKSData({ type, gampong, ...rest });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All PSKS Data
export const getAllPSKSData = async (req, res) => {
  try {
    const data = await socialWelfarePSKSData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get PSKS Data by ID
export const getPSKSDataById = async (req, res) => {
  try {
    const data = await socialWelfarePSKSData.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "PSKS data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update PSKS Data by ID
export const updatePSKSData = async (req, res) => {
  try {
    const data = await socialWelfarePSKSData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).json({ message: "PSKS data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete PSKS Data by ID
export const deletePSKSData = async (req, res) => {
  try {
    const data = await socialWelfarePSKSData.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "PSKS data not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};