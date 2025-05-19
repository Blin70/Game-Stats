"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@/components/ui/dialog";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";


const EditUserForm = ({ formSchema, formFields, defaultValues, onSubmit }) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    const renderedFields = (fields, form, hasCheckbox) => fields.map((fieldConfig, index) => (
        <div key={index} className={`${hasCheckbox ? 'grid grid-cols-[65%,35%] gap-2' : ''}`}>
            <FormField
              control={form.control}
              name={fieldConfig.name}
              render={({field}) => (
                <FormItem className="space-y-0 my-1">
                    <FormLabel className="capitalize">{field.name}</FormLabel>
                    <FormControl>
                        <Input name={field.name} type={fieldConfig.type || 'text'} placeholder={fieldConfig?.placeholder} {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
            {fieldConfig.checkbox && (
                <FormField
                  control={form.control}
                  name={fieldConfig.name + 'Confirmed'}
                  render={({field}) => (
                    <FormItem className="flex mt-8 justify-center space-x-2">
                        <FormControl>
                            <Input type="checkbox" checked={field.value} name={field.name} {...field} className="size-7 accent-black outline-none"/>
                        </FormControl>
                        <FormLabel className="text-xs !mt-1.5 text-muted-foreground">Confirm {fieldConfig.name}</FormLabel>
                    </FormItem>
                  )}
                />
            )}
        </div>
    ))

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                {renderedFields(formFields, form, formFields[0]?.checkbox)}
                <CardFooter className="space-x-2 p-0 pt-6 !m-0">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </CardFooter>
            </form>
        </Form>
    )
}

export default EditUserForm;