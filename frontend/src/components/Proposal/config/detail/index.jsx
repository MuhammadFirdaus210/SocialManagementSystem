import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Manfaat from './Manfaat';
import DetailKUBE from './KUBE';
import DetailUEP from './UEP';

const DetailRoutes = ({ breadcrumbItems }) => {
  const {tipe, id} = useParams();
  const newBreadcrumbItems = [...breadcrumbItems, { label: 'Input Data', path: '/proposal' }];
 
  if(tipe ===  "uep"){
    return (
      <DetailUEP breadcrumbItems={[...newBreadcrumbItems, {label: 'Usaha Ekonomi Produktif (UEP)', path:''}]} />
    )
  }else if(tipe.toLowerCase() === "kube"){
    return(

      <DetailKUBE breadcrumbItems={[...newBreadcrumbItems, {label: 'Kelompok Usaha Bersama (KUBE)', path:''}]} />
    )
  }else{
    return (
      <Manfaat breadcrumbItems={[...newBreadcrumbItems, {label: 'Manfaat', path:''}]} />
    );
  }
};

export default DetailRoutes;

