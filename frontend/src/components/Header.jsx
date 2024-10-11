import React, { useState } from 'react';
import '../App.css'; // Ensure you have the correct CSS path
import logo from '../images/logo_aceh.png';
import { CgProfile } from "react-icons/cg";
import { MdExitToApp } from "react-icons/md";

const Header = () => {
  const [isShowProfile, setIsShowProfile] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white p-3 shadow-md z-50 relative">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-12" />
        <h1 className="title ml-3 text-2xl font-bold text-blue-900">
          DINAS SOSIAL PROVINSI ACEH
        </h1>
      </div>
      <button
        onClick={() => setIsShowProfile(!isShowProfile)}
        className="relative focus:outline-none"
      >
        <CgProfile size={30} className="text-blue-900" />
        {isShowProfile && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-3 animate-fadeIn">
            <ul>
              <li>
                <a className="w-full text-left text-blue-900 font-semibold hover:bg-gray-100 p-2 rounded-md transition-all flex gap-2 items-center" href={"/logout"}>
                <MdExitToApp />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </button>
    </header>
  );
};

export default Header;
