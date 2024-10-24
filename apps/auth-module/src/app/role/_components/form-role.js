"use strict";
// import getDirtyValues from '../../../../../../libs/util-funcs/src/rhf-helpers'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
const mutation_1 = __importDefault(require("../_services/mutation"));
const queries_1 = require("../_services/queries");
const react_1 = require("react");
exports.detailRowSchema = zod_1.z.object({
    rid: zod_1.z.any().optional(),
    role: zod_1.z.string().min(2, {
        message: 'Role must be at least 2 characters.',
    }),
    description: zod_1.z.any().optional(),
});
const FormSchema = zod_1.z.object({
    roledetails: zod_1.z.array(exports.detailRowSchema),
});
function FormRole() {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(FormSchema),
        defaultValues: {
            roledetails: [
                {
                    role: 'admin',
                    description: '',
                    rid: 'id',
                },
            ],
        },
    });
    const { formState: { isDirty, dirtyFields }, setValue, reset, watch, } = form;
    const { fields, append, remove } = (0, react_hook_form_1.useFieldArray)({
        name: 'roledetails',
        control: form.control,
    });
    const watchFields = watch('roledetails');
    (0, react_1.useEffect)(() => {
        // const dirtyFields = { ...customDirtyFields }
        watchFields.forEach((field, index) => {
            // Example custom logic: If the name has changed from the default, mark it as dirty
            // if (field.name !== fields[index]?.name) {
            //   dirtyFields[index] = true
            // } else {
            //   delete dirtyFields[index] // If it's not dirty, remove it from the dirtyFields object
            // }
            console.log('fieldsss', field);
        });
        //setCustomDirtyFields(dirtyFields)
    }, [watchFields]);
    const { mutate, data: datamute } = (0, mutation_1.default)();
    const { data: roles } = (0, queries_1.useGetRoles)();
    (0, react_1.useEffect)(() => {
        if (roles) {
            const formattedRoles = roles.roles.rows.map((role) => ({
                rid: role.rid,
                role: role.role,
                description: role.description,
            }));
            form.reset({ roledetails: formattedRoles });
        }
    }, [roles]);
    async function onSubmit(data) {
        //  console.log('dirtyFields',  dirtyFields.roledetails.entries())
        // console.log('dirtyFields', dirtyFields.roledetails)
        //reset({}, { keepValues: true })
        //mutate(data)
        //getDirtyValuesm()
        // const iter = dirtyFields.roledetails.entries()
        // let result = iter.next()
        // while (!result.done) {
        //   console.log(result.value) // 1 3 5 7 9
        //   result = iter.next()
        // }
        //const r = dirtyValues(dirtyFields,data)
        console.log('data', data);
        console.log('Dirty Fields:', dirtyFields);
        const out = getDirtyValues(dirtyFields, data, [
            { arrayName: 'roledetails', pkName: 'rid' },
        ]);
        //console.log('out', out?.roledetails?.inserts)
        mutate(out);
        reset({}, { keepValues: true });
        // const editedRows = fields.filter((_, index) => {
        //   return dirtyFields.roledetails?.[index]?.role || dirtyFields.roledetails?.[index]?.description!== undefined;
        // })
        // console.log('Edited Rows:', editedRows)
    }
    function getDirtyValues(dirtyFields, allValues, arrayPkNames, rootPkName = null) {
        // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
        // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
        if (dirtyFields === true || Array.isArray(dirtyFields))
            return allValues;
        // Here, we have an object
        // return Object.fromEntries(
        //   Object.keys(dirtyFields).map((key) => [
        //     key,
        //     dirtyValues(dirtyFields[key], allValues[key]),
        //   ]),
        // )
        // console.log("key",Array.from(dirtyFields[key]) )
        const dirtyValues = {};
        console.log('allValues1', allValues);
        console.log('dirtyFields1', dirtyFields);
        Object.keys(dirtyFields).map((key) => {
            // console.log('key11', key, allValues)
            if (Array.isArray(dirtyFields[key])) {
                // if array we add a prop (named key) to dirtyValues with object having inserts:[row1,row2...],updtaes:[row1,row2...],delets:[pk1,pk2..]
                const arr = Array.from(dirtyFields[key]);
                const arrayDetails = arrayPkNames.find((a) => a.arrayName == key);
                if (arrayDetails) {
                    const pkName = arrayDetails.pkName;
                    dirtyValues[key] = { inserts: [], updates: [], deletes: [] };
                    arr.forEach((el, index) => {
                        if (allValues[key][index][pkName] == undefined ||
                            allValues[key][index][pkName] == null) {
                            console.log('insert f');
                            if (el) {
                                dirtyValues[key].inserts.push(getDirtyValues(el, allValues[key][index], []));
                            }
                        }
                        else {
                            //update
                            if (el) {
                                const val = getDirtyValues(el, allValues[key][index], [], pkName);
                                if (val) {
                                    dirtyValues[key].updates.push(val);
                                }
                            }
                        }
                    });
                }
            }
            else {
                //not array property
                if (dirtyFields[key]) {
                    dirtyValues[key] = allValues[key];
                }
            }
        });
        if (rootPkName && Object.keys(dirtyValues).length > 0) {
            dirtyValues[rootPkName] = allValues[rootPkName];
        }
        console.log('dirtyValues-last', dirtyValues);
        if (Object.keys(dirtyValues).length > 0) {
            return dirtyValues;
        }
        else {
            return;
        }
    }
    return (<div>
      {/* <pre>{JSON.stringify(roles)}</pre> */}
      {/* <p>data mute{JSON.stringify(datamute)}</p> */}
      <form_1.Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="border-2 rounded-lg border-green-300 p-4 bg-green-100 ">
            <table_1.Table className="">
              <table_1.TableHeader className="rounded-lg border-green-600 gap-0">
                <table_1.TableRow>
                  {/* <TableHead className="text-center">ID</TableHead> */}
                  <table_1.TableHead className="text-center">ID</table_1.TableHead>
                  <table_1.TableHead className="text-center ">ROLE NAME</table_1.TableHead>
                  <table_1.TableHead className="text-center">DESCRIPTION</table_1.TableHead>
                  <table_1.TableHead className="text-center">ACTIONS</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>

              <table_1.TableBody>
                {fields.map((field, index) => (<table_1.TableRow key={field.id}>
                    {/* <TableCell className="p-1 text-center font-medium"></TableCell> */}

                    <table_1.TableCell className="">
                      <form_1.FormField control={form.control} name={`roledetails.${index}.rid`} render={({ field }) => (<form_1.FormItem className="">
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600 " placeholder="ID" {...field} disabled/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </table_1.TableCell>

                    <table_1.TableCell className="">
                      <form_1.FormField control={form.control} name={`roledetails.${index}.role`} render={({ field }) => (<form_1.FormItem className="">
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600 " placeholder="role" {...field}/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </table_1.TableCell>

                    <table_1.TableCell>
                      <form_1.FormField control={form.control} name={`roledetails.${index}.description`} render={({ field }) => (<form_1.FormItem>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600 " placeholder="Description" {...field}/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </table_1.TableCell>

                    <table_1.TableCell className="p-1 text-center font-medium">
                      <button_1.Button type="button" variant={'outline'} className="text-2xl mx-1" onClick={() => remove(index)}>
                        <md_1.MdOutlineRemoveCircleOutline className="text-destructive"/>
                      </button_1.Button>

                      <button_1.Button variant={'outline'} className="text-2xl mx-1" type="button" onClick={() => append({ role: 'admin', description: '' })}>
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

            {/* <Button
          className="bg-green-600 mt-2"
          type="button"
          onClick={() => {
            mutate({ a: 'kala' })
          }}
        >
          mutate
        </Button> */}
          </div>
        </form>
      </form_1.Form>
    </div>);
}
/////////////////////////////////////
////1.Axios exaple////////////////
// const addRole=async()=>{
//     const response=await Axios.post("http://localhost:10000/addrole",data)
//     console.log(response)
// }
// addRole();
/////////////////////////////////////
////1.useQuery exmple////////////////
// const { data:dataa, isLoading, isError, error } = useQuery({
// queryKey: ["booking"],
// queryFn: async () => {
//   let data1;
//   data1 = await Axios.get('http://localhost:10000/getData');
//   console.log("response",data1)
//   return data1.data;
// }})
//////////////////////////////////////////
///////2.useQuery exmple2/////////////////
// const fetchData = async () => {
//   const response = await Axios.get('http://localhost:10000/getData')
//   return response.data //this data asign to the useQuery data variable
// }
// const { data, isLoading, isError, error } = useQuery({
//   queryKey: ['getData'],
//   queryFn: fetchData,
// })
// if (isLoading) {
//   return <div>Loading...</div>
// }
// if (isError) {
//   return <div>Error: {error.message}</div>
// }
//  <pre>{JSON.stringify(data, null, 2)}</pre>
//////////////////////////////////////////
/////////////3.mutate/////////////////////
// const { mutate, data: datamute } = useMutation({
//   mutationFn: async (newRole: any) => {
//     const response = await Axios.post('http://localhost:10000/addrole', newRole)
//     console.log(response)
//     return response.data
//   },
// })
// <p> data mute{JSON.stringify(datamute)} </p>
//<Button
//className="bg-green-600 mt-2"
//type="button"
//onClick={() => {
//  mutate({ a: 'kala' })
//}}
//>
//mutate
//</Button>
