'use client'

import { useState } from "react";
import { SubmitToSupabase } from "./TableDataHandler";
import TableInputs from "./TableInputs";

const TableForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        await SubmitToSupabase(username, email, phone);
        setUsername('');
        setEmail('');
        setPhone('');
    };

     

    return (
        <form method="POST" onSubmit={handleSubmit} className="ml-36 my-5"> 
            <TableInputs name="Username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <TableInputs name="Email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <TableInputs name="Phone" placeholder="Phone number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <button type="submit" className="bg-[#d0d0d0] rounded-2xl text-2xl p-1">Submit</button>
        </form>
    );
}

export default TableForm;