import { EvaluasiManfaat } from "../models/evaluasiMANFAATSchema.js";

export const addEvaluasiManfaat = async (req, res) => {
  const { statusBantuan, namaPendamping, pekerjaanPendamping } = req.body;

  // Validation
  if (!statusBantuan || !namaPendamping || !pekerjaanPendamping) {
    return res.status(400).json({
      success: false,
      message: "Status bantuan, nama pendamping, dan pekerjaan pendamping harus diisi"
    });
  }

  try {
    const newEvaluasiManfaat = new EvaluasiManfaat({
      statusBantuan,
      namaPendamping,
      pekerjaanPendamping
    });

    await newEvaluasiManfaat.save();

    res.status(201).json({
      success: true,
      message: "Evaluasi Manfaat berhasil ditambahkan",
      data: newEvaluasiManfaat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan evaluasi Manfaat",
      error: error.message
    });
  }
};

export const updateEvaluasiManfaat = async (req, res) => {
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

    const updatedEvaluasiManfaat = await EvaluasiManfaat.findByIdAndUpdate(
      id,
      { statusBantuan, namaPendamping, pekerjaanPendamping },
      { new: true }
    );

    if (!updatedEvaluasiManfaat) {
      return res.status(404).json({
        success: false,
        message: "Evaluasi Manfaat tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Evaluasi Manfaat berhasil diperbarui",
      data: updatedEvaluasiManfaat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui evaluasi Manfaat",
      error: error.message
    });
  }
};

export const getAllEvaluasiManfaat = async (req, res) => {
  try {
    const evaluasiManfaat = await EvaluasiManfaat.find();
    res.status(200).json({
      success: true,
      data: evaluasiManfaat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data evaluasi Manfaat",
      error: error.message
    });
  }
};

export const deleteEvaluasiManfaat = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvaluasiManfaat = await EvaluasiManfaat.findByIdAndDelete(id);

    if (!deletedEvaluasiManfaat) {
      return res.status(404).json({
        success: false,
        message: "Evaluasi Manfaat tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Evaluasi Manfaat berhasil dihapus",
      data: deletedEvaluasiManfaat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus evaluasi Manfaat",
      error: error.message
    });
  }
};