import { VerifikasiUEP } from "../models/verifikasiUEPSchema.js";

export const addUEP = async (req, res) => {
  const { tahun, jumlahBantuan, sumberDana, status } = req.body;

  // Validation
  if (!tahun || !jumlahBantuan || !sumberDana || !status) {
    return res.status(400).json({
      success: false,
      message: "tahun, jumlahBantuan, sumberDana, dan status harus diisi",
    });
  }

  try {
    const newVerifikasiUEP = new VerifikasiUEP({
      tahun,
      jumlahBantuan,
      sumberDana,
      status
    });

    // Save the new verification record
    await newVerifikasiUEP.save();

    res.status(201).json({
      success: true,
      message: "Verifikasi UEP berhasil ditambahkan",
      data: newVerifikasiUEP,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan verifikasi UEP",
      error: error.message,
    });
  }
};

export const getAllVerifikasiUEP = async (req, res) => {
  try {
    const allVerifikasi = await VerifikasiUEP.find();
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

export const updateUEP = async (req, res) => {
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

    const updatedVerifikasiUEP = await VerifikasiUEP.findByIdAndUpdate(
      id,
      { tahun, jumlahBantuan, sumberDana, status },
      { new: true }
    );

    if (!updatedVerifikasiUEP) {
      return res.status(404).json({
        success: false,
        message: "Verifikasi UEP tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Verifikasi UEP berhasil diperbarui",
      data: updatedVerifikasiUEP
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui verifikasi UEP",
      error: error.message
    });
  }
};

export const deleteUEP = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVerifikasiUEP = await VerifikasiUEP.findByIdAndDelete(id);

    if (!deletedVerifikasiUEP) {
      return res.status(404).json({
        success: false,
        message: "Verifikasi UEP tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Verifikasi UEP berhasil dihapus",
      data: deletedVerifikasiUEP
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus verifikasi UEP",
      error: error.message
    });
  }
};

export const verifikasiUEP = async (req, res) => {
  try {
    const { uepId } = req.params;
    const { tahun, jumlahBantuan, sumberDana, status } = req.body;

    // Validation
    if (!tahun || !jumlahBantuan || !sumberDana || !status) {
      return res.status(400).json({
        success: false,
        message: "tahun, jumlahBantuan, sumberDana, dan status harus diisi"
      });
    }

    const verifikasi = new VerifikasiUEP({
      uepId,
      tahun,
      jumlahBantuan,
      sumberDana,
      status
    });

    await verifikasi.save();

    res.status(200).json({
      success: true,
      message: "UEP berhasil diverifikasi",
      data: verifikasi
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
