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

export default function EmployeeListPage() {
  const [Employee, setEmployee] = useState([])
  const navigate = useNavigate()

  // Fetch booking data from the backend
  const fetchEmployee = async () => {
    try {
      // Make API request to get booking data by ID
      const response = await Axios.get(`http://localhost:4000/getAllemployees`)
      if (response.data.success) {
        // Reset the form with booking data
        console.log('id', response.data.data)
        const sortedData = response.data.data.sort(
          (a: any, b: any) => b.id - a.id,
        )
        setEmployee(sortedData)
        // form.reset(response.data.data);
      } else {
        console.error('employee not found:', response.data.msg)
      }
    } catch (error) {
      console.error('Error fetching booking:', error)
    }
  }

  useEffect(() => {
    fetchEmployee()
  }, [])

  const handleEdit = (id: number) => {
    navigate(`/employee/${id}`)
  }

  return (
    <div>
      <div className="flex items-center justify-between mt-5 ml-10">
        <h1 className="text-2xl font-bold ">View Employee</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <Button onClick={() => navigate('/employee/add')}>Add New</Button>
      </div>
      <hr className="mt-5 ml-10 border-2 border-green-300"></hr>

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
          {Employee.map((employees: any) => (
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
                        //onClick={() => deleteAction(invoice.id)}
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
