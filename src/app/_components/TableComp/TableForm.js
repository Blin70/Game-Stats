import { useState } from "react";
import { NewEntry } from "./TableDataHandler";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

const TableForm = ({setTableData}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        await NewEntry(username, email, phone, setTableData);
        setUsername('');
        setEmail('');
        setPhone('');
    };

    return (
        <form method="POST" onSubmit={handleSubmit} className="flex my-5 gap-1 justify-center"> 
            <Input name="Username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} autoComplete="off" required type="text" className="w-48 h-12 rounded-2xl text-xl p-2" />
            <Input name="Email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="off" required type="text" className="w-48 h-12 rounded-2xl text-xl p-2" />
            <Input name="Phone" placeholder="Phone number" value={phone} onChange={(e)=>setPhone(e.target.value)} autoComplete="off" required type="text" className="w-48 h-12 rounded-2xl text-xl p-2" />
            <Button type="submit" className="rounded-2xl text-xl p-6">Submit</Button>
        </form>
    );
}

export default TableForm;