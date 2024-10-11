import { VerifikasiManfaat } from "../models/verifikasiManfaatSchema.js";

export const addManfaat = async (req, res) => {
  const { tahun, jumlahBantuan, sumberDana, status } = req.body;

  // Validation
  if (!tahun || !jumlahBantuan || !sumberDana || !status) {
    return res.status(400).json({
      success: false,
      message: "tahun, jumlahBantuan, sumberDana, dan status harus diisi",
    });
  }

  try {
    const newVerifikasiManfaat = new VerifikasiManfaat({
      tahun,
      jumlahBantuan,
      sumberDana,
      status
    });

    // Save the new verification record
    await newVerifikasiManfaat.save();

    res.status(201).json({
      success: true,
      message: "Verifikasi Manfaat berhasil ditambahkan",
      data: newVerifikasiManfaat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menambahkan verifikasi Manfaat",
      error: error.message,
    });
  }
};

export const getAllVerifikasiManfaat = async (req, res) => {
  try {
    const allVerifikasi = await VerifikasiManfaat.find();
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

export const updateManfaat = async (req, res) => {
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

    const updatedVerifikasiManfaat = await VerifikasiManfaat.findByIdAndUpdate(
      id,
      { tahun, jumlahBantuan, sumberDana, status },
      { new: true }
    );

    if (!updatedVerifikasiManfaat) {
      return res.status(404).json({
        success: false,
        message: "Verifikasi Manfaat tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Verifikasi Manfaat berhasil diperbarui",
      data: updatedVerifikasiManfaat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui verifikasi Manfaat",
      error: error.message
    });
  }
};

export const deleteManfaat = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVerifikasiManfaat = await VerifikasiManfaat.findByIdAndDelete(id);

    if (!deletedVerifikasiManfaat) {
      return res.status(404).json({
        success: false,
        message: "Verifikasi Manfaat tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      message: "Verifikasi Manfaat berhasil dihapus",
      data: deletedVerifikasiManfaat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus verifikasi Manfaat",
      error: error.message
    });
  }
};

export const verifikasiManfaat = async (req, res) => {
  try {
    const { manfaatId } = req.params;
    const { tahun, jumlahBantuan, sumberDana, status } = req.body;

    // Validation
    if (!tahun || !jumlahBantuan || !sumberDana || !status) {
      return res.status(400).json({
        success: false,
        message: "tahun, jumlahBantuan, sumberDana, dan status harus diisi"
      });
    }

    const verifikasi = new VerifikasiManfaat({
      manfaatId,
      tahun,
      jumlahBantuan,
      sumberDana,
      status
    });

    await verifikasi.save();

    res.status(200).json({
      success: true,
      message: "Manfaat berhasil diverifikasi",
      data: verifikasi
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
