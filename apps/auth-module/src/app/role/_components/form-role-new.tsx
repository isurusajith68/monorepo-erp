import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import { z } from 'zod'
import useMuate from '../_services/mutation'
import { useGetRoles } from '../_services/queries'
import { useEffect } from 'react'
import { FieldApi, FieldMeta, useForm } from '@tanstack/react-form'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { zodValidator, ZodValidator } from '@tanstack/zod-form-adapter'
import { getDirtyValuesTF } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/commonUi/navbar'

const roleDetailSchema = z.object({
  rid: z.number().optional(),
  role: z.string().min(2, { message: 'Role must be at least 2 characters' }),
  description: z.string(),
})

const formSchema = z.object({
  roles: z.array(roleDetailSchema).min(1, { message: 'Role must be at 10' }),
})

type FormType = z.infer<typeof formSchema>

export default function NewFormRole() {
  const Navigate = useNavigate()

  const form = useForm<FormType, ZodValidator>({
    defaultValues: {
      roles: [
        {
          rid: 0,
          role: 'Role',
          description: 'Description',
        },
      ],
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

    onSubmit: ({ value }) => {
      console.log(value)
      const res = getDirtyValuesTF(
        { roles: roles.roles.rows },
        value,
        [{ arrayName: 'roles', pkName: 'rid' }],
        'rid',
      )
      mutate(res)
      //window.location.reload()
    },
  })

  const { mutate, data: datamute } = useMuate()
  const { data: roles } = useGetRoles()

  useEffect(() => {
    if (roles) {
      // form.setFieldValue('role', [
      //   { rid: '1', role: '1,', description: 'ppp' },
      //   { rid: '1', role: '1,', description: 'ppp' },
      // ])

      for (let index = 0; index < roles.roles.rows.length; index++) {
        const role = roles.roles.rows[index]
        form.setFieldValue('roles', roles.roles.rows)
      }

      //   roles.roles.rows.forEach((role, index) => {
      //     form.setFieldValue(`role[${index}].rid`, role.rid)
      //     form.setFieldValue(`role[${index}].role`, role.role)
      //     form.setFieldValue(`role[${index}].description`, role.description)
      //   })
    }
  }, [roles])

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
                children={(field) => (
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
                                autoFocus
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
                                autoFocus
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
                          field.pushValue({ rid: 0, role: '', description: '' })
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
