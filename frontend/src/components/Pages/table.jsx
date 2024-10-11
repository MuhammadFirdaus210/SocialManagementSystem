import React, { useState, useEffect } from 'react';
import {
  Column,
  ColumnDef,
  PaginationState,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useParams } from 'react-router-dom';

const TableLayout = ({jenis = "ppks"}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter,    setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { tipe } = useParams();

  useEffect(()=>{
    const fetchTypes = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${jenis}/print-data`)
      const responseData = await response.json();
      console.log(jenis);
      // filter berdasarkan jenis PPKS/ PSKS
      const filteredData = responseData[`Example${jenis.toUpperCase()}Data`].filter((item) => {
        if(jenis.toLowerCase() === 'psks'){
          return item.Jenis_PSKS === tipe
        }else{
          return item.Jenis_PPKS === tipe
        }
      })
      console.log(filteredData[0]);

      setTableData(filteredData);

      // Jika ada data, generate kolom secara dinamis dari kunci data
      if (filteredData.length > 0) {
        const dynamicColumns = Object.keys(filteredData[0]).map((key) => ({
          accessorKey: key,
          header: key.replace(/_/g, ' '),
          size: 500,
        }));

        setColumns(dynamicColumns);
      }
      setIsLoading(false);
    }
    fetchTypes();
  },[jenis, tipe])




  // const columns = [
  //   {
  //     accessorKey: 'Kabupaten',
  //     header: 'Kabupaten',
  //   },
  //   {
  //     accessorKey: 'Kecamatan',
  //     header: 'Kecamatan',
  //   },
  //   {
  //     accessorKey: 'Gampong',
  //     header: 'Gampong',
  //   },
  //   {
  //     accessorKey: 'Nama',
  //     header: 'Nama',
  //   },
  //   {
  //     accessorKey: 'NIK',
  //     header: 'NIK',
  //   },
  //   {
  //     accessorKey: 'JK',
  //     header: 'Jenis Kelamin',
  //   },
  //   {
  //     accessorKey: 'Tanggal_Lahir',
  //     header: 'Tanggal Lahir',
  //   },
  //   {
  //     accessorKey: 'Alamat',
  //     header: 'Alamat',
  //   },
  //   {
  //     accessorKey: 'Jenis_PPKS',
  //     header: 'Jenis PPKS',
  //   },
  // ];

  // const [tableData] = useState([
  //   {
  //     Kabupaten: 'ACEH SELATAN',
  //     Kecamatan: 'KOTA BAHAGIA',
  //     Gampong: 'JAMBO KEUPOK',
  //     Nama: 'RAHMAT',
  //     NIK: '1101010108650023',
  //     JK: 'L',
  //     Tanggal_Lahir: '1965-08-15',
  //     Alamat: 'JAMBO KEUPOK',
  //     Jenis_PPKS: 'Pekerja Sosial Profesional',
  //   },
  //   {
  //     Kabupaten: 'ACEH SELATAN',
  //     Kecamatan: 'BAKONGAN',
  //     Gampong: 'DARUL IHSAN',
  //     Nama: 'SITI AMINAH',
  //     NIK: '1101010109700012',
  //     JK: 'P',
  //     Tanggal_Lahir: '1970-07-20',
  //     Alamat: 'DARUL IHSAN',
  //     Jenis_PPKS: 'Lembaga Kesejahteraan Sosial',
  //   },
  //   // Data lainnya
  // ]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    defaultColumn: {
      size: 300, //starting column size
      minSize: 250, //enforced during column resizing
      maxSize: 500,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if(isLoading){
    return <p>Loading...</p>
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">PPKS Table</h2>


      <input
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Cari..."
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="overflow-x-auto ">
        <table className="max-w-full bg-white overflow-auto">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                   <th
                   key={header.id}
                   className="px-4 py-2 border"
                   onClick={header.column.getToggleSortingHandler()}
              
                 >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 border text-xs" >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 border rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
        <span className="ml-4">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
      </div>
    </div>
  );
};

export default TableLayout;
