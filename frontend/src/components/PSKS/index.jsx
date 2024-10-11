import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CetakData from '../Pages/cetak';
import CetakDataRekapitulasi from '../Pages/cetakRekap';
import TableLayout from '../Pages/table';

const PSKSRoutes = () => {
  const newBreadcrumbItems = [{ label: 'PSKS', path: 'ppks' }];
  const routes = [
    {path: "/", element:<TableLayout/> },
    {path: "/:tipe", element:<TableLayout jenis={'psks'}/> },
    {path: "/cetak", element: <CetakData tipe="PSKS" breadcrumbItems={[...newBreadcrumbItems, {label: 'Cetak Data', path:''}]} />},
    {path: "/cetak_rekapitulasi", element: <CetakDataRekapitulasi tipe="PSKS" breadcrumbItems={[...newBreadcrumbItems, {label: 'Cetak Data Rekapitulasi', path:''}]} />},

  ]
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default PSKSRoutes;