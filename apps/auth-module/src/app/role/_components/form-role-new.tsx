import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import { z } from 'zod'
import useMuate from '../_services/mutation'
import { useGetRoles } from '../_services/queries'
import { useEffect, useState } from 'react'
import { FieldApi, FieldMeta, useForm } from '@tanstack/react-form'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { zodValidator, ZodValidator } from '@tanstack/zod-form-adapter'
import { getDirtyValuesTF } from '@/lib/utils'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '@/components/commonUi/navbar'
import { toast } from '@/hooks/use-toast'
import { useHotelIdStore } from '@/app/stores/modules-store'

const roleDetailSchema = z.object({
  hotelid: z.number().optional(),
  rid: z.number().optional(),
  role: z.string().min(2, { message: 'Role must be at least 2 characters' }),
  description: z.string(),
})

const formSchema = z.object({
  roles: z.array(roleDetailSchema).min(1, { message: 'Role must be at 10' }),
})

type FormType = z.infer<typeof formSchema>

export default function NewFormRole() {
  const { hotelid } = useHotelIdStore()

  const {
    mutate,
    data: datamute,
    isSuccess,
    isPending,
    isError,
    isPaused,
  } = useMuate()
  const { data: roles } = useGetRoles(hotelid)

  const form = useForm<FormType, ZodValidator>({
    defaultValues: {
      roles: [{ hotelid: 0, rid: 0, role: 'Role', description: 'Description' }],
    },
    validators: {
      //   onChange: formSchema,
      onSubmit: formSchema,
    },
    validatorAdapter: zodValidator(),
    //   as { rid: string; role: string; description: string }[],
    //role: [] as string[],
    //   password: '',
    //   confirmPassword: '',
    //   role: [] as string[],
    //   skills: [] as { language: string; rating: number }[],

    onSubmit: async ({ value }) => {
      // form.setFieldValue('hotelid.roles', 2)
      console.log('val', value)

      const res = getDirtyValuesTF(
        { roles: roles.roles },
        value,
        [{ arrayName: 'roles', pkName: 'rid' }],
        'rid',
      )

      await mutate(res, {
        onSuccess: (data) => {
          toast({
            title: 'Update successful',
            description: 'User role list updated.',
            className: 'bg-green-500 text-white',
          })
        },
        onError: (error) => {
          console.error('Mutation failed:', error)
          toast({
            variant: 'destructive',
            title: 'Update Error',
            description: error.message,
          })
        },
      })

      //window.location.reload()
    },
  })
  // const { id } = useParams()
  //const id =2
  console.log('Role ID:', Number(hotelid))
  // form.setValue('name', 'value', { shouldValidate: true })

  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    if (roles) {
      console.log('roles', roles)

      const filteredRoles = roles.roles.filter((role) =>
        role.role.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      form.setFieldValue('roles', filteredRoles)
    }
  }, [roles, searchTerm])

  // useEffect(() => {
  //   if (roles) {
  //     // form.setFieldValue('role', [
  //     //   { rid: '1', role: '1,', description: 'ppp' },
  //     //   { rid: '1', role: '1,', description: 'ppp' },
  //     // ])

  //     for (let index = 0; index < roles.roles.length; index++) {
  //       const role = roles.roles[index]
  //       console.log('roles.roles', roles.roles)

  //       form.setFieldValue('roles', roles.roles)
  //     }

  //     //   roles.roles.forEach((role, index) => {
  //     //     form.setFieldValue(`role[${index}].rid`, role.rid)
  //     //     form.setFieldValue(`role[${index}].role`, role.role)
  //     //     form.setFieldValue(`role[${index}].description`, role.description)
  //     //   })
  //   }
  // }, [roles])

  return (
    <div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        {/* Tab Buttons */}
        <Navbar />

        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold ml-10 mt-6 w-[150px]">
            User Role List{' '}
          </p>

          <div className="flex justify-end w-full mr-10 mt-6">
            <div className="relative">
              <FaUserCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Search by Role Name"
                className="border rounded-full pl-10 pr-4 py-2 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            </div>
          </div>
        </div>
        <div className="m-10 ">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              //form.handleSubmit()
            }}
          >
            <div>
              <form.Field
                name="roles"
                mode="array"
                children={(field: any) => (
                  <>
                    <div className="flex gap-1 mb-6 font-bold text-center mt-6 rounded-t-md bg-blue-400 py-2">
                      <div className="flex-1 items-center text-center lg:ml-[10%]">
                        <Label>ID</Label>
                      </div>
                      <div className="flex-1 items-center text-center lg:ml-[15%]">
                        <Label>ROLE NAME</Label>
                      </div>
                      <div className="flex-1 items-center text-center lg:ml-[18%]">
                        <Label>DESCRIPTION</Label>
                      </div>
                      <div className="flex-1 items-center text-center lg:ml-[5%]">
                        <Label>ACTIONS</Label>
                      </div>
                    </div>
                    {field.state.value.map((_, index) => (
                      <div key={index} className="flex gap-2 mb-6">
                        <form.Field
                          name={`roles[${index}].rid`}
                          children={(subField) => (
                            <div className="flex-row w-[33%]">
                              <Input
                                type="text"
                                readOnly
                                value={subField.state.value}
                                // autoFocus
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                              />
                            </div>
                          )}
                        />

                        <form.Field
                          name={`roles[${index}].role`}
                          children={(subField) => (
                            <div className="flex-row w-[33%]">
                              <Input
                                type="text"
                                value={subField.state.value}
                                // autoFocus
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                              />
                              <FieldInfo field={subField} />
                            </div>
                          )}
                        />
                        <form.Field
                          name={`roles[${index}].description`}
                          children={(subField) => (
                            <div className="flex-row w-[33%]">
                              <Input
                                type="text"
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                              />
                              <FieldInfo field={subField} />
                            </div>
                          )}
                        />

                        <Button
                          variant={'destructive'}
                          onClick={() => field.removeValue(index)}
                        >
                          <X />
                        </Button>

                        <Button
                          className="bg-green-600  "
                          type="button"
                          onClick={() =>
                            field.pushValue({
                              hotelid: Number(hotelid),
                              rid: 0,
                              role: '',
                              description: '',
                            })
                          }
                        >
                          <FaPlus />
                        </Button>
                      </div>
                    ))}
                    <FieldInfo field={field} />
                    <div className="flex">
                      <Button
                        type="button"
                        variant={'outline'}
                        onClick={() =>
                          field.pushValue({
                            hotelid: Number(hotelid),
                            rid: 0,
                            role: '',
                            description: '',
                          })
                        }
                      >
                        Add
                      </Button>

                      <div className="flex justify-center mx-4">
                        <Button
                          className="bg-red-600 "
                          type="submit"
                          onClick={() => form.reset()}
                        >
                          Reset
                        </Button>
                      </div>

                      <div className="flex justify-center mx-4">
                        <Button
                          className="bg-green-600  "
                          type="submit"
                          onClick={form.handleSubmit}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

// function FieldInfo({ fieldMeta }: { fieldMeta: FieldMeta | undefined }) {
//   if (!fieldMeta) return null

//   return (
//     <>
//       {fieldMeta.isTouched && fieldMeta.errors.length ? (
//         <p className="text-destructive text-sm mt-1">
//           {fieldMeta.errors.join(',')}
//         </p>
//       ) : null}
//       {fieldMeta.isValidating ? 'Validating...' : null}
//     </>
//   )
// }
