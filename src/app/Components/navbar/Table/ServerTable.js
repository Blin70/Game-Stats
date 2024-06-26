import Navbar from "../Navbar";
import TableForm from "./TableForm";

const ServerTable = ({tableData, setTableData}) => {
    return (
        <div className="h-screen">
            <Navbar />
            <TableForm setTableData={setTableData}/>
            <table className="bg-[#d5d7d8] w-2/5 mx-auto text-center">
                <thead>
                    <tr className='h-20 text-xl'>
                        <th className="w-1/12">Id</th>
                        <th className="w-3/12">Username</th>
                        <th className="w-3/12">Email</th>
                        <th className="w-3/12">Phone</th>
                        <th className="w-2/12">Joined</th>
                    </tr>
                </thead>
                    <tbody>
                        {tableData}
                   </tbody>
            </table>
        </div>
    );
}

export default ServerTable;