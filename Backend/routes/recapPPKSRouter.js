import express from 'express';
import {
  createPPKSRecap,
  getPPKSRecaps,
  getPPKSRecapById,
  updatePPKSRecap,
  deletePPKSRecap,
  printPPKSRecap
} from '../controllers/recapPPKSController.js';

const router = express.Router();

router.post('/add', createPPKSRecap);
router.get('/get-all', getPPKSRecaps);
router.get('/ppks/:id', getPPKSRecapById);
router.put('/update/:id', updatePPKSRecap);
router.delete('/delete/:id', deletePPKSRecap);
router.get('/print-recap/:id', printPPKSRecap);

export default router;