import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Manfaat from './Manfaat';
import KUBE from './KUBE';
import UEP from './UEP';

const InputRoutes = ({ breadcrumbItems }) => {
  const newBreadcrumbItems = [...breadcrumbItems, { label: 'Input Data', path: '/proposal' }];
  const routes = [
    {path: "/manfaat", element: <Manfaat breadcrumbItems={[...newBreadcrumbItems, {label: 'Manfaat', path:''}]} />},
    {path: "/kube", element: <KUBE breadcrumbItems={[...newBreadcrumbItems, {label: 'Kelompok Usaha Bersama (KUBE)', path:''}]} />},
    {path: "/uep", element: <UEP breadcrumbItems={[...newBreadcrumbItems, {label: 'Usaha Ekonomi Produktif (UEP)', path:''}]} />},
  ]
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default InputRoutes;