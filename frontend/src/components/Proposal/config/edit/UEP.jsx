import Breadcrumb from "../../../breadcrumb";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";

const UEP = ({ breadcrumbItems, data }) => {
  const [bidangBantuanList, setBidangBantuanList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nik: "",
    nomorHP: "",
    nomorAgendaPermohonan: "",
    tanggalPermohonan: "",
    suratKurangMampu: "",
    rekomendasiCamat: "",
    bidangBantuan: "",
    jenisBantuan: "",
    alamatUsaha: "",
    verifikasiUEP: {
      tahun: "",
      jumlahBantuan: "",
      sumberDana: "",
      status: "",
    },
    evaluasiUEP: {
      statusBantuan: "",
      namaPendamping: "",
      pekerjaanPendamping: ""
    }
  });

  const { getToken } = useAuth();

  useEffect(() => {
    console.log("Data dari UEP Edit:", data);
    // Mengisi nilai formData saat data tersedia (untuk keperluan edit)
    if (data) {
      setFormData({
        nik: data.nik || "",
        nomorHP: data.nomorHP || "",
        nomorAgendaPermohonan: data.nomorAgendaPermohonan || "",
        tanggalPermohonan: data.tanggalPermohonan ? data.tanggalPermohonan.split('T')[0] : "",
        suratKurangMampu: data.suratKurangMampu || "",
        rekomendasiCamat: data.rekomendasiCamat || "",
        bidangBantuan: data.bidangBantuan || "",
        jenisBantuan: data.jenisBantuan || "",
        alamatUsaha: data.alamatUsaha || "",
        verifikasiUEP: {
          tahun: data.verifikasiUEP?.tahun || "0",
          jumlahBantuan: data.verifikasiUEP?.jumlahBantuan || "0",
          sumberDana: data.verifikasiUEP?.sumberDana || "-",
          status: data.verifikasiUEP?.status || "Approved"
        },
        evaluasiUEP: {
          statusBantuan: data.evaluasiUEP?.statusBantuan || "-",
          namaPendamping: data.evaluasiUEP?.namaPendamping || "-",
          pekerjaanPendamping: data.evaluasiUEP?.pekerjaanPendamping || "-"
        }
      });
    }
  }, [data]);

  useEffect(() => {
    const fetchBidangBantuan = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/uep/bidang-bantuan-uep`);
      const data = await response.json();
      setBidangBantuanList(data.bidangBantuan);
      setIsLoading(false);
    };
    fetchBidangBantuan();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/uep/update/${data._id}`, {
        method: "PUT", 
        headers: {
          'Authorization': `Bearer ${token}`,   
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setFormData({
          nik: "",
          nomorHP: "",
          nomorAgendaPermohonan: "",
          tanggalPermohonan: "",
          suratKurangMampu: "",
          rekomendasiCamat: "",
          bidangBantuan: "",
          jenisBantuan: "",
          alamatUsaha: "",
          verifikasiUEP: {
            tahun: "",
            jumlahBantuan: "",
            sumberDana: "",
            status: ""
          },
          evaluasiUEP: {
            statusBantuan: "",
            namaPendamping: "",
            pekerjaanPendamping: ""
          }
        });
        navigate("/proposal/uep");
      } else {
        const data = await response.json();
        console.log("Error submitting form:", data);
        alert("Terjadi kesalahan, coba lagi.");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
          <input
            type="text"
            id="nik"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Masukkan NIK"
            value={formData.nik}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nomorHP" className="block text-sm font-medium text-gray-700">Nomor HP</label>
          <input
            type="text"
            id="nomorHP"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Masukkan Nomor HP"
            value={formData.nomorHP}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nomorAgendaPermohonan" className="block text-sm font-medium text-gray-700">Nomor Agenda Permohonan</label>
          <input
            type="text"
            id="nomorAgendaPermohonan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Masukkan Nomor Agenda Permohonan"
            value={formData.nomorAgendaPermohonan}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tanggalPermohonan" className="block text-sm font-medium text-gray-700">Tanggal Permohonan</label>
          <input
            type="date"
            id="tanggalPermohonan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.tanggalPermohonan}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="suratKurangMampu" className="block text-sm font-medium text-gray-700">Surat Kurang Mampu</label>
          <input
            type="text"
            id="suratKurangMampu"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Masukkan Surat Kurang Mampu"
            value={formData.suratKurangMampu}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rekomendasiCamat" className="block text-sm font-medium text-gray-700">Rekomendasi Camat</label>
          <input
            type="text"
            id="rekomendasiCamat"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Masukkan Rekomendasi Camat"
            value={formData.rekomendasiCamat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bidangBantuan" className="block text-sm font-medium text-gray-700">Bidang Bantuan</label>
          <select
            id="bidangBantuan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.bidangBantuan}
            onChange={handleChange}
          >
            <option value="">Select Bidang Bantuan</option>
            {bidangBantuanList.map((bidang, index) => (
              <option key={index} value={bidang}>
                {bidang}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="jenisBantuan" className="block text-sm font-medium text-gray-700">Jenis Bantuan</label>
          <input
            type="text"
            id="jenisBantuan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Masukkan Jenis Bantuan"
            value={formData.jenisBantuan}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="alamatUsaha" className="block text-sm font-medium text-gray-700">Alamat Usaha</label>
          <input
            type="text"
            id="alamatUsaha"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Masukkan Alamat Usaha"
            value={formData.alamatUsaha}
            onChange={handleChange}
          />
        </div>
        <div className="my-auto mx-auto">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UEP;
