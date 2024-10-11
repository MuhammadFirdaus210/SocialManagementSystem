import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Manfaat from './Manfaat';
import KUBE from './KUBE';
import UEP from './UEP';

const EditRoutes = ({ breadcrumbItems }) => {
  const newBreadcrumbItems = [...breadcrumbItems, { label: 'Edit Data', path: '/proposal' }];

  const {tipe, id} = useParams();
  const [data, setData] = React.useState({});
  console.log(tipe);



  useEffect(()=>{
    document.title = "Edit Data Proposal"
    const fetchData= async() => {
      const API_URL = [
        `${process.env.REACT_APP_API_URL}/uep/getall-uep`,
        `${process.env.REACT_APP_API_URL}/kube/getall-kube`,
        `${process.env.REACT_APP_API_URL}/manfaat/getall`,
      ]
      try{

        let responseData;
        if(tipe === "uep"){
          const response = await fetch(API_URL[0])
          responseData = await response.json();
          const filteredData = responseData.ueps.filter((item) => item._id === id);
          setData(filteredData[0]);
        }else if (tipe === "kube"){
          const response = await fetch(API_URL[1])
          responseData = await response.json();
          const filteredData = responseData.kubes.filter((item) => item._id === id);
          setData(filteredData[0]);
        }else{
          const response = await fetch(API_URL[2])
          responseData = await response.json();
          const filteredData = responseData.manfaatList.filter((item) => item._id === id);
          setData(filteredData[0]);
        }
        
      }catch(error){
        console.log(error)
      }

    }
    fetchData();
  },[tipe, id])

  console.log("tipe", tipe)

  if(tipe ===  "uep"){
    return (
      <UEP breadcrumbItems={[...newBreadcrumbItems, {label: 'Usaha Ekonomi Produktif (UEP)', path:''}]} data={data} />
    )
  }else if(tipe.toLowerCase() === "kube"){
    return(

      <KUBE breadcrumbItems={[...newBreadcrumbItems, {label: 'Kelompok Usaha Bersama (KUBE)', path:''}]} data={data} />
    )
  }else{
    return (
      <Manfaat breadcrumbItems={[...newBreadcrumbItems, {label: 'Manfaat', path:''}]} data={data} />
    );
  }
  
};

export default EditRoutes;