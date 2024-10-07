// import getDirtyValues from '../../../../../../libs/util-funcs/src/rhf-helpers'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFieldArray, useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
import { MdOutlineRemoveCircleOutline } from 'react-icons/md'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import Axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import useMuate from '../_services/mutation'
import { useGetRoles } from '../_services/queries'
import { useEffect } from 'react'

export const detailRowSchema = z.object({
  rid: z.any().optional(),
  role: z.string().min(2, {
    message: 'Role must be at least 2 characters.',
  }),
  description: z.any().optional(),
})

const FormSchema = z.object({
  roledetails: z.array(detailRowSchema),
})

export default function FormRole() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roledetails: [
        {
          role: 'admin',
          description: '',
          rid: 'id',
        },
      ],
    },
  })

  const {
    formState: { isDirty, dirtyFields },
    setValue,
    reset,
  } = form

  const { fields, append, remove } = useFieldArray({
    name: 'roledetails',
    control: form.control,
  })

  const { mutate, data: datamute } = useMuate()
  const { data: roles } = useGetRoles()

  // useEffect(() => {
  //   form.reset(roles)
  //   console.log("roles roe",roles.roles.rows)
  // }, [roles])

  useEffect(() => {
    if (roles) {
      const formattedRoles = roles.roles.rows.map((role) => ({
        rid: role.rid,
        role: role.role,
        description: role.description,
      }))

      form.reset({ roledetails: formattedRoles })
    }
  }, [roles])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
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
    console.log('data', data)

    console.log('Dirty Fields:', dirtyFields)
    getDirtyValues(dirtyFields, data, [
      { arrayName: 'roledetails', pkName: 'rid' },
    ])
    reset({}, { keepValues: true })
    // const editedRows = fields.filter((_, index) => {
    //   return dirtyFields.roledetails?.[index]?.role || dirtyFields.roledetails?.[index]?.description!== undefined;
    // })

    // console.log('Edited Rows:', editedRows)
  }

  function getDirtyValues(
    dirtyFields: object | boolean,
    allValues: object | any,
    arrayPkNames: { arrayName: string; pkName: string }[],
    rootPkName: string | null = null,
  ): object {
    // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
    // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
    if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues
    // Here, we have an object
    // return Object.fromEntries(
    //   Object.keys(dirtyFields).map((key) => [
    //     key,
    //     dirtyValues(dirtyFields[key], allValues[key]),
    //   ]),
    // )
    // console.log("key",Array.from(dirtyFields[key]) )
    const dirtyValues = {}
    console.log('allValues1', allValues)
    console.log('dirtyFields1', dirtyFields)
    Object.keys(dirtyFields).map((key) => {
      console.log('key11', key, allValues)
      if (Array.isArray(dirtyFields[key])) {
        // if array we add a prop (named key) to dirtyValues with object having inserts:[row1,row2...],updtaes:[row1,row2...],delets:[pk1,pk2..]
        const arr = Array.from(dirtyFields[key])

        const arrayDetails = arrayPkNames.find((a) => a.arrayName == key)

        if (arrayDetails) {
          const pkName = arrayDetails.pkName
          dirtyValues[key] = { inserts: [], updates: [], deletes: [] }
          arr.forEach((el, index) => {
            if (
              allValues[key][index][pkName] == undefined ||
              allValues[key][index][pkName] == null
            ) {
              console.log('insert f')

              if (el) {
                dirtyValues[key].inserts.push(
                  getDirtyValues(el, allValues[key][index], []),
                )
              }
            } else {
              //update
              if (el) {
                const val = getDirtyValues(
                  el,
                  allValues[key][index],
                  [],
                  pkName,
                )
                if (val) {
                  dirtyValues[key].updates.push(val)
                }
              }
            }
          })
        }
      } else {
        //not array property
        if (dirtyFields[key]) {
          dirtyValues[key] = allValues[key]
        }
      }
    })

    console.log('dirtyValues', dirtyValues)
    if (rootPkName && Object.keys(dirtyValues).length > 0) {
      dirtyValues[rootPkName] = allValues[rootPkName]
    }

    if (Object.keys(dirtyValues).length > 0) {
      return dirtyValues
    } else {
      return
    }
  }
  // const handleAddRow = () => {
  //   // Append an empty row without marking it as dirty
  //   append({ role: '', description: '' })
  // }

  return (
    <div>
      {/* <pre>{JSON.stringify(roles)}</pre> */}
      {/* <p>data mute{JSON.stringify(datamute)}</p> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="border-2 rounded-lg border-green-300 p-4 bg-green-100 ">
            <Table className="">
              <TableHeader className="rounded-lg border-green-600 gap-0">
                <TableRow>
                  {/* <TableHead className="text-center">ID</TableHead> */}
                  <TableHead className="text-center">ID</TableHead>
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
                        name={`roledetails.${index}.rid`}
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600 "
                                placeholder="ID"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    <TableCell className="">
                      <FormField
                        control={form.control}
                        name={`roledetails.${index}.role`}
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600 "
                                placeholder="role"
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
                        name={`roledetails.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600 "
                                placeholder="Description"
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
                        variant={'outline'}
                        className="text-2xl mx-1"
                        onClick={() => remove(index)}
                      >
                        <MdOutlineRemoveCircleOutline className="text-destructive" />
                      </Button>

                      <Button
                        variant={'outline'}
                        className="text-2xl mx-1"
                        type="button"
                        onClick={() =>
                          append({ role: 'admin', description: '' })
                        }
                        //onClick={handleAddRow}
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
      </Form>
    </div>
  )
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
