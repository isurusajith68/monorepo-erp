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
import { useFieldArray } from 'react-hook-form'
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
import { useForm } from '@tanstack/react-form'
import { Label } from '@/components/ui/label'

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

export default function TanstackForm() {
  const form = useForm({
    defaultValues: {
      username: '',
      //   password: '',
      //   confirmPassword: '',
      //   interests: [] as string[],
      //   skills: [] as { language: string; rating: number }[],
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  const { mutate, data: datamute } = useMuate()
  const { data: roles } = useGetRoles()

  //   useEffect(() => {
  //     if (roles) {
  //       const formattedRoles = roles.roles.rows.map((role) => ({
  //         rid: role.rid,
  //         role: role.role,
  //         description: role.description,
  //       }))

  //       form.reset({ roledetails: formattedRoles })
  //     }
  //   }, [roles])

  return (
    <div>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="username"
          children={(field) => (
            <>
              <Label htmlFor="username">First Name</Label>
              <Input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <Button onClick={form.handleSubmit}>Submit</Button>
      </form>
    </div>
  )
}

// import { useForm } from '@tanstack/react-form'
// import { useState } from 'react'
// //import { Button } from './ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Button } from '@/components/ui/button'

// export const TanstackForm = () => {
//   const [count, setCount] = useState(0)
//   const form = useForm({
//     defaultValues: {
//       firstName: '',
//     },
//   })

//   // OPTION 1: Reactivity with form.useStore
//   // const firstName = form.useStore((state) => state.values.firstName);

//   console.log('Form Rerender')

//   return (
//     <div>
//       <Card className="w-[400px]">
//         <CardHeader>
//           <CardTitle>Reactive values</CardTitle>
//           <CardDescription>
//             {/* NOTE: This is not reactive, look for options 1 and 2 */}
//             Hello, my name is:{' '}
//             <span className="font-bold">{form.state.values.firstName}</span>
//             {/*
//               // OPTION 2: Reactivity with form.Subscribe
//             <form.Subscribe selector={(state) => state.values.firstName}>
//                 {(firstName) => {
//                   console.log("form.Subscribe Rerender");
//                   return (
//                     <>
//                       Hello, my name is:{" "}
//                       <span className="font-bold">{firstName}</span>
//                     </>
//                   );
//                 }}
//               </form.Subscribe> */}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form
//             className="flex flex-col gap-4"
//             onSubmit={(e) => {
//               e.preventDefault()
//               e.stopPropagation()
//               form.handleSubmit()
//             }}
//           >
//             <form.Field
//               name="firstName"
//               children={(field) => (
//                 <>
//                   <Label htmlFor="username">First Name</Label>
//                   <Input
//                     type="text"
//                     value={field.state.value}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                   />
//                 </>
//               )}
//             />
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button onClick={form.handleSubmit}>Submit</Button>
//         </CardFooter>
//       </Card>
//       <div className="mt-4 flex gap-2 items-center">
//         Count: {count}
//         <Button
//           size={'sm'}
//           variant={'secondary'}
//           onClick={() => setCount((c) => c + 1)}
//         >
//           +1
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default TanstackForm;
