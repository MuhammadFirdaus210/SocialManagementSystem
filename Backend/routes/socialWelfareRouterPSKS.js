// Backend/routes/socialWelfareRouterPSKS.js
import express from "express";
import {
  createPSKSData,
  getAllPSKSData,
  getPSKSDataById,
  updatePSKSData,
  deletePSKSData
} from "../controllers/socialWelfareControllerPSKS.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// CREATE PSKS Data
router.post("/add/psks", isAuthenticated, createPSKSData);

// GET All PSKS Data
router.get("/getall/psks", isAuthenticated, getAllPSKSData);

// GET PSKS Data by ID
router.get("/psks/:id", isAuthenticated, getPSKSDataById);

// UPDATE PSKS Data by ID
router.put("/update/psks/:id", isAuthenticated, updatePSKSData);

// DELETE PSKS Data by ID
router.delete("/delete/psks/:id", isAuthenticated, deletePSKSData);

export default router;