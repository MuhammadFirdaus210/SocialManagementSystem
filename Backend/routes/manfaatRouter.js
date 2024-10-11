import express from "express";
import {
  addNewManfaat,
  deleteManfaat,
  getAllManfaat,
  getSingleManfaat,
  updateManfaat,
  getBidangBantuanManfaats,
} from "../controllers/manfaatController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewManfaat);
router.delete("/delete/:id", isAuthenticated, deleteManfaat);
router.put("/update/:id", isAuthenticated, updateManfaat);
router.get("/getall", getAllManfaat);
router.get("/get/:id", getSingleManfaat);
router.get("/bidang-bantuan-manfaat", getBidangBantuanManfaats);

export default router;