import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CetakData from '../Pages/cetak';
import CetakDataRekapitulasi from '../Pages/cetakRekap';
import TableLayout from '../Pages/table';

const PPKSRoutes = () => {
  const newBreadcrumbItems = [{ label: 'PPKS', path: 'ppks' }];
  const routes = [
    {path: "/", element:<TableLayout/> },
    {path: "/:tipe", element:<TableLayout jenis={'ppks'}/> },
    {path: "/cetak", element: <CetakData tipe="PPKS" breadcrumbItems={[...newBreadcrumbItems, {label: 'Cetak Data', path:''}]} />},
    {path: "/cetak_rekapitulasi", element: <CetakDataRekapitulasi tipe="PPKS" breadcrumbItems={[...newBreadcrumbItems, {label: 'Cetak Data Rekapitulasi', path:''}]} />},
  ]
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default PPKSRoutes;