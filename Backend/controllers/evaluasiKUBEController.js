import { EvaluasiKUBE } from "../models/evaluasiKUBESchema.js";

export const addEvaluasiKUBE = async (req, res) => {
  const { statusBantuan, namaPendamping, pekerjaanPendamping } = req.body;

  // Validation
  if (!statusBantuan || !namaPendamping || !pekerjaanPendamping) {
    return res.status(400).json({
      success: false,
      message: "Status bantuan, nama pendamping, dan pekerjaan pendamping harus diisi"
    });
  }

  try {
    const newEvaluasiKUBE = new EvaluasiKUBE({
      statusBantuan,
      namaPendamping,
      pekerjaanPendamping
    });

    await newEvaluasiKUBE.save();

    res.status(201).json({
      success: true,
      message: "Evaluasi KUBE berhasil ditambahkan",
      data: newEvaluasiKUBE
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan evaluasi KUBE",
      error: error.message
    });
  }
};

export const updateEvaluasiKUBE = async (req, res) => {
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

    const updatedEvaluasiKUBE = await EvaluasiKUBE.findByIdAndUpdate(
      id,
      { statusBantuan, namaPendamping, pekerjaanPendamping },
      { new: true }
    );

    if (!updatedEvaluasiKUBE) {
      return res.status(404).json({
        success: false,
        message: "Evaluasi KUBE tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Evaluasi KUBE berhasil diperbarui",
      data: updatedEvaluasiKUBE
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui evaluasi KUBE",
      error: error.message
    });
  }
};

export const getAllEvaluasiKUBE = async (req, res) => {
  try {
    const evaluasiKUBE = await EvaluasiKUBE.find();
    res.status(200).json({
      success: true,
      data: evaluasiKUBE
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data evaluasi KUBE",
      error: error.message
    });
  }
};

export const deleteEvaluasiKUBE = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvaluasiKUBE = await EvaluasiKUBE.findByIdAndDelete(id);

    if (!deletedEvaluasiKUBE) {
      return res.status(404).json({
        success: false,
        message: "Evaluasi KUBE tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Evaluasi KUBE berhasil dihapus",
      data: deletedEvaluasiKUBE
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus evaluasi KUBE",
      error: error.message
    });
  }
};