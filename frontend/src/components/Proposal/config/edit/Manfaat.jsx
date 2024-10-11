import Breadcrumb from "../../../breadcrumb";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Manfaat = ({ breadcrumbItems, data }) => {
  const [bidangBantuanList, setBidangBantuanList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    NIK: "",
    nomorHP: "",
    nomorAgendaPermohonan: "",
    tanggalPermohonan: "",
    suratKurangMampu: "",
    rekomendasiCamat: "",
    bidangBantuan: "",
    jenisBantuan: "",
    verifikasiManfaat: {
      "tahun": 0,
      "jumlahBantuan": 0,
      "sumberDana": "-",
      "status": "-"
    },
    evaluasiManfaat: {
      "statusBantuan": "-",
      "namaPendamping": "-",
      "pekerjaanPendamping": "-"
    }
  });

  useEffect(()=>{
    if(data){
      setFormData({
        NIK: data.NIK || "",
        nomorHP: data.nomorHP || "",
        nomorAgendaPermohonan: data.nomorAgendaPermohonan || "",
        tanggalPermohonan: data.tanggalPermohonan ? data.tanggalPermohonan.split('T')[0] : "",
        suratKurangMampu: data.suratKurangMampu || "",
        rekomendasiCamat: data.rekomendasiCamat || "",
        bidangBantuan: data.bidangBantuan || "",
        jenisBantuan: data.jenisBantuan || "",
        verifikasiManfaat: {
          "tahun": data.verifikasiManfaat?.tahun || 0,
          "jumlahBantuan": data.verifikasiManfaat?.jumlahBantuan || 0,
          "sumberDana": data.verifikasiManfaat?.sumberDana || "-",
          "status": data.verifikasiManfaat?.status || "-"
        },
        evaluasiManfaat: {
          "statusBantuan": data.evaluasiManfaat?.statusBantuan || "-",
          "namaPendamping": data.evaluasiManfaat?.namaPendamping || "-",
          "pekerjaanPendamping": data.evaluasiManfaat?.pekerjaanPendamping || "-"
        }
      })
    }
  },[data])

  useEffect(() => {
    const fetchBidangBantuan = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/manfaat/bidang-bantuan-manfaat`);
      const data = await response.json();
      setBidangBantuanList(data.manfaats);
      setIsLoading(false);
    };
    fetchBidangBantuan();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/manfaat/update/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        // Reset form
        setFormData({
          NIK: "",
          nomorHP: "",
          nomorAgendaPermohonan: "",
          tanggalPermohonan: "",
          suratKurangMampu: "",
          rekomendasiCamat: "",
          bidangBantuan: "",
          jenisBantuan: "",
        });
        navigate("/proposal/manfaat");
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="NIK" className="block text-sm font-medium text-gray-700">
            NIK
          </label>
          <input
            type="text"
            id="NIK"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.NIK}
            onChange={handleInputChange}
            placeholder="Masukkan NIK"
          />
        </div>
        <div>
          <label htmlFor="nomorHP" className="block text-sm font-medium text-gray-700">
            Nomor HP
          </label>
          <input
            type="text"
            id="nomorHP"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.nomorHP}
            onChange={handleInputChange}
            placeholder="Masukkan Nomor HP"
          />
        </div>
        <div>
          <label htmlFor="nomorAgendaPermohonan" className="block text-sm font-medium text-gray-700">
            Nomor Agenda Permohonan
          </label>
          <input
            type="text"
            id="nomorAgendaPermohonan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.nomorAgendaPermohonan}
            onChange={handleInputChange}
            placeholder="Masukkan Nomor Agenda Permohonan"
          />
        </div>
        <div>
          <label htmlFor="tanggalPermohonan" className="block text-sm font-medium text-gray-700">
            Tanggal Permohonan
          </label>
          <input
            type="date"
            id="tanggalPermohonan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.tanggalPermohonan}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="suratKurangMampu" className="block text-sm font-medium text-gray-700">
            Surat Kurang Mampu (No & TGL)
          </label>
          <input
            type="text"
            id="suratKurangMampu"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.suratKurangMampu}
            onChange={handleInputChange}
            placeholder="Masukkan Surat Kurang Mampu (No & TGL)"
          />
        </div>
        <div>
          <label htmlFor="rekomendasiCamat" className="block text-sm font-medium text-gray-700">
            Rekomendasi Camat (No & TGL)
          </label>
          <input
            type="text"
            id="rekomendasiCamat"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.rekomendasiCamat}
            onChange={handleInputChange}
            placeholder="Masukkan Rekomendasi Camat (No & TGL)"
          />
        </div>
        <div>
          <label htmlFor="bidangBantuan" className="block text-sm font-medium text-gray-700">
            Bidang Bantuan
          </label>
          <select
            id="bidangBantuan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.bidangBantuan}
            onChange={handleInputChange}
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
          <label htmlFor="jenisBantuan" className="block text-sm font-medium text-gray-700">
            Jenis Bantuan
          </label>
          <input
            type="text"
            id="jenisBantuan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.jenisBantuan}
            onChange={handleInputChange}
            placeholder="Masukkan Jenis Bantuan"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Manfaat;
