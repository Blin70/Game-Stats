import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Loading() {
    const renderedUsers = Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index} className="h-10">
            <TableCell><Skeleton className="w-36 h-10 mx-auto" /></TableCell>
            <TableCell><Skeleton className="w-36 h-10 mx-auto" /></TableCell>
            <TableCell><Skeleton className="w-72 h-10 mx-auto" /></TableCell>
            <TableCell><Skeleton className="w-52 h-10 mx-auto" /></TableCell>
            <TableCell><Skeleton className="w-28 h-10 mx-auto" /></TableCell>
            <TableCell><Skeleton className="w-32 h-10 mx-auto" /></TableCell>
            <TableCell><Skeleton className="size-10" /></TableCell>
        </TableRow>
    ));

    return (
        <Table className="w-fit h-fit mx-auto">
            <TableCaption>Loading users...</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/12"><Skeleton className="w-14 h-6 mx-auto" /></TableHead>
                    <TableHead className="w-3/12"><Skeleton className="w-14 h-6 mx-auto" /></TableHead>
                    <TableHead className="w-3/12"><Skeleton className="w-14 h-6 mx-auto" /></TableHead>
                    <TableHead className="w-3/12"><Skeleton className="w-14 h-6 mx-auto" /></TableHead>
                    <TableHead className="w-2/12"><Skeleton className="w-14 h-6 mx-auto" /></TableHead>
                    <TableHead className="w-2/12"><Skeleton className="w-14 h-6 mx-auto" /></TableHead>
                    <TableHead className="w-2/12"><Skeleton className="size-10" /></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {renderedUsers}
            </TableBody>
        </Table>
    )
}