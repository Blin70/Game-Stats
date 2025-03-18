import { Table,TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import CreateUser from "./components/CreateUser";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getRole } from "@/app/utils/server-actions/userActions";
import EditUserButton from "./components/EditUserButton";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

const AdminDashboard = async () => {
    const role = await getRole();
    if(role != "service_role") redirect('/unauthorized')
    
    const supabase = createClient();

    const { data, error } = await supabase.from('profiles').select('*');
    if(error) console.error("Error while fetching users from table", error);

    const renderedUsers = data?.map((user) => (
        <TableRow key={user.id} className="h-10 text-xl">
            <TableCell>{user.id.slice(0, 8)+"....."}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone || '-'}</TableCell>
            <TableCell>{user.joined.slice(0,10)}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell><EditUserButton user={user} /></TableCell>
        </TableRow>
    ));

    return (
        <ScrollArea className="h-full">
            <Table className="w-fit h-fit mx-auto text-center">
                <TableCaption>List of users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/12 text-center">Id</TableHead>
                        <TableHead className="w-3/12 text-center">Name</TableHead>
                        <TableHead className="w-3/12 text-center">Email</TableHead>
                        <TableHead className="w-3/12 text-center">Phone</TableHead>
                        <TableHead className="w-2/12 text-center">Joined</TableHead>
                        <TableHead className="w-2/12 text-center">Role</TableHead>
                        <TableHead className="w-2/12 text-center"><CreateUser /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {renderedUsers}
                </TableBody>
            </Table>
        </ScrollArea>
    )
};

export default AdminDashboard;