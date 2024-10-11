import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";
import MyCetakData from "./cetakData";
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';

const CetakData = ({ breadcrumbItems, tipe }) => {
  const [kabupatenData, setKabupatenData] = useState([]);
  const [kecamatanData, setKecamatanData] = useState([]);
  const [desaData, setDesaData] = useState([]);
  const [jenisRekap, setJenisRekap] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Store filtered data here4
  const [examplePPKSData, setExamplePPKSData] = useState([])
  const [formValues, setFormValues] = useState({
    jenis: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${tipe}/print-data`);
      if (response.ok) {
        const data = await response.json();
        setKabupatenData(data.Kabupaten);
        setKecamatanData(data.Kecamatan);
        setExamplePPKSData(tipe === 'PPKS' ? data.ExamplePPKSData : data.ExamplePSKSData);
        console.log(data);

        if (tipe === 'PPKS') {
          setDesaData(data.Desa);
          setJenisRekap(data.Jenis_PPKS);
        } else {
          setDesaData(data.Gampong);
          setJenisRekap(data.Jenis_PSKS);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [tipe]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Handle form submission to filter data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { jenis, kabupaten, kecamatan, desa } = formValues;

    // Example data for filtering (replace with actual data if available)
    

    // Filtering logic based on form values
    const filtered = examplePPKSData.filter((item) => {
      return (
        (!jenis || item.Jenis_PPKS === jenis) &&
        (!kabupaten || item.Kabupaten === kabupaten) &&
        (!kecamatan || item.Kecamatan === kecamatan) &&
        (!desa || item.Gampong === desa)
      );
    });

    const fileName = 'rekap.pdf'
      const blob = await pdf(<MyCetakData data={filtered} header={{gampong:desa, kecamatan:kecamatan, kabupaten:kabupaten}} tipe={tipe}/>).toBlob();  
      saveAs(blob, fileName);

    
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <form className="grid grid-cols-1 gap-4 max-w-96" onSubmit={handleSubmit}>
        {/* Select for PPKS or PSKS */}
        {tipe === "PPKS" && (
          <div>
            <label htmlFor="jenis" className="block text-sm font-medium text-gray-700">
              Jenis PPKS
            </label>
            <select
              id="jenis"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formValues.jenis}
              onChange={handleInputChange}
            >
              <option value="">Pilih Jenis PPKS</option>
              {jenisRekap.map((jenis, index) => (
                <option key={index} value={jenis}>
                  {jenis}
                </option>
              ))}
            </select>
          </div>
        )}

        {tipe === "PSKS" && (
          <div>
            <label htmlFor="jenis" className="block text-sm font-medium text-gray-700">
              Jenis PSKS
            </label>
            <select
              id="jenis"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formValues.jenis}
              onChange={handleInputChange}
            >
              <option value="">Pilih Jenis PSKS</option>
              {jenisRekap.map((jenis, index) => (
                <option key={index} value={jenis}>
                  {jenis}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Dropdown for Kabupaten */}
        <div>
          <label htmlFor="kabupaten" className="block text-sm font-medium text-gray-700">
            Kabupaten/Kota
          </label>
          <select
            id="kabupaten"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formValues.kabupaten}
            onChange={handleInputChange}
          >
            <option value="">Pilih Kabupaten/Kota</option>
            {isLoading && <p>Loading ...</p>}
            {!isLoading &&
              kabupatenData.map((kecamatan, index) => (
                <option key={index} value={kecamatan}>
                  {kecamatan}
                </option>
              ))}
          </select>
        </div>

        {/* Dropdown for Kecamatan */}
        <div>
          <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">
            Kecamatan
          </label>
          <select
            id="kecamatan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formValues.kecamatan}
            onChange={handleInputChange}
          >
            <option value="">Pilih Kecamatan</option>
            {isLoading && <p>Loading ...</p>}
            {!isLoading &&
              kecamatanData.map((rekap, index) => (
                <option key={index} value={rekap}>
                  {rekap}
                </option>
              ))}
          </select>
        </div>

        {/* Dropdown for Desa */}
        <div>
          <label htmlFor="desa" className="block text-sm font-medium text-gray-700">
            Desa
          </label>
          <select
            id="desa"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formValues.desa}
            onChange={handleInputChange}
          >
            <option value="">Pilih Desa</option>
            {isLoading && <p>Loading ...</p>}
            {!isLoading &&
              desaData.map((rekap, index) => (
                <option key={index} value={rekap}>
                  {rekap}
                </option>
              ))}
          </select>
        </div>

        <div className="my-auto">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cetak
          </button>
        </div>
      </form>

      {/* Display filtered data */}
      {filteredData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Hasil Filter</h2>
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>
                {item.Nama} - {item.Jenis_PPKS}, {item.Kabupaten}, {item.Kecamatan}, {item.Gampong}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CetakData;
