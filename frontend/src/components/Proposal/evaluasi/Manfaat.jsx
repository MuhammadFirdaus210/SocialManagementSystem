import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EvaluasiManfaat = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    statusBantuan: '',
    namaPendamping: '',
    pekerjaanPendamping: ''
  });
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false); // To check if we are editing or creating new data
  const navigate = useNavigate();
  // Fetch data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/manfaat/getall`);
        const resData = await res.json();
        const evaluasiData = resData.manfaatList.filter((item) => item._id === id)[0];
        setData(evaluasiData);
        console.log("Data Verifikasi Manfaat:", evaluasiData);

        if (evaluasiData) {
          setFormData({
            statusBantuan: evaluasiData.evaluasiManfaat.statusBantuan,
            namaPendamping: evaluasiData.evaluasiManfaat.namaPendamping,
            pekerjaanPendamping: evaluasiData.evaluasiManfaat.pekerjaanPendamping
          });
          setIsEdit(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   
      // Update data if it exists
      const res = await fetch(`http://localhost:4000/api/v1/evaluasi/Manfaat/update/${data.evaluasiManfaat._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if(res.ok){
        alert('Data successfully updated!');
        navigate('/proposal/manfaat');
      }else{
        const resData = await res.json();
        console.log('Error updating data:', resData);
      }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Evaluasi Data Proposal Manfaat</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="statusBantuan">
            Status Bantuan
          </label>
          <div className="flex items-center border rounded px-3 py-2">
          <select
              name="statusBantuan"
              id="statusBantuan"
              value={formData.statusBantuan}
              onChange={handleChange}
              className="flex-1 outline-none">
              <option value="-">-</option>
              <option value="Tetap">Tetap</option>
              <option value="Berjalan">Berjalan</option>
              <option value="Hilang">Hilang</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="namaPendamping">
            Nama Pendamping
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <input
              type="text"
              name="namaPendamping"
              id="namaPendamping"
              value={formData.namaPendamping}
              onChange={handleChange}
              className="flex-1 outline-none"
              placeholder="Masukkan Nama Pendamping"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="pekerjaanPendamping">
            Pekerjaan Pendamping
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <input
              type="text"
              name="pekerjaanPendamping"
              id="pekerjaanPendamping"
              value={formData.pekerjaanPendamping}
              onChange={handleChange}
              className="flex-1 outline-none"
              placeholder="Masukkan Pekerjaan Pendamping"
            />
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EvaluasiManfaat;
