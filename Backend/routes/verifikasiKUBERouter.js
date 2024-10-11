import express from "express";
import {
  getAllVerifikasiKUBE,
  addKUBE,
  updateKUBE,
  deleteKUBE
} from "../controllers/verifikasiKUBEController.js";

const router = express.Router();

// Routes untuk KUBE
router.get("/verifikasi", getAllVerifikasiKUBE);
router.post("/add", addKUBE);
router.put("/update/:id", updateKUBE);
router.delete("/delete/:id", deleteKUBE);

export default router;
