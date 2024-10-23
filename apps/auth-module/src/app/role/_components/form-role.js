"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailRowSchema = void 0;
exports.default = FormRole;
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const table_1 = require("@/components/ui/table");
const react_hook_form_1 = require("react-hook-form");
const fa_1 = require("react-icons/fa");
const md_1 = require("react-icons/md");
const zod_1 = require("zod");
const zod_2 = require("@hookform/resolvers/zod");
const textarea_1 = require("@/components/ui/textarea");
const axios_1 = require("axios");
const react_query_1 = require("@tanstack/react-query");
exports.detailRowSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, {
        message: 'name must be at least 2 characters.',
    }),
    description: zod_1.z.any().optional(),
});
const FormSchema = zod_1.z.object({
    purchasedetails: zod_1.z.array(exports.detailRowSchema),
});
function FormRole() {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(FormSchema),
        defaultValues: {
            purchasedetails: [
                {
                    name: 'admin',
                },
            ],
        },
    });
    const { fields, append, remove } = (0, react_hook_form_1.useFieldArray)({
        name: 'purchasedetails',
        control: form.control,
    });
    // const { data:dataa, isLoading, isError, error } = useQuery({
    //   queryKey: ["booking"],
    //   queryFn: async () => {
    //     let data1;
    //     data1 = await Axios.get('http://localhost:10000/getData');
    //     console.log("response",data1)
    //     return data1.data;
    //   }})
    // const fetchData = async () => {
    //   const response = await Axios.get('http://localhost:10000/getData');
    //   return response.data;
    // };
    // const { data, isLoading, isError, error } = useQuery({
    //   queryKey: ['getData'],
    //   queryFn: fetchData,
    // });
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
    // if (isError) {
    //   return <div>Error: {error.message}</div>;
    // }
    async function onSubmit(data) {
        console.log('data', data);
        // const addRole=async()=>{
        //     const response=await Axios.post("http://localhost:10000/addrole",data)
        //     console.log(response)
        // }
        // addRole();
        const { data: dataa, isLoading, isError, error, } = (0, react_query_1.useQuery)({
            queryKey: ['booking'],
            queryFn: async () => {
                let data1;
                data1 = await axios_1.default.get('http://localhost:10000/getData');
                console.log('response', data1);
                return data1.data;
            },
        });
    }
    return (<div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <form_1.Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="border-2 rounded-lg border-green-300 p-4 bg-green-100 ">
            <table_1.Table className="">
              <table_1.TableHeader className="rounded-lg border-green-600 gap-0">
                <table_1.TableRow>
                  {/* <TableHead className="text-center">ID</TableHead> */}
                  <table_1.TableHead className="text-center ">ROLE NAME</table_1.TableHead>
                  <table_1.TableHead className="text-center">DESCRIPTION</table_1.TableHead>
                  <table_1.TableHead className="text-center">ACTIONS</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>

              <table_1.TableBody>
                {fields.map((field, index) => (<table_1.TableRow key={field.id}>
                    {/* <TableCell className="p-1 text-center font-medium"></TableCell> */}

                    <table_1.TableCell className="">
                      <form_1.FormField control={form.control} name={`purchasedetails.${index}.name`} render={({ field }) => (<form_1.FormItem className="">
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600 " placeholder="name" {...field}/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </table_1.TableCell>

                    <table_1.TableCell>
                      <form_1.FormField control={form.control} name={`purchasedetails.${index}.description`} render={({ field }) => (<form_1.FormItem>
                            <form_1.FormControl>
                              <textarea_1.Textarea placeholder="" className="rounded border-2 border-green-600" {...field}/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </table_1.TableCell>

                    <table_1.TableCell className="p-1 text-center font-medium">
                      <button_1.Button type="button" variant={'outline'} className="text-2xl mx-1" onClick={() => remove(index)}>
                        <md_1.MdOutlineRemoveCircleOutline className="text-destructive"/>
                      </button_1.Button>

                      <button_1.Button variant={'outline'} className="text-2xl mx-1" type="button" onClick={() => append({})}>
                        <fa_1.FaPlus className="text-destructive"/>
                      </button_1.Button>
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>
          </div>
          <div className="flex justify-end">
            <button_1.Button className="bg-green-600 mt-2" type="submit">
              Save
            </button_1.Button>
          </div>
        </form>
      </form_1.Form>
    </div>);
}
// const { data, isLoading, isError, error } = useQuery({
//   queryKey: ["booking", id],
//   queryFn: async () => {
//     let data1;
//     data1 = await Axios.get('http://localhost:10000/getData');
//     return data1.data.data;
// const getData = async () => {
//   const response = await Axios.get('http://localhost:10000/getData', {
//     withCredentials: true, // This ensures cookies are sent with the request
//   })
//   console.log('first')
//   setData(response.data)
// }
// useEffect(() => {
//   getData()
// }, [])
