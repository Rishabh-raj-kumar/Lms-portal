"use client"
import * as z from "zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormControl,FormDescription,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

const formSchema = z.object({
    title : z.string().min(1,{
        message : "title is required"
    })
})
const createPage = () =>{
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
           resolver : zodResolver(formSchema),
           defaultValues : {
            title : " "
           }
        });

    const {isSubmitting,isValid} = form.formState;
    const onSubmit = async(values : z.infer<typeof formSchema>) =>{
        try{
           const responce = await axios.post('/api/course',values)
        router.push(`/teacher/courses/${responce.data.id}`);
        toast.success("Course Created...");
        }catch{
            toast.error("Something went wrong...")
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
           <div>
            <h1 className=" text-2xl">
                Create Page
            </h1>
            <p className=" text-slate-500">
                What would you like to name your course?
            </p>
            <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)}
                 className=" space-y-8 mt-8">
                   <FormField
                   control={form.control}
                   name="title"
                   render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Course Title
                        </FormLabel>
                        <FormControl>
                            <Input
                            className=" border-2"
                            disabled={isSubmitting}
                            placeholder="'Advance web development..'"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            what will you teach in this course?
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <div className=" flex items-center gap-x-2">
                        <Link href="/">
                        <Button
                        type="button"
                        variant={"ghost"}>
                           cancel
                        </Button>
                        </Link>
                        <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}>
                           continue
                        </Button>
                    </div>
                 </form>
            </Form>
           </div>
        </div>
    )
}

export default createPage;