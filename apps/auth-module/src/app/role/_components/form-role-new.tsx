import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FaPlus } from 'react-icons/fa'
import { z } from 'zod'
import useMuate from '../_services/mutation'
import { useGetRoles } from '../_services/queries'
import { useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { describe } from 'node:test'

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

export default function NewFormRole() {
  const form = useForm({
    defaultValues: {
      role: [
        {
          rid: 'ID',
          role: 'Role',
          description: 'Description',
        },
      ] as { rid: string; role: string; description: string }[],
      //role: [] as string[],
      //   password: '',
      //   confirmPassword: '',
      //   role: [] as string[],
      //   skills: [] as { language: string; rating: number }[],
    },
    onSubmit: ({ value }) => {
      console.log(value)
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

        form.setFieldValue('role', roles.roles.rows)

        // form.setFieldValue(`role[${index}].role`, index, 'role.role')
        // form.setFieldValue(`role[${index}].rid`, role.rid)
        // form.setFieldValue(`role[${index}].role`, role.role)
        // form.setFieldValue(`role[${index}].description`, role.description)
      }

      //   roles.roles.rows.forEach((role, index) => {
      //     form.setFieldValue(`role[${index}].rid`, role.rid)
      //     form.setFieldValue(`role[${index}].role`, role.role)
      //     form.setFieldValue(`role[${index}].description`, role.description)
      //   })
    }
  }, [roles])

  return (
    <div>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          //   form.handleSubmit()
        }}
      >
        <div>
          <form.Field
            name="role"
            mode="array"
            children={(field) => (
              <>
                <div className="flex gap-1 mb-6 font-bold text-center mt-6">
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
                      name={`role[${index}].rid`}
                      children={(subField) => (
                        <>
                          <Input
                            type="text"
                            value={subField.state.value}
                            autoFocus
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                          />
                        </>
                      )}
                    />

                    <form.Field
                      name={`role[${index}].role`}
                      children={(subField) => (
                        <Input
                          type="text"
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                        />
                      )}
                    />
                    <form.Field
                      name={`role[${index}].description`}
                      children={(subField) => (
                        <Input
                          type="text"
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                        />
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
                        field.pushValue({ rid: '', role: '', description: '' })
                      }
                    >
                      <FaPlus />
                    </Button>
                  </div>
                ))}
                <div className="flex">
                  <Button
                    type="button"
                    variant={'outline'}
                    onClick={() => field.pushValue('')}
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
  )
}
