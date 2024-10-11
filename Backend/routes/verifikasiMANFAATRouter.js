import express from "express";
import {
  getAllVerifikasiManfaat,
  addManfaat,
  updateManfaat,
  deleteManfaat
} from "../controllers/verifikasiMANFAATController.js";

const router = express.Router();

// Routes untuk Manfaat
router.get("/verifikasi", getAllVerifikasiManfaat);
router.post("/add", addManfaat);
router.put("/update/:id", updateManfaat);
router.delete("/delete/:id", deleteManfaat);

export default router;
