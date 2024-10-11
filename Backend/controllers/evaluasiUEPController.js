import { EvaluasiUEP } from "../models/evaluasiUEPSchema.js";

export const addEvaluasiUEP = async (req, res) => {
  const { statusBantuan, namaPendamping, pekerjaanPendamping } = req.body;

  // Validation
  if (!statusBantuan || !namaPendamping || !pekerjaanPendamping) {
    return res.status(400).json({
      success: false,
      message: "Status bantuan, nama pendamping, dan pekerjaan pendamping harus diisi"
    });
  }

  try {
    const newEvaluasiUEP = new EvaluasiUEP({
      statusBantuan,
      namaPendamping,
      pekerjaanPendamping
    });

    await newEvaluasiUEP.save();

    res.status(201).json({
      success: true,
      message: "Evaluasi UEP berhasil ditambahkan",
      data: newEvaluasiUEP
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan evaluasi UEP",
      error: error.message
    });
  }
};

export const updateEvaluasiUEP = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusBantuan, namaPendamping, pekerjaanPendamping } = req.body;

    // Validate statusBantuan
    const allowedStatusBantuan = ['Tetap', 'Berjalan', 'Hilang'];
    if (!allowedStatusBantuan.includes(statusBantuan)) {
      return res.status(400).json({
        success: false,
        message: "Status bantuan tidak valid. Pilih salah satu dari Tetap, Berjalan, atau Hilang."
      });
    }

    const updatedEvaluasiUEP = await EvaluasiUEP.findByIdAndUpdate(
      id,
      { statusBantuan, namaPendamping, pekerjaanPendamping },
      { new: true }
    );

    if (!updatedEvaluasiUEP) {
      return res.status(404).json({
        success: false,
        message: "Evaluasi UEP tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Evaluasi UEP berhasil diperbarui",
      data: updatedEvaluasiUEP
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui evaluasi UEP",
      error: error.message
    });
  }
};

export const getAllEvaluasiUEP = async (req, res) => {
  try {
    const evaluasiUEP = await EvaluasiUEP.find();
    res.status(200).json({
      success: true,
      data: evaluasiUEP
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data evaluasi UEP",
      error: error.message
    });
  }
};

export const deleteEvaluasiUEP = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvaluasiUEP = await EvaluasiUEP.findByIdAndDelete(id);

    if (!deletedEvaluasiUEP) {
      return res.status(404).json({
        success: false,
        message: "Evaluasi UEP tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Evaluasi UEP berhasil dihapus",
      data: deletedEvaluasiUEP
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus evaluasi UEP",
      error: error.message
    });
  }
};