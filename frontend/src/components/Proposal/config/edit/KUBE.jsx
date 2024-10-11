import Breadcrumb from "../../../breadcrumb";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";

const KUBE = ({ breadcrumbItems, data }) => {
  const [bidangBantuanList, setBidangBantuanList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaKelompok: "",
    nomorHP: "",
    NIKKetua: "",
    nomorAgendaPermohonan: "",
    NIKSekretaris: "",
    tanggalPermohonan: "",
    NIKBendahara: "",
    suratKurangMampu: "",
    anggota: [
      {
        NIK: "",
        _id: ""
      }
    ],
    rekomendasiCamat: "",
    bidangBantuan: "",
    jenisBantuan: "",
    alamatUsaha: "",
    verifikasiKUBE: {
      tahun: 0,
      jumlahBantuan: 0,
      sumberDana: "",
      status: "",
      keterangan: ""
    },
    evaluasiKUBE: {
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
        namaKelompok: data.namaKelompok || "",
        nomorHP: data.nomorHP || "",
        NIKKetua: data.NIKKetua || "",
        nomorAgendaPermohonan: data.nomorAgendaPermohonan || "",
        NIKSekretaris: data.NIKSekretaris || "",
        tanggalPermohonan: data.tanggalPermohonan ? data.tanggalPermohonan.split('T')[0] : "",
        NIKBendahara: data.NIKBendahara || "",
        suratKurangMampu: data.suratKurangMampu || "",
        anggota: data.anggota || [{ NIK: "", _id: "" }],
        rekomendasiCamat: data.rekomendasiCamat || "",
        bidangBantuan: data.bidangBantuan || "",
        jenisBantuan: data.jenisBantuan || "",
        alamatUsaha: data.alamatUsaha || "",
        verifikasiKUBE: {
          tahun: data.verifikasiKUBE?.tahun || 0,
          jumlahBantuan: data.verifikasiKUBE?.jumlahBantuan || 0,
          sumberDana: data.verifikasiKUBE?.sumberDana || "",
          status: data.verifikasiKUBE?.status || "",
          keterangan: data.verifikasiKUBE?.keterangan || ""
        },
        evaluasiKUBE: {
          statusBantuan: data.evaluasiKUBE?.statusBantuan || "",
          namaPendamping: data.evaluasiKUBE?.namaPendamping || "",
          pekerjaanPendamping: data.evaluasiKUBE?.pekerjaanPendamping || ""
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/kube/update/${data._id}`, {
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
          namaKelompok: "",
          nomorHP: "",
          NIKKetua: "",
          nomorAgendaPermohonan: "",
          NIKSekretaris: "",
          tanggalPermohonan: "",
          NIKBendahara: "",
          suratKurangMampu: "",
          anggota: [
            {
              NIK: "",
              _id: ""
            }
          ],
          rekomendasiCamat: "",
          bidangBantuan: "",
          jenisBantuan: "",
          alamatUsaha: "",
          verifikasiKUBE: {
            tahun: 0,
            jumlahBantuan: 0,
            sumberDana: "",
            status: "",
            keterangan: ""
          },
          evaluasiKUBE: {
            statusBantuan: "",
            namaPendamping: "",
            pekerjaanPendamping: ""
          }
        });
        navigate("/proposal/kube");
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

  const handleAnggotaChange = (index, e) => {
    const { value } = e.target;
    const newAnggota = [...formData.anggota];
    newAnggota[index] = { NIK: value };
    setFormData({ ...formData, anggota: newAnggota });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };


  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="namaKelompok" className="block text-sm font-medium text-gray-700">
            Nama Kelompok
          </label>
          <input
            type="text"
            id="namaKelompok"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.namaKelompok}
            onChange={handleInputChange}
            placeholder="Enter Nama Kelompok"
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
            placeholder="Enter Nomor HP"
          />
        </div>
        <div>
          <label htmlFor="NIKKetua" className="block text-sm font-medium text-gray-700">
            NIK Ketua
          </label>
          <input
            type="text"
            id="NIKKetua"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.NIKKetua}
            onChange={handleInputChange}
            placeholder="Enter NIK Ketua"
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
            placeholder="Enter Nomor Agenda Permohonan"
          />
        </div>
        <div>
          <label htmlFor="NIKSekretaris" className="block text-sm font-medium text-gray-700">
            NIK Sekretaris
          </label>
          <input
            type="text"
            id="NIKSekretaris"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.NIKSekretaris}
            onChange={handleInputChange}
            placeholder="Enter NIK Sekretaris"
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
          <label htmlFor="NIKBendahara" className="block text-sm font-medium text-gray-700">
            NIK Bendahara
          </label>
          <input
            type="text"
            id="NIKBendahara"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.NIKBendahara}
            onChange={handleInputChange}
            placeholder="Enter NIK Bendahara"
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
            placeholder="Enter Surat Kurang Mampu (No & TGL)"
          />
        </div>

        {formData.anggota.map((anggota, index) => (
          <div key={index}>
            <label htmlFor={`anggota-${index}`} className="block text-sm font-medium text-gray-700">
              NIK Anggota {index + 1}
            </label>
            <input
              type="text"
              id={`anggota-${index}`}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={anggota.NIK}
              onChange={(e) => handleAnggotaChange(index, e)}
              placeholder={`Enter NIK Anggota ${index + 1}`}
            />
          </div>
        ))}

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
            placeholder="Enter Rekomendasi Camat (No & TGL)"
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
            placeholder="Enter Jenis Bantuan"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="alamatUsaha" className="block text-sm font-medium text-gray-700">
            Alamat Usaha
          </label>
          <input
            type="text"
            id="alamatUsaha"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.alamatUsaha}
            onChange={handleInputChange}
            placeholder="Enter Alamat Usaha"
          />
        </div>
        <div className="col-span-2 max-w-40">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  
  );
};

export default KUBE;
