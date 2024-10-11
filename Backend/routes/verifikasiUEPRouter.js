import express from "express";
import {
  getAllVerifikasiUEP,
  addUEP,
  updateUEP,
  deleteUEP
} from "../controllers/verifikasiUEPController.js";

const router = express.Router();

// Routes untuk UEP
router.get("/verifikasi", getAllVerifikasiUEP);
router.post("/add", addUEP);
router.put("/update/:id", updateUEP);
router.delete("/delete/:id", deleteUEP);

export default router;
