import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Kube } from "../models/kubeSchema.js";
import { VerifikasiKUBE } from "../models/verifikasiKUBESchema.js";
import { EvaluasiKUBE } from "../models/evaluasiKUBESchema.js";

export const addNewKube = catchAsyncErrors(async (req, res, next) => {
  const {
    namaKelompok,
    nomorHP,
    NIKKetua,
    nomorAgendaPermohonan,
    NIKSekretaris,
    tanggalPermohonan,
    NIKBendahara,
    suratKurangMampu,
    anggota,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    alamatUsaha,
    verifikasiKUBE,
    evaluasiKUBE
  } = req.body;

  if (!namaKelompok || !nomorHP || !NIKKetua || !nomorAgendaPermohonan) {
    return next(new ErrorHandler("Please Fill All Required Fields!", 400));
  }

  // Create and save verifikasiKUBE
  const newVerifikasiKUBE = new VerifikasiKUBE(verifikasiKUBE);
  await newVerifikasiKUBE.save();

  // Create and save evaluasiKUBE
  const newEvaluasiKUBE = new EvaluasiKUBE(evaluasiKUBE);
  await newEvaluasiKUBE.save();

  const kube = await Kube.create({
    namaKelompok,
    nomorHP,
    NIKKetua,
    nomorAgendaPermohonan,
    NIKSekretaris,
    tanggalPermohonan,
    NIKBendahara,
    suratKurangMampu,
    anggota,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    alamatUsaha,
    verifikasiKUBE: newVerifikasiKUBE._id,
    evaluasiKUBE: newEvaluasiKUBE._id
  });

  res.status(201).json({
    success: true,
    message: "New KUBE Added",
    kube,
  });
});

export const updateKube = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { namaKelompok, nomorHP, NIKKetua, nomorAgendaPermohonan, NIKSekretaris, tanggalPermohonan, NIKBendahara, suratKurangMampu, anggota, rekomendasiCamat, bidangBantuan, jenisBantuan, alamatUsaha, verifikasiKUBE, evaluasiKUBE } = req.body;

  // Update verifikasiKUBE
  if (verifikasiKUBE && verifikasiKUBE._id) {
    await VerifikasiKUBE.findByIdAndUpdate(verifikasiKUBE._id, verifikasiKUBE, { new: true });
  }

  // Update evaluasiKUBE
  if (evaluasiKUBE && evaluasiKUBE._id) {
    await EvaluasiKUBE.findByIdAndUpdate(evaluasiKUBE._id, evaluasiKUBE, { new: true });
  }

  const updatedKube = await Kube.findByIdAndUpdate(id, {
    namaKelompok,
    nomorHP,
    NIKKetua,
    nomorAgendaPermohonan,
    NIKSekretaris,
    tanggalPermohonan,
    NIKBendahara,
    suratKurangMampu,
    anggota,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    alamatUsaha,
    verifikasiKUBE: verifikasiKUBE._id,
    evaluasiKUBE: evaluasiKUBE._id
  }, { new: true });

  if (!updatedKube) {
    return next(new ErrorHandler("KUBE not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "KUBE Updated!",
    updatedKube,
  });
});

export const deleteKube = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let kube = await Kube.findById(id);
  if (!kube) {
    return next(new ErrorHandler("KUBE not found!", 404));
  }
  await kube.deleteOne();
  res.status(200).json({
    success: true,
    message: "KUBE Deleted!",
  });
});

export const getAllKubes = catchAsyncErrors(async (req, res, next) => {
  const kubes = await Kube.find()
    .populate('verifikasiKUBE')
    .populate('evaluasiKUBE');
  res.status(200).json({
    success: true,
    kubes,
  });
});

export const getBidangBantuan = catchAsyncErrors(async (req, res, next) => {
  const bidangBantuan = [
    "PERTANIAN PALAWIJA",
    "PERTERNAKAN UNGGAS",
    "PERIKANAN AIR TAWAR / ASIN",
    "PERTUKANGAN PERABOTAN",
    "PERBENGKELAN",
    "MENJAHIT",
    "KERAJINAN TANGAN / HOME INDUSTRI",
    "JUALAN"
  ];
  
  res.status(200).json({
    success: true,
    bidangBantuan,
  });
});