import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Manfaat from './Manfaat';
import VerifikasiKUBE from './KUBE';
import VerifikasiUEP from './UEP';

const VerifikasiRoutes = ({ breadcrumbItems }) => {
  const {tipe, id} = useParams();
  const newBreadcrumbItems = [...breadcrumbItems, { label: 'Input Data', path: '/proposal' }];
 
  if(tipe ===  "uep"){
    return (
      <VerifikasiUEP breadcrumbItems={[...newBreadcrumbItems, {label: 'Usaha Ekonomi Produktif (UEP)', path:''}]} />
    )
  }else if(tipe.toLowerCase() === "kube"){
    return(

      <VerifikasiKUBE breadcrumbItems={[...newBreadcrumbItems, {label: 'Kelompok Usaha Bersama (KUBE)', path:''}]} />
    )
  }else{
    return (
      <Manfaat breadcrumbItems={[...newBreadcrumbItems, {label: 'Manfaat', path:''}]} />
    );
  }
};

export default VerifikasiRoutes;

