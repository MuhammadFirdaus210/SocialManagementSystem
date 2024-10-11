import DynamicTable from "../../DynamicTable"

const TableADK = () => {

    const data = [
        ["nama", "nim", "kampus", "ipk"],
        {
            "nama":"fajdsdl",
            "nim":21312,
            "kampus" : "usk",
            "ipk" : 3.23
        },
        {
            "nama":"fajdsdl",
            "nim":21312,
            "kampus" : "usk",
            "ipk" : 3.23
        },
        {
            "nama":"fajdsdl",
            "nim":21312,
            "kampus" : "usk",
            "ipk" : 3.23
        },
    ]

    return (
        <div className="flex justify-center items-center w-full flex-col">
            Ini table ADK
            <DynamicTable data={data}/>
        </div>
    )
}

export default TableADK