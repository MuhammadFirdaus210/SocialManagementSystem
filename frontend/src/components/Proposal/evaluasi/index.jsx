import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Manfaat from './Manfaat';
import EvaluasiKUBE from './KUBE';
import EvaluasiUEP from './UEP';

const EvaluasiRoutes = ({ breadcrumbItems }) => {
  const {tipe, id} = useParams();
  const newBreadcrumbItems = [...breadcrumbItems, { label: 'Input Data', path: '/proposal' }];
 
  if(tipe ===  "uep"){
    return (
      <EvaluasiUEP breadcrumbItems={[...newBreadcrumbItems, {label: 'Usaha Ekonomi Produktif (UEP)', path:''}]} />
    )
  }else if(tipe.toLowerCase() === "kube"){
    return(

      <EvaluasiKUBE breadcrumbItems={[...newBreadcrumbItems, {label: 'Kelompok Usaha Bersama (KUBE)', path:''}]} />
    )
  }else{
    return (
      <Manfaat breadcrumbItems={[...newBreadcrumbItems, {label: 'Manfaat', path:''}]} />
    );
  }
};

export default EvaluasiRoutes;

