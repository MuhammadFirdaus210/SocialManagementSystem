import express from "express";
import {
  addEvaluasiKUBE,
  getAllEvaluasiKUBE,
  updateEvaluasiKUBE,
  deleteEvaluasiKUBE
} from "../controllers/evaluasiKUBEController.js";

const router = express.Router();

router.post("/add", addEvaluasiKUBE);
router.get("/getall-eval", getAllEvaluasiKUBE);
router.put("/update/:id", updateEvaluasiKUBE);
router.delete("/delete/:id", deleteEvaluasiKUBE);

export default router;