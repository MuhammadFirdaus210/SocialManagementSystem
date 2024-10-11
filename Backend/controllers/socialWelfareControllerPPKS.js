// Backend/controllers/socialWelfareControllerPPKS.js
import { socialWelfarePPKSData } from '../models/socialWelfareModelPPKS.js';

// Create PPKS Data
export const createPPKSData = async (req, res) => {
  const { type, gampong, ...rest } = req.body;

  // Validate the type for PPKS
  if (!type || type !== 'PPKS') {
    return res.status(400).json({ message: "Invalid type for PPKS" });
  }

  try {
    // Create a new entry in the database
    const newData = new socialWelfarePPKSData({ type, gampong, ...rest });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All PPKS Data
export const getAllPPKSData = async (req, res) => {
  try {
    const data = await socialWelfarePPKSData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get PPKS Data by ID
export const getPPKSDataById = async (req, res) => {
  try {
    const data = await socialWelfarePPKSData.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "PPKS data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update PPKS Data by ID
export const updatePPKSData = async (req, res) => {
  try {
    const data = await socialWelfarePPKSData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).json({ message: "PPKS data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete PPKS Data by ID
export const deletePPKSData = async (req, res) => {
  try {
    const data = await socialWelfarePPKSData.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "PPKS data not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};