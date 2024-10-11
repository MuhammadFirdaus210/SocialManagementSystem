import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Uep } from "../models/uepSchema.js";
import { VerifikasiUEP } from "../models/verifikasiUEPSchema.js";
import { EvaluasiUEP } from "../models/evaluasiUEPSchema.js";

export const postUep = catchAsyncErrors(async (req, res, next) => {
  const {
    nik,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    alamatUsaha,
    verifikasiUEP,
    evaluasiUEP
  } = req.body;

  // Create and save verifikasiUEP
  const newVerifikasiUEP = new VerifikasiUEP(verifikasiUEP);
  await newVerifikasiUEP.save();

  // Create and save evaluasiUEP
  const newEvaluasiUEP = new EvaluasiUEP(evaluasiUEP);
  await newEvaluasiUEP.save();

  const newUep = await Uep.create({
    nik,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    alamatUsaha,
    verifikasiUEP: newVerifikasiUEP._id,
    evaluasiUEP: newEvaluasiUEP._id
  });

  res.status(201).json({
    success: true,
    message: "UEP Added!",
    newUep,
  });
});

export const updateUep = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { nik, nomorHP, nomorAgendaPermohonan, tanggalPermohonan, suratKurangMampu, rekomendasiCamat, bidangBantuan, jenisBantuan, alamatUsaha, verifikasiUEP, evaluasiUEP } = req.body;

  // Update verifikasiUEP
  if (verifikasiUEP && verifikasiUEP._id) {
    await VerifikasiUEP.findByIdAndUpdate(verifikasiUEP._id, verifikasiUEP, { new: true });
  }

  // Update evaluasiUEP
  if (evaluasiUEP && evaluasiUEP._id) {
    await EvaluasiUEP.findByIdAndUpdate(evaluasiUEP._id, evaluasiUEP, { new: true });
  }

  const updatedUep = await Uep.findByIdAndUpdate(id, {
    nik,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    alamatUsaha,
    verifikasiUEP: verifikasiUEP._id,
    evaluasiUEP: evaluasiUEP._id
  }, { new: true });

  if (!updatedUep) {
    return next(new ErrorHandler("UEP not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "UEP Updated!",
    updatedUep,
  });
});

export const deleteUep = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let uep = await Uep.findById(id);
  if (!uep) {
    return next(new ErrorHandler("UEP not found", 404));
  }
  await uep.deleteOne();
  res.status(200).json({
    success: true,
    message: "UEP Deleted!",
  });
});

export const getAllUeps = catchAsyncErrors(async (req, res, next) => {
  const ueps = await Uep.find()
    .populate('verifikasiUEP')
    .populate('evaluasiUEP');
  res.status(200).json({
    success: true,
    ueps,
  });
});

export const getBidangBantuan = catchAsyncErrors(async (req, res, next) => {
  const bidangBantuanList = Uep.schema.path('bidangBantuan').enumValues;
  res.status(200).json({
    success: true,
    bidangBantuan: bidangBantuanList,
  });
});