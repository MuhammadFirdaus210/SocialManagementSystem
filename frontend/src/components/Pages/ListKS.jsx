import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LaporanPage = () => {
  const { tipe } = useParams();
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (tipe === 'ppks') {
          response = await fetch(`${process.env.REACT_APP_API_URL}/ppks/types`);
        } else if (tipe === 'psks') {
          response = await fetch(`${process.env.REACT_APP_API_URL}/psks/types`);
        }

        if (response.ok) {
          const data = await response.json();
          setDataList(data);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [tipe]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }} className='bg-white border rounded-xl'>
      <h2 className='mb-5 font-bold'>Daftar {tipe.toUpperCase()}</h2>
      <ul style={listStyle}>
        {dataList.map((item, index) => (
            <a href={`/proposal/${tipe}/${item.nama}`} key={index} style={listItemStyle} className='hover:scale-105 hover:font-bold'>
            {item.nama}
            </a>
        ))}
      </ul>

      <div className="mt-5">
        <table className="" border={0}>
          <tbody>
        {dataList.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.nama}</td>
                <td className="border px-4 py-2">{item.kepanjangan}</td>
              </tr>
        ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

const listStyle = {
  listStyleType: 'none',
  padding: '0',
  margin: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '10px',
};

const listItemStyle = {
  backgroundColor: '#f0f0f0',
  padding: '15px',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
};

export default LaporanPage;
