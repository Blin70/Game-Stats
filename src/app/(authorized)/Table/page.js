'use client';

import { useEffect, useState } from 'react';
import { FetchTableData } from "@/components/Table/TableDataHandler";
import { Table,TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableForm from '@/components/Table/TableForm';
import { ScrollArea } from "@/components/ui/scroll-area"
  

const ClientTable = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchTableData();
            setTableData(data);
        };

        fetchData();
    }, []);

    return (
        <>
            <TableForm setTableData={setTableData}/>
            <ScrollArea className="h-[620px]">
                <Table className="w-fit h-fit mx-auto text-center">
                    <TableCaption>List of users</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/12 text-center">Id</TableHead>
                            <TableHead className="w-3/12 text-center">Username</TableHead>
                            <TableHead className="w-3/12 text-center">Email</TableHead>
                            <TableHead className="w-3/12 text-center">Phone</TableHead>
                            <TableHead className="w-2/12 text-center">Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData}
                    </TableBody>
                </Table>
            </ScrollArea>
        </>
    )
};

export default ClientTable;