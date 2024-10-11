import ErrorHandler from "../middlewares/error.js";
import { Manfaat } from "../models/manfaatSchema.js";
import { VerifikasiManfaat } from "../models/verifikasiManfaatSchema.js";
import { EvaluasiManfaat } from "../models/evaluasiManfaatSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const addNewManfaat = catchAsyncErrors(async (req, res, next) => {
  const {
    NIK,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    verifikasiManfaat,
    evaluasiManfaat
  } = req.body;

  if (
    !NIK ||
    !nomorHP ||
    !nomorAgendaPermohonan ||
    !tanggalPermohonan ||
    !suratKurangMampu ||
    !rekomendasiCamat ||
    !bidangBantuan ||
    !jenisBantuan
  ) {
    return next(new ErrorHandler("Mohon Isi Semua Field Yang Diperlukan!", 400));
  }

  // Create and save verifikasiManfaat
  const newVerifikasiManfaat = new VerifikasiManfaat(verifikasiManfaat);
  await newVerifikasiManfaat.save();

  // Create and save evaluasiManfaat
  const newEvaluasiManfaat = new EvaluasiManfaat(evaluasiManfaat);
  await newEvaluasiManfaat.save();

  const manfaat = await Manfaat.create({
    NIK,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    verifikasiManfaat: newVerifikasiManfaat._id,
    evaluasiManfaat: newEvaluasiManfaat._id
  });

  res.status(201).json({
    success: true,
    message: "Data Manfaat Baru Berhasil Ditambahkan!",
    manfaat,
  });
});

export const updateManfaat = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const {
    NIK,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    verifikasiManfaat,
    evaluasiManfaat
  } = req.body;

  // Update verifikasiManfaat
  if (verifikasiManfaat && verifikasiManfaat._id) {
    await VerifikasiManfaat.findByIdAndUpdate(verifikasiManfaat._id, verifikasiManfaat, { new: true });
  }

  // Update evaluasiManfaat
  if (evaluasiManfaat && evaluasiManfaat._id) {
    await EvaluasiManfaat.findByIdAndUpdate(evaluasiManfaat._id, evaluasiManfaat, { new: true });
  }

  const updatedManfaat = await Manfaat.findByIdAndUpdate(id, {
    NIK,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    verifikasiManfaat: verifikasiManfaat._id,
    evaluasiManfaat: evaluasiManfaat._id
  }, { new: true });

  if (!updatedManfaat) {
    return next(new ErrorHandler("Manfaat not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Manfaat Updated!",
    updatedManfaat,
  });
});

export const deleteManfaat = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let manfaat = await Manfaat.findById(id);
  if (!manfaat) {
    return next(new ErrorHandler("Data Manfaat Tidak Ditemukan!", 404));
  }
  await manfaat.deleteOne();
  res.status(200).json({
    success: true,
    message: "Data Manfaat Berhasil Dihapus!",
  });
});

export const getAllManfaat = catchAsyncErrors(async (req, res, next) => {
  const manfaatList = await Manfaat.find()
    .populate('verifikasiManfaat')
    .populate('evaluasiManfaat');
  res.status(200).json({
    success: true,
    manfaatList,
  });
});

export const getSingleManfaat = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const manfaat = await Manfaat.findById(id)
      .populate('verifikasiManfaat')
      .populate('evaluasiManfaat');
    if (!manfaat) {
      return next(new ErrorHandler("Data Manfaat Tidak Ditemukan!", 404));
    }
    res.status(200).json({
      success: true,
      manfaat,
    });
  } catch (error) {
    next(new ErrorHandler("Error Saat Mengambil Data Manfaat", 500));
  }
});

export const getBidangBantuanManfaats = catchAsyncErrors(async (req, res, next) => {
  const manfaats = Manfaat.schema.path('bidangBantuan').enumValues;
  res.status(200).json({
    success: true,
    manfaats,
  });
});