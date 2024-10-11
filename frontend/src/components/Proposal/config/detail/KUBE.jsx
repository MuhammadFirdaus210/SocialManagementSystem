import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailKUBE = () => {
  const { id } = useParams();
  const [kubeData, setKubeData] = useState(null);
  const [verifikasiData, setVerifikasiData] = useState(null);
  const [evaluasiData, setEvaluasiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {tipe} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Panggil ketiga endpoint tanpa parameter :id, filter dilakukan di React
        const [kubeRes, verifikasiRes, evaluasiRes] = await Promise.all([
          axios.get('http://localhost:4000/api/v1/kube/getall-kube'),
          axios.get('http://localhost:4000/api/v1/verifikasi/Kube/verifikasi'),
          axios.get('http://localhost:4000/api/v1/evaluasi/Kube/getall-eval')
        ]);

        // Filter berdasarkan id yang didapat dari useParams
        const filteredKube = kubeRes.data.kubes.find((kube) => kube._id === id);
        const filteredVerifikasi = filteredKube?.verifikasiKUBE || {};
        const filteredEvaluasi = filteredKube?.evaluasiKUBE || {};

        setKubeData(filteredKube || {});
        setVerifikasiData(filteredVerifikasi || {});
        setEvaluasiData(filteredEvaluasi || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const kategoriPenerima = [
    { label: "ODKB", value: "" },
    { label: "ADK", value: "" },
    { label: "AY,PYP", value: "" },
    { label: "AT", value: "" },
    { label: "AJ", value: "" },
    { label: "ABT", value: "" },
    { label: "AKTK", value: "" },
    { label: "PRSE", value: "" },
    { label: "KTK", value: "" },
    { label: "LUT", value: "" },
    { label: "PD", value: "" },
    { label: "TS", value: "" },
    { label: "PGMS", value: "" },
    { label: "GLDG", value: "" },
    { label: "BWBK", value: "" },
    { label: "NAPZA", value: "" },
    { label: "FM", value: "" },
    { label: "RTLH", value: "" },
    { label: "KR", value: "" },
    { label: "KBSP", value: "" },
    { label: "KAT", value: "" },
    { label: "KBA", value: "" },
    { label: "KBS", value: "" },
    { label: "PM", value: "" },
    { label: "ODHA", value: "" }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!kubeData) {
    return <div>Data tidak ditemukan.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Detail Data {tipe.toUpperCase()}</h2>

      {/* Section for Detail Data */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Nomor Agenda Permohonan:</span>
          <span className="ml-2 text-gray-700">{kubeData.nomorAgendaPermohonan || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Tanggal Permohonan:</span>
          <span className="ml-2 text-gray-700">{kubeData.tanggalPermohonan ? new Date(kubeData.tanggalPermohonan).toLocaleDateString() : '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">NIK:</span>
          <span className="ml-2 text-gray-700">{kubeData.NIKKetua || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Nomor HP:</span>
          <span className="ml-2 text-gray-700">{kubeData.nomorHP || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Surat Kurang Mampu:</span>
          <span className="ml-2 text-gray-700">{kubeData.suratKurangMampu || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Bidang Bantuan:</span>
          <span className="ml-2 text-gray-700">{kubeData.bidangBantuan || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Jenis Bantuan:</span>
          <span className="ml-2 text-gray-700">{kubeData.jenisBantuan || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Alamat Usaha:</span>
          <span className="ml-2 text-gray-700 max-w-44">{kubeData.alamatUsaha || '-'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Tahun Verifikasi:</span>
          <span className="ml-2 text-gray-700">{verifikasiData?.tahun || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Jumlah Bantuan:</span>
          <span className="ml-2 text-gray-700">{verifikasiData?.jumlahBantuan || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Status Verifikasi:</span>
          <span className="ml-2 text-gray-700">{verifikasiData?.status || '-'}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Status Bantuan:</span>
          <span className="ml-2 text-gray-700">{evaluasiData?.statusBantuan || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Nama Pendamping:</span>
          <span className="ml-2 text-gray-700">{evaluasiData?.namaPendamping || '-'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-600 capitalize w-1/2">Pekerjaan Pendamping:</span>
          <span className="ml-2 text-gray-700">{evaluasiData?.pekerjaanPendamping || '-'}</span>
        </div>
      </div>

      {/* Section for Kategori Penerima */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Kategori Penerima</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Kategori</th>
            <th className="px-4 py-2 text-left">Nilai</th>
          </tr>
        </thead>
        <tbody>
          {kategoriPenerima.map((kategori, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{kategori.label}</td>
              <td className="px-4 py-2">{kategori.value || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailKUBE;
