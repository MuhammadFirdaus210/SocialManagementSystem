// Backend/routes/socialWelfareRouterPPKS.js
import express from "express";
import {
  createPPKSData,
  getAllPPKSData,
  getPPKSDataById,
  updatePPKSData,
  deletePPKSData
} from "../controllers/socialWelfareControllerPPKS.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// CREATE PPKS Data
router.post("/add/ppks", isAuthenticated, createPPKSData);

// GET All PPKS Data
router.get("/getall/ppks", isAuthenticated, getAllPPKSData);

// GET PPKS Data by ID
router.get("/ppks/:id", isAuthenticated, getPPKSDataById);

// UPDATE PPKS Data by ID
router.put("/update/ppks/:id", isAuthenticated, updatePPKSData);

// DELETE PPKS Data by ID
router.delete("/delete/ppks/:id", isAuthenticated, deletePPKSData);

export default router;