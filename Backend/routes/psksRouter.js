import express from 'express';
import {
  getPSKSTypes,
  getSinglePSKSType,
  getPSKSData,
  getPSKSPrintData,
  createPSKSData,
  updatePSKSData,
  deletePSKSData
} from '../controllers/psksController.js';

const router = express.Router();

router.get('/types', getPSKSTypes);
router.get('/types/:nama', getSinglePSKSType);
router.get('/data', getPSKSData);
router.get('/print-data', getPSKSPrintData);
router.post('/add', createPSKSData);
router.put('/data/:id', updatePSKSData);
router.delete('/data/:id', deletePSKSData);

export default router;