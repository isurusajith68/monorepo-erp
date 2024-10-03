import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteEmployeeMutation } from './services/mutation'
import { useGetAllEmployee } from './services/queries'

export default function EmployeeListPage() {
  const { toast } = useToast()
  const [employee, setEmployee] = useState([])
  const navigate = useNavigate()
  const deleteEMutation = useDeleteEmployeeMutation()
  const queryClient = useQueryClient()

  const { data, isSuccess } = useGetAllEmployee()

  useEffect(() => {
    // Fetch booking data from the backend
    try {
      if (isSuccess) {
        console.log('id', data)
        const sortedData = data.sort((a: any, b: any) => b.id - a.id)
        setEmployee(sortedData)
      } else {
        console.error('employee not found:', data.msg)
      }
    } catch (error) {
      console.error('Error fetching employee:', error)
    }
  }, [data, isSuccess])

  const handleEdit = (id: number) => {
    navigate(`/employee/${id}`)
  }

  const deleteAction = async (id: number) => {
    if (id) {
      try {
        // Trigger delete mutation
        await deleteEMutation.mutateAsync({ id })

        // Invalidate the query to refetch the data
        queryClient.invalidateQueries() // Replace with the actual query key used in `useGetAllBooking`

        // Show success toast notification
        toast({
          className: 'text-red-600',
          title: 'Employee',
          description: <span>Deleted successfully.</span>,
          duration: 3000,
        })
      } catch (error) {
        // Handle any error that occurs during the delete process
        console.error('Error deleting employee:', error)
        toast({
          className: 'text-red-600',
          title: 'Error',
          description: <span>Failed to delete the employee.</span>,
          duration: 3000,
        })
      }
    }
  }

  return (
    <div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">View Employee</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <Button
          onClick={() => navigate('/employee/add')}
          className="bg-green-600"
        >
          + Add
        </Button>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      <Table className="mt-10 overflow-hidden rounded-xl">
        <TableHeader className="text-center bg-green-300">
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Mobile</TableHead>
            <TableHead className="text-center">Designation</TableHead>
            <TableHead className="text-center">Department</TableHead>
            <TableHead className="text-center">Hire Date</TableHead>
            <TableHead className="text-center">Address</TableHead>
            <TableHead className="text-center">Salary</TableHead>
            <TableHead className="text-center">Status </TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-green-50">
          {employee.map((employees: any) => (
            <TableRow key={employees.id}>
              <TableCell className="text-center">{employees.id}</TableCell>
              <TableCell className="text-center">{employees.emname}</TableCell>

              <TableCell className="text-center">{employees.ememail}</TableCell>
              <TableCell className="text-center">
                {employees.emmobile}
              </TableCell>
              <TableCell className="text-center">
                {employees.emdesignation}
              </TableCell>
              <TableCell className="text-center">
                {employees.emdepartment}
              </TableCell>
              <TableCell className="text-center">
                {' '}
                {employees.emhiredate}
              </TableCell>
              <TableCell className="text-center">
                {employees.emaddress}
              </TableCell>
              <TableCell className="text-center">
                {employees.emsalary}
              </TableCell>
              <TableCell className="text-center">
                {employees.emstatus}
              </TableCell>

              <TableCell className="flex text-center">
                <Button
                  className="ml-5 bg-green-600"
                  onClick={() => handleEdit(employees.id)}
                  type="button"
                >
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="ml-5 bg-green-600 bg-destructive">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this employee?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600"
                        onClick={() => deleteAction(employee.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
