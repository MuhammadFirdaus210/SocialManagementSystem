import express from 'express';
import { 
  getPPKSData, 
  getPPKSPrintData, 
  createPPKSData, 
  updatePPKSData, 
  deletePPKSData,
  getPPKSTypes,
  getSinglePPKSType
} from '../controllers/ppksController.js';

const router = express.Router();

// Rute untuk mendapatkan semua data PPKS dari database
router.get('/data', getPPKSData);

// Rute untuk mendapatkan data dummy/print data untuk keperluan demonstrasi
router.get('/print-data', getPPKSPrintData);

// Rute untuk menambahkan data PPKS baru ke dalam database
router.post('/add', createPPKSData);

// Rute untuk memperbarui data PPKS berdasarkan ID
router.put('/data/:id', updatePPKSData);

// Rute untuk menghapus data PPKS berdasarkan ID
router.delete('/data/:id', deletePPKSData);

// Rute untuk mendapatkan daftar jenis PPKS
router.get('/types', getPPKSTypes);

// Rute untuk mendapatkan jenis PPKS tertentu berdasarkan nama
router.get('/types/:nama', getSinglePPKSType);

export default router;
