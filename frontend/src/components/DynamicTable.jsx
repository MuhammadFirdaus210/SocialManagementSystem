import React, { useState } from 'react';
import { Table, Input, Select, Button } from 'antd';

const { Option } = Select;
const { Search } = Input;

const DynamicTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({
    kabupaten: '',
    kecamatan: '',
    desa: '',
    jenisKelamin: '',
    alamat: ''
  });

  const handleFilterChange = (value, filterType) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleSearch = (value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      alamat: value,
    }));
  };

  const applyFilters = () => {
    let filtered = data;

    if (filters.kabupaten) {
      filtered = filtered.filter(item => item.kabupaten.includes(filters.kabupaten));
    }
    if (filters.kecamatan) {
      filtered = filtered.filter(item => item.kecamatan.includes(filters.kecamatan));
    }
    if (filters.desa) {
      filtered = filtered.filter(item => item.desa.includes(filters.desa));
    }
    if (filters.jenisKelamin) {
      filtered = filtered.filter(item => item.jenisKelamin.includes(filters.jenisKelamin));
    }
    if (filters.alamat) {
      filtered = filtered.filter(item => item.alamat.toLowerCase().includes(filters.alamat.toLowerCase()));
    }

    setFilteredData(filtered);
  };

  const columns = Object.keys(data[0] || {}).map(key => ({
    title: key,
    dataIndex: key,
    key: key,
  }));

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: '10px' }}>
        <Select
          placeholder="Filter by Kabupaten"
          onChange={value => handleFilterChange(value, 'kabupaten')}
          style={{ width: 200 }}
        >
          {[...new Set(data.map(item => item.kabupaten))].map(kabupaten => (
            <Option key={kabupaten} value={kabupaten}>{kabupaten}</Option>
          ))}
        </Select>
        <Select
          placeholder="Filter by Kecamatan"
          onChange={value => handleFilterChange(value, 'kecamatan')}
          style={{ width: 200 }}
        >
          {[...new Set(data.map(item => item.kecamatan))].map(kecamatan => (
            <Option key={kecamatan} value={kecamatan}>{kecamatan}</Option>
          ))}
        </Select>
        <Select
          placeholder="Filter by Desa"
          onChange={value => handleFilterChange(value, 'desa')}
          style={{ width: 200 }}
        >
          {[...new Set(data.map(item => item.desa))].map(desa => (
            <Option key={desa} value={desa}>{desa}</Option>
          ))}
        </Select>
        <Select
          placeholder="Filter by Jenis Kelamin"
          onChange={value => handleFilterChange(value, 'jenisKelamin')}
          style={{ width: 200 }}
        >
          {[...new Set(data.map(item => item.jenisKelamin))].map(jenisKelamin => (
            <Option key={jenisKelamin} value={jenisKelamin}>{jenisKelamin}</Option>
          ))}
        </Select>
        <Search
          placeholder="Search by Alamat"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Button onClick={applyFilters} type="primary">Apply Filters</Button>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record, index) => index}
      />
    </div>
  );
};

export default DynamicTable;
