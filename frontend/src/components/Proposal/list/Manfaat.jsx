import React, { useState, useEffect, useMemo } from "react";
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
} from "@tanstack/react-table";
import { CiViewList } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const TableManfaat = ({ jenis = "ppks", tipe }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idRow, setIdRow] = useState(0);

  const [rawData, setRawData] = useState([]);
  const [evaluasiData, setEvaluasiData] = useState([]);
  const [verifikasiData, setVerifikasiData] = useState([]);

  const [showRowMenuId, setShowRowMenuId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // raw
  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/manfaat/getall`
      );
      const responseData = await response.json();
      const data = responseData.manfaatList;
      setRawData(data);
      console.log("Raw ", data);
    };
    fetchTypes();
  }, [refresh]);
  // verifikasi
  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/verifikasi/Manfaat/verifikasi`
      );
      const responseData = await response.json();
      const data = responseData.data;
      setVerifikasiData(data);
      console.log("Verif ", data);
    };
    fetchTypes();
  }, [refresh]);
  // evaluasi
  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/evaluasi/Manfaat/getall-eval`
      );
      const responseData = await response.json();
      const data = responseData.data;
      setEvaluasiData(data);
      console.log("Eval ", data);
    };
    fetchTypes();
  }, [refresh]);

  // Gabungan
  useEffect(() => {
    const combinedData = rawData.map((item, index) => {
      const verifikasi = verifikasiData.find((v) => v._id === item._id);
      const evaluasi = evaluasiData.find((e) => e._id === item._id);
      return {
        ...item,
        statusBantuan: item.evaluasiManfaat.statusBantuan || "-",
        namaPendamping: item.evaluasiManfaat.namaPendamping || "-",
        pekerjaanPendamping: item.evaluasiManfaat.pekerjaanPendamping || "-",
        sumberDana: item.verifikasiManfaat.sumberDana || "-",
        jumlahBantuan: item.verifikasiManfaat.jumlahBantuan || "-",
        tahun: item.verifikasiManfaat.tahun || "-",
        status: item.verifikasiManfaat.status || "-",
      };
    });
    setTableData(combinedData);
    setIsLoading(false);
  }, [rawData, evaluasiData, verifikasiData, refresh]);

  const columns = useMemo(
    () => [
      {
        id: "index",
        header: "#",
        cell: ({ row, table }) =>
          (table
            .getSortedRowModel()
            ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1,
      },
      {
        id: "config",
        header: "Config",
        cell: function Cell(info) {
          const [isShow, setIsShow] = useState(false);
  
          const handleAction = (action) => {
            if (action === "edit") {
              handleEdit(info.row.original);
            } else if (action === "delete") {
              handleDelete(info.row.original);
            } else if (action === "detail") {
              handleDetail(info.row.original);
            }
            setIsShow(false); // Tutup menu setelah aksi
          };
  
          useEffect(() => {
            const handleOutsideClick = (e) => {
              if (
                isShow &&
                !e.target.closest(".rowMenu") &&
                !e.target.closest(".btn-config")
              ) {
                setIsShow(false);
              }
            };
            window.addEventListener("click", handleOutsideClick);
  
            return () => {
              window.removeEventListener("click", handleOutsideClick);
            };
          }, [isShow]);
  
          return (
            <div className="relative">
              <button
                onClick={() => setIsShow(!isShow)}
                className="btn-config bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Config
              </button>
              {isShow && (
                <ul className="rowMenu fixed bg-slate-100/80 border rounded shadow-md w-32 z-[1000] p-1">
                  <a
                    href={`/proposal/manfaat/detail/${info.row.original._id}`}
                    className="font-semibold flex gap-2 pl-3 items-center text-white py-2 hover:bg-green-500 bg-green-600 hover:text-white transition duration-200 ease-in-out cursor-pointer mb-1 rounded-md text-center"
                    style={{ border: "2px solid #C8E6C9" }}
                  >
                    <CiViewList />
                    Detail
                  </a>
                  <a
                    href={`/proposal/manfaat/edit/${info.row.original._id}`}
                    className="font-semibold flex gap-2 pl-3 items-center text-white py-2 hover:bg-blue-500 bg-blue-600 hover:text-white transition duration-200 ease-in-out cursor-pointer mb-1 rounded-md text-center"
                    style={{ border: "2px solid #B2EBF2" }}
                  >
                    <MdEdit />
                    Edit
                  </a>
                  <li
                    onClick={() => handleAction("delete")}
                    className="font-semibold flex gap-2 pl-3 items-center text-white py-2 hover:bg-red-500 bg-red-600 hover:text-white transition duration-200 ease-in-out cursor-pointer rounded-md text-center"
                    style={{ border: "2px solid #FFCDD2" }}
                  >
                    <MdDelete />
                    Hapus
                  </li>
                </ul>
              )}
            </div>
          );
        },
      },
      {
        id: "verifikasi",
        header: "Verifikasi",
        cell: (info) => (
          <a
            href={`/proposal/manfaat/verifikasi/${info.row.original._id}`}
            className="btn-config bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Verifikasi
          </a>
        ),
      },
      {
        id: "evaluasi",
        header: "Evaluasi",
        cell: (info) => (
          <a
            href={`/proposal/manfaat/evaluasi/${info.row.original._id}`}
            className="btn-config bg-orange-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Evaluasi
          </a>
        ),
      },
      {
        accessorKey: "NIK",
        header: "NIK Pemohon",
      },
      {
        accessorKey: "nomorHP",
        header: "Nomor HP",
      },
      {
        accessorKey: "nomorAgendaPermohonan",
        header: "No Agenda",
        cell: (info) => info.row.original.nomorAgendaPermohonan || "-",
      },
      {
        accessorKey: "tanggalPermohonan",
        header: "Tanggal Permohonan",
        cell: (info) =>
          new Date(info.row.original.tanggalPermohonan).toLocaleDateString(),
      },
      {
        accessorKey: "suratKurangMampu",
        header: "Surat Kurang Mampu",
      },
      {
        accessorKey: "rekomendasiCamat",
        header: "Rekomendasi Camat",
      },
      {
        accessorKey: "bidangBantuan",
        header: "Bidang Bantuan",
      },
      {
        accessorKey: "jenisBantuan",
        header: "Jenis Bantuan",
      },
      {
        accessorKey: "tahun",
        header: "Tahun",
      },
      {
        accessorKey: "jumlahBantuan",
        header: "Jumlah Bantuan",
        cell: (info) => `Rp ${info.row.original.jumlahBantuan.toLocaleString()}`,
      },
      {
        accessorKey: "sumberDana",
        header: "Sumber Dana",
      },
      {
        accessorKey: "statusBantuan",
        header: "Status",
      },
  
      {
        accessorKey: "namaPendamping",
        header: "Nama Pendamping",
      },
      {
        accessorKey: "pekerjaanPendamping",
        header: "Pekerjaan Pendamping",
      },
      
    ],
    []
  );
  
  

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    defaultColumn:{
      size: 200
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleEdit = (row) => {
    alert("Edit clicked for: " + row.id);
  };

  const handleDelete = (row) => {
    setIdRow(row._id);
    // alert('Delete clicked for: ' + row._id);
    setModalOpen(true);
  };

  const handleDetail = (row) => {
    alert("Detail clicked for: " + row.id);
  };

  const handleEvaluasi = (row) => {
    alert("Evaluasi clicked for: " + row.id);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const handleDeleteAction = async () => {
    // alert('Delete clicked for: ' + idRow);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/manfaat/delete/${idRow}`,
        
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        }
      );

      if (response.ok) {
        alert("Data berhasil dihapus");
      } else {
        console.log("Error", response);
        const data = await response.json();
        alert("err: ", data.data);
      }
    } catch (err) {
      console.log("error", err.message);
      alert("Error " + err.message);
    }
    setRefresh(!refresh);
    setModalOpen(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading ...</div>;
  }

  return (
    <>
      {/* Overlay */}
      {isModalOpen && (
        <>
          <div
            className="absolute inset-0 bg-black opacity-50 z-[1005]"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-[1006]">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
              <p>Apakah Anda yakin ingin menghapus item ini?</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                  onClick={handleDeleteAction}
                >
                  Hapus
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="p-6 bg-white rounded-lg shadow-md ">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          List Data {tipe.toUpperCase()}
        </h2>

        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari..."
          className="mb-4 p-2 border rounded w-full"
        />

        <div className="overflow-x-auto overflow-y-auto h-[70%]">
          <table className="min-w-full bg-white ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2 border"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 border text-xs"
                      style={{ width: "500px" }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </>
  );
};

export default TableManfaat;




