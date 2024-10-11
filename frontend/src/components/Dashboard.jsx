import React from 'react';
import image from '../images/headeraceh1.png';
import imageppks from '../images/ppks.png';
import imagepsks from '../images/psks.png';
import imageInputData from '../images/inputData.png'
import imageListData from '../images/ListData.png'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="w-full h-64 mb-4 transition hover:scale-105 rounded-lg relative bg-gradient-to-b from-blue-500"> 
        <img
          src={image}
          className="w-full h-64  object-cover rounded-lg"
          alt="Login"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <a href="/proposal/input" className="w-full h-80 bg-gradient-to-t from-blue-500 text-white rounded-lg flex items-center justify-center text-xl relative transition hover:text-[#bfd1fb] hover:scale-105">
            <img
              src={imageInputData}
              alt="Input Data"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-xl font-bold flex flex-col text-center"><span className='text-4xl'>Input</span>Data</span>
            </div>
            </a>
            <a href="/proposal" className="w-full h-80 bg-gradient-to-t from-blue-500 text-white rounded-lg flex items-center justify-center text-xl relative transition hover:scale-105 hover:text-[#bfd1fb]">
            <img
              src={imageListData}
              alt="list Data"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-xl font-bold flex flex-col text-center"><span className='text-4xl'>List</span>Data</span>
            </div>
            </a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
            <a href="/proposal/ppks/list">
          <div className="relative bg-gray-300 rounded-lg overflow-hidden h-48 transition hover:scale-105 cursor-pointer text-white hover:text-[#d3f280]">
            <img
              src={imageppks}
              alt="PPKS"
              className="w-full h-full object-cover"
              />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
              <span className="text-2xl font-bold">PPKS</span>
            </div>
          </div>
              </a>
            <a href="/proposal/psks/list">
          <div className="relative bg-gray-300 rounded-lg overflow-hidden h-48 transition hover:scale-105 cursor-pointer text-white hover:text-[#d3f280]">
            <img
              src={imagepsks}
              alt="PSKS"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-2xl font-bold">PSKS</span>
            </div>
          </div>
            </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
