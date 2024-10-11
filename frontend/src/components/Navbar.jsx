import React, {useState, useEffect} from 'react';
import { Sidebar } from "flowbite-react";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { ImStack } from "react-icons/im";
import { BiCoinStack } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const location = useLocation(); // mendapatkan lokasi saat ini

  const [ppksTypes, setPpksTypes] = useState([]);
  const [psksTypes, setPsksTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  useEffect(()=>{
    const fetchTypes = async () => {
      const responsePPKS = await fetch(`${process.env.REACT_APP_API_URL}/ppks/types`)
      const responsePPKSData = await responsePPKS.json();
      console.log("response PPKS", responsePPKSData);
      setPpksTypes(responsePPKSData)
      
      const responsePSKS = await fetch(`${process.env.REACT_APP_API_URL}/psks/types`)
      const responsePSKSData = await responsePSKS.json();
      console.log("response PSKS", responsePSKSData);
      setPsksTypes(responsePSKSData)
      setIsLoading(false);
    }
    fetchTypes();
  },[])
  
  return (
    <div className="navbar flex -mt-4 h-[90vh] overflow-y-visible ">
      {/* Sidebar Component */}
      <Sidebar aria-label="Sidebar with content separator example" className="h-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              as={Link}
              to="/dashboard"
              className={`text-xl font-bold text-center ${
                location.pathname === "/dashboard" ? "bg-slate-200 text-slate-700" : ""
              }`}
            >
              DASHBOARD
            </Sidebar.Item>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            <Sidebar.Item
              as={Link}
              to="/proposal"
              icon={BiCoinStack}
              className={location.pathname.startsWith("/proposal") ? "bg-slate-200 text-slate-700" : ""}
            >
              Proposal
            </Sidebar.Item>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            <h2 className="text-xl font-bold">PPKS</h2>
            <Sidebar.Collapse icon={IoBookOutline} label="Laporan PPKS">
             {isLoading && <p>Loading...</p>}
             {!isLoading && ppksTypes.map((type, index) => (
              <Sidebar.Item key={index} as={Link} to={`/ppks/${type.nama}`} className={location.pathname === `/ppks/${type.nama}` ? "text-sm font-bold pl-5 bg-slate-200 text-slate-700" : "text-sm pl-5 py-1 m-0"}>
                {type.nama} 
              </Sidebar.Item>
            ))}
          </Sidebar.Collapse>
            <Sidebar.Item
              as={Link}
              to="/ppks/cetak_rekapitulasi"
              icon={ImStack}
              className={location.pathname === "/ppks/rekap" ? "bg-slate-200 text-slate-700" : ""}
            >
              Rekapitulasi Data PPKS
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/ppks/cetak"
              icon={HiOutlineArrowDownTray}
              className={location.pathname === "/ppks/cetak" ? "bg-slate-200 text-slate-700" : ""}
            >
              Cetak Data PPKS
            </Sidebar.Item>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
          <h2 className="text-xl font-bold">PSKS</h2>
            <Sidebar.Collapse icon={IoBookOutline} label="Laporan PSKS">
             {isLoading && <p>Loading...</p>}
             {!isLoading && psksTypes.map((type, index) => (
              <Sidebar.Item key={index} as={Link} to={`/psks/${type.nama}`} className={location.pathname === `/psks/${type.nama}` ? "text-sm font-bold pl-5 bg-slate-200 text-slate-700" : "text-sm pl-5 py-1 m-0"}>
                {type.nama} 
              </Sidebar.Item>
            ))}
          </Sidebar.Collapse>
            <Sidebar.Item
              as={Link}
              to="/psks/cetak_rekapitulasi"
              icon={ImStack}
              className={location.pathname === "/psks/cetak_rekapitulasi" ? "bg-slate-200 text-slate-700" : ""}
            >
              Rekapitulasi Data PSKS
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/psks/cetak"
              icon={HiOutlineArrowDownTray}
              className={location.pathname === "/cetak-psks" ? "bg-slate-200 text-slate-700" : ""}
            >
              Cetak Data PSKS
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default Navbar;