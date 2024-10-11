import express from "express";
import {
  addNewKube,
  deleteKube,
  getAllKubes,
  updateKube,
  getBidangBantuan,
} from "../controllers/kubeController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewKube);
router.delete("/delete/:id", isAuthenticated, deleteKube);
router.put("/update/:id", isAuthenticated, updateKube);
router.get("/getall-kube", getAllKubes);
router.get("/bidang-bantuan-kube", getBidangBantuan);

export default router;