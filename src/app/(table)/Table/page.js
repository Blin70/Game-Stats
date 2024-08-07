'use client';

import { useEffect, useState } from 'react';
import { FetchTableData } from "@/app/_components/TableComp/TableDataHandler";
import ServerTable from '@/app/_components/TableComp/ServerTable';

const ClientTable = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchTableData();
            setTableData(data);
        };

        fetchData();
    }, []);

    return <ServerTable tableData={tableData} setTableData={setTableData} />
};

export default ClientTable;