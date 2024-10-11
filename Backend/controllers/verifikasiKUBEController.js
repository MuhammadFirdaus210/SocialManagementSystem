import { VerifikasiKUBE } from "../models/verifikasiKUBESchema.js";

export const addKUBE = async (req, res) => {
  const { tahun, jumlahBantuan, sumberDana, status } = req.body;

  // Validation
  if (!tahun || !jumlahBantuan || !sumberDana || !status) {
    return res.status(400).json({
      success: false,
      message: "tahun, jumlahBantuan, sumberDana, dan status harus diisi",
    });
  }

  try {
    const newVerifikasiKUBE = new VerifikasiKUBE({
      tahun,
      jumlahBantuan,
      sumberDana,
      status
    });

    // Save the new verification record
    await newVerifikasiKUBE.save();

    res.status(201).json({
      success: true,
      message: "Verifikasi KUBE berhasil ditambahkan",
      data: newVerifikasiKUBE,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan verifikasi KUBE",
      error: error.message,
    });
  }
};

export const getAllVerifikasiKUBE = async (req, res) => {
  try {
    const allVerifikasi = await VerifikasiKUBE.find();
    res.status(200).json({
      success: true,
      data: allVerifikasi
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateKUBE = async (req, res) => {
  try {
    const { id } = req.params;
    const { tahun, jumlahBantuan, sumberDana, status } = req.body;

    // Validation
    if (!tahun || !jumlahBantuan || !sumberDana || !status) {
      return res.status(400).json({
        success: false,
        message: "tahun, jumlahBantuan, sumberDana, dan status harus diisi"
      });
    }

    // Validate sumberDana
    const allowedSumberDana = ['APBN', 'APBA', 'APBK'];
    if (!allowedSumberDana.includes(sumberDana)) {
      return res.status(400).json({
        success: false,
        message: "Sumber dana tidak valid. Pilih salah satu dari APBN, APBA, atau APBK."
      });
    }

    // Validate status
    const allowedStatus = ['Pending', 'Approved', 'Rejected'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status tidak valid. Pilih salah satu dari pending, approved, atau rejected."
      });
    }

    const updatedVerifikasiKUBE = await VerifikasiKUBE.findByIdAndUpdate(
      id,
      { tahun, jumlahBantuan, sumberDana, status },
      { new: true }
    );

    if (!updatedVerifikasiKUBE) {
      return res.status(404).json({
        success: false,
        message: "Verifikasi KUBE tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Verifikasi KUBE berhasil diperbarui",
      data: updatedVerifikasiKUBE
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui verifikasi KUBE",
      error: error.message
    });
  }
};

export const deleteKUBE = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVerifikasiKUBE = await VerifikasiKUBE.findByIdAndDelete(id);

    if (!deletedVerifikasiKUBE) {
      return res.status(404).json({
        success: false,
        message: "Verifikasi KUBE tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Verifikasi KUBE berhasil dihapus",
      data: deletedVerifikasiKUBE
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus verifikasi KUBE",
      error: error.message
    });
  }
};

export const verifikasiKUBE = async (req, res) => {
  try {
    const { kubeId } = req.params;
    const { tahun, jumlahBantuan, sumberDana, status } = req.body;

    // Validation
    if (!tahun || !jumlahBantuan || !sumberDana || !status) {
      return res.status(400).json({
        success: false,
        message: "tahun, jumlahBantuan, sumberDana, dan status harus diisi"
      });
    }

    const verifikasi = new VerifikasiKUBE({
      kubeId,
      tahun,
      jumlahBantuan,
      sumberDana,
      status
    });

    await verifikasi.save();

    res.status(200).json({
      success: true,
      message: "KUBE berhasil diverifikasi",
      data: verifikasi
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
