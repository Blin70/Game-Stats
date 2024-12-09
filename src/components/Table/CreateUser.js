import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminCreateUser } from "@/app/utils/server-actions/adminActions";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from 'lucide-react';


const CreateUser = () => {

    return (
        <Dialog>
            <DialogTrigger>
                    <UserPlus className="text-black mt-1"/>
            </DialogTrigger>
            <DialogContent aria-describedby={null} className="bg-transparent [&>button]:hidden border-0 shadow-none">
                <DialogTitle className="hidden">Create New User</DialogTitle>
                <Card>
                    <form action={AdminCreateUser}>
                        <CardHeader className="text-center">
                            <CardTitle>Create User</CardTitle>
                            <CardDescription>Add a new user</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="my-2">
                                <label htmlFor="Email">Email*</label>
                                <div className="grid grid-cols-[65%,35%] gap-10">
                                    <Input type='text' id="Email" name="Email" autoComplete="off" required className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    <div className="flex gap-2 items-center">
                                        <Input type="checkbox" id="emailConfirmed" name="emailConfirmed" autoComplete="off" className="size-6 accent-black focus-visible:ring-0 focus-visible:ring-offset-0" />
                                        <span className="text-xs text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0">Confirm email</span>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2">
                                <label htmlFor="Name">Name*</label>
                                <div className="grid grid-cols-[65%,35%]">
                                    <Input type='text' id="Name" name="Name" autoComplete="off" required className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                </div>
                            </div>
                            <div className="my-2">
                                <label htmlFor="Password">Password*</label>
                                <div className="grid grid-cols-[65%,35%]">
                                    <Input type='password' id="Password" name="Password" autoComplete="off" required className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                </div>
                            </div>
                            <div className="my-2">
                                <label htmlFor="Phone">Phone</label>
                                <div className="grid grid-cols-[65%,35%] gap-10">
                                    <Input type='number' id="Phone" name="Phone" autoComplete="off" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden" />
                                    <div className="flex gap-2 items-center">
                                        <Input type="checkbox" id="phoneConfirmed" name="phoneConfirmed" autoComplete="off" className="size-6 accent-black focus-visible:ring-0 focus-visible:ring-offset-0" />
                                        <span className="text-xs text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0">Confirm phone</span>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2">
                                <label htmlFor="Role">Role</label>
                                <div className="grid grid-cols-[65%,35%]">
                                    <Input type='text' id="Role" name="Role" autoComplete="off" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type='submit'>Create user</Button>
                        </CardFooter>    
                    </form>
                </Card>
            </DialogContent>
        </Dialog>
    );
}

export default CreateUser;