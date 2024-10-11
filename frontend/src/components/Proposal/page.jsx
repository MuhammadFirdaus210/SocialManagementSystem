import React, { useEffect } from "react";
import Breadcrumb from "../breadcrumb";

const Proposal = ({ breadcrumbItems, tipe }) => {

  if (tipe === "input") {
    return (
      <div className="p-4 w-full">
        <Breadcrumb items={breadcrumbItems} />
        <div className="my-8 bg-white p-4 rounded-md shadow-md flex-1 py-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold mb-4">Input Data</h2>
            <a
              href="/proposal"
              className="bg-blue-500 text-white p-2 rounded-md shadow-md"
            >
              List Data
            </a>
          </div>
          <div className="flex flex-col">
            <a
              href="/proposal/input/uep"
              className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105"
            >
              Usaha Ekonomi Produktif (UEP)
            </a>
            <a
              href="/proposal/input/kube"
              className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105"
            >
              Kelompok Usaha Bersama (KUBE)
            </a>
            <a
              href="/proposal/input/manfaat"
              className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105"
            >
              Penerima Manfaat
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <Breadcrumb items={breadcrumbItems} />
      <div className="my-8 flex justify-center items-center gap-5">
        <div className="bg-white p-4 rounded-md shadow-md flex-1 py-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold mb-4">List Data</h2>
            <a
              href="/proposal/input"
              className="bg-blue-500 text-white p-2 rounded-md shadow-md"
            >
              + Input Data
            </a>
          </div>
          <div className="flex flex-col">
            <a
              href="/proposal/uep"
              className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105"
            >
              Usaha Ekonomi Produktif (UEP)
            </a>
            <a
              href="/proposal/kube"
              className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105"
            >
              Kelompok Usaha Bersama (KUBE)
            </a>
            <a
              href="/proposal/manfaat"
              className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105"
            >
              Penerima Manfaat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
