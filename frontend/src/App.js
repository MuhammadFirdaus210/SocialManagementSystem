import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'; // Ensure this points to your correct CSS file path

import ProposalRoutes from './components/Proposal/index';
import Dashboard from './components/Dashboard';
import TableADK from './components/PPKS/Tables/ADK';
import LoginPage from './components/LoginPage';
import Layout from './components/layout';
import PPKSRoutes from './components/PPKS';
import PSKSRoutes from './components/PSKS';
import { useAuth, AuthProvider } from './context/authContext';
import ProtectedRoutes from './ProtectedRoutes';
import axios from 'axios';


const App = () => {
  React.useEffect(()=>{
    document.title = "Sistem Informasi PPKS dan PSKS"
  })
  axios.defaults.withCredentials = true
  return (
    <AuthProvider>        
    <Router>
        <Routes>
          <Route path="/login" element={<LoginPage/>}    />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Layout element={<Dashboard />} />} />
            <Route path="/proposal/*" element={<Layout element={<ProposalRoutes />} />} />
            <Route path="/dashboard" element={<Layout element={<Dashboard />} />} />
            <Route path="/ppks/*" element={<Layout element={<PPKSRoutes/>} />} />
            <Route path="/psks/*" element={<Layout element={<PSKSRoutes/>} />} />
            <Route path="/test1" element={<Layout element={<TableADK/>} />} />
            <Route path="/logout" element={<Layout element={<Logout/>}/>}/>
          </Route>
        </Routes>
    </Router>
          </AuthProvider>
  );
};


const Logout = () => {
  const {logoutAction} = useAuth();
  logoutAction()

  return <Navigate to="/login" /> ;  
}

export default App;
