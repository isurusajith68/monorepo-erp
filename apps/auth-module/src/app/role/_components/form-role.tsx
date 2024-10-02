import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Axios from "axios";

export const detailRowSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.any().optional(),
});

const FormSchema = z.object({
  purchasedetails: z.array(detailRowSchema),
});

export default function FormRole() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      purchasedetails: [
        {
          name: "admin",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "purchasedetails",
    control: form.control,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);

    const addRole=async()=>{

        const response=await Axios.post("http://localhost:10000/addrole",data)
        console.log(response)

    }
    addRole();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="border-2 rounded-lg border-green-300 p-4 bg-green-100 ">
            <Table className="">
              <TableHeader className="rounded-lg border-green-600 gap-0">
                <TableRow>
                  {/* <TableHead className="text-center">ID</TableHead> */}
                  <TableHead className="text-center ">ROLE NAME</TableHead>
                  <TableHead className="text-center">DESCRIPTION</TableHead>
                  <TableHead className="text-center">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    {/* <TableCell className="p-1 text-center font-medium"></TableCell> */}

                    <TableCell className="">
                      <FormField
                        control={form.control}
                        name={`purchasedetails.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600 "
                                placeholder="name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`purchasedetails.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder=""
                                className="rounded border-2 border-green-600"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    <TableCell className="p-1 text-center font-medium">
                      <Button
                        type="button"
                        variant={"outline"}
                        className="text-2xl mx-1"
                        onClick={() => remove(index)}
                      >
                        <MdOutlineRemoveCircleOutline className="text-destructive" />
                      </Button>

                      <Button
                        variant={"outline"}
                        className="text-2xl mx-1"
                        type="button"
                        onClick={() => append({})}
                      >
                        <FaPlus className="text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <Button className="bg-green-600 mt-2" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
