import express from "express";
import {
  addEvaluasiManfaat,
  getAllEvaluasiManfaat,
  updateEvaluasiManfaat,
  deleteEvaluasiManfaat
} from "../controllers/evaluasiMANFAATController.js";

const router = express.Router();

router.post("/add", addEvaluasiManfaat);
router.get("/getall-eval", getAllEvaluasiManfaat);
router.put("/update/:id", updateEvaluasiManfaat);
router.delete("/delete/:id", deleteEvaluasiManfaat);

export default router;