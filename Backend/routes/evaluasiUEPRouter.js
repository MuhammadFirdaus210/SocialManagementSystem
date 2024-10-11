import express from "express";
import {
  addEvaluasiUEP,
  getAllEvaluasiUEP,
  updateEvaluasiUEP,
  deleteEvaluasiUEP
} from "../controllers/evaluasiUEPController.js";

const router = express.Router();

router.post("/add", addEvaluasiUEP);
router.get("/getall-eval", getAllEvaluasiUEP);
router.put("/update/:id", updateEvaluasiUEP);
router.delete("/delete/:id", deleteEvaluasiUEP);

export default router;