import express from 'express';
import {
  createPSKSRecap,
  getPSKSRecaps,
  getPSKSRecapById,
  updatePSKSRecap,
  deletePSKSRecap,
  printPSKSRecap
} from '../controllers/recapPSKSController.js';

const router = express.Router();

router.post('/add', createPSKSRecap);
router.get('/get-all', getPSKSRecaps);
router.get('/psks/:id', getPSKSRecapById);
router.put('/update/:id', updatePSKSRecap);
router.delete('/delete/:id', deletePSKSRecap);
router.get('/print-recap/:id', printPSKSRecap);

export default router;