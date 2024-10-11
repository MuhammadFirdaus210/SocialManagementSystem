import { useEffect, useState } from "react";
import DynamicTable from "../../DynamicTable";

const TableTAGANA = () =>{

    const [data, setData] = useState(null)

    useEffect(()=>{
        const fetchData = async() => {
            const response = await fetch('http://localhost:3001/api/data/ODKB')
            const responseData = await response.json()
            setData(responseData)
        }

        fetchData()
    },[])

   

    return(
        <div className="flex justify-center items-center w-full flex-col">
            INI TABLE AY,Ap,AYP
        <DynamicTable data={data} />
        </div>
    )
}

export default TableTAGANA;