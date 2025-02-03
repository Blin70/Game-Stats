import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from 'lucide-react';
import CreateUserForm from "../CreateUserForm";


const CreateUser = () => {

    const fields = [
        { name: 'Email', required: true, inputType: 'text', checkbox: true },
        { name: 'Name', required: true, inputType: 'text', checkbox: false },
        { name: 'Password', required: true, inputType: 'password', checkbox: false },
        { name: 'Phone', required: false, inputType: 'number', checkbox: true },
        { name: 'Role', required: false, inputType: 'text', checkbox: false },
    ]

    const renderedFields = fields.map((field, index) => (
        <div key={index} className="my-2">
            <label htmlFor={field.name}>{field.name}{field.required && '*'}</label>
            <div className={`grid grid-cols-[65%,35%] ${field.checkbox && 'gap-10'}`}>
                <Input type={field.inputType} id={field.name} name={field.name} autoComplete="off" {...field.required && { required: true}} className={`flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 ${field.inputType === 'number' && '[appearance:textfield] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden'}`} />
                {field.checkbox && (
                    <div className="flex gap-2 items-center">
                        <Input type="checkbox" id={field.name.toLowerCase() + 'Confirmed'} name={field.name.toLowerCase() + 'Confirmed'} autoComplete="off" className="size-6 accent-black focus-visible:ring-0 focus-visible:ring-offset-0" />
                        <span className="text-xs text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0">Confirm {field.name.toLowerCase()}</span>
                    </div>
                )}
            </div>
        </div>
    ));

    return (
        <Dialog>
            <DialogTrigger>
                    <UserPlus className="text-black mt-1"/>
            </DialogTrigger>
            <DialogContent aria-describedby={null} className="bg-transparent [&>button]:hidden border-0 shadow-none">
                <DialogTitle className="hidden">Create New User</DialogTitle>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>Create User</CardTitle>
                        <CardDescription>Add a new user</CardDescription>
                    </CardHeader>
                    <CreateUserForm renderedFields={renderedFields} />
                </Card>
            </DialogContent>
        </Dialog>
    );
}

export default CreateUser;