import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
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
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

const RegistrationListPage = () => {
  const { toast } = useToast()
  const [registration, setRegistration] = useState([])
  //   const [searchId, setSearchId] = useState("");
  //   const [selectedCustomerType, setselectedCustomerType] = useState("all");
  //   const [searchName, setSearchName] = useState("");
  const navigate = useNavigate()

  const fetchRegistration = async () => {
    try {
      // Make API request to get registration data by ID
      const response = await Axios.get(`http://localhost:4000/allregistration`)
      if (response.data.success) {
        // Reset the form with registration data
        console.log('id', response.data.data)
        const sortedData = response.data.data.sort(
          (a: any, b: any) => b.id - a.id,
        )
        setRegistration(sortedData)
        // form.reset(response.data.data);
      } else {
        console.error('Registration not found:', response.data.msg)
      }
    } catch (error) {
      console.error('Error fetching registration:', error)
    }
  }
  useEffect(() => {
    // Fetch registration data from the backend

    fetchRegistration()
  }, [])

  const handleEdit = (id: number) => {
    navigate(`/registration/${id}`)
  }

  //   const filteredInvoices = customers.filter((customer: any) => {
  //     const matchesId = customer.id
  //       .toString()
  //       .toLowerCase()
  //       .includes(searchId.toLowerCase());
  //     const matchesName = customer.cname
  //       .toLowerCase()
  //       .includes(searchName.toLowerCase());

  //     const matchesProjectType =
  //       selectedCustomerType === "all" ||
  //       customer.ctype.toLowerCase() === selectedCustomerType.toLowerCase();

  //     return matchesId && matchesName && matchesProjectType;
  //   });
  // customer delete function

  const deleteAction = async (id) => {
    if (id) {
      try {
        console.log('Deleting registration with id:', id)

        // Make the DELETE request to the backend API
        await Axios.delete(`http://localhost:4000/deleteregistration/${id}`)

        // Show success toast notification
        toast({
          className: 'text-red-600',
          title: 'Registration',
          description: <span>Deleted successfully..</span>,
          duration: 3000,
        })

        fetchRegistration()
      } catch (error) {
        // Handle any error that occurs during the delete process
        console.error('Error deleting registration:', error)
        toast({
          className: 'text-red-600',
          title: 'Error',
          description: <span>Failed to delete the registration..</span>,
          duration: 3000,
        })
      }
    }
  }

  return (
    <div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">View Registration</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <Button
          onClick={() => navigate('/registration/add')}
          className="bg-green-600"
        >
          + Add
        </Button>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      <Table className="rounded-xl overflow-hidden mt-10">
        <TableHeader className="bg-green-300 text-center">
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Full Name</TableHead>
            <TableHead className="text-center">Address</TableHead>
            <TableHead className="text-center">City </TableHead>
            <TableHead className="text-center">Province</TableHead>
            <TableHead className="text-center">Country</TableHead>
            <TableHead className="text-center"> Postal Code</TableHead>
            <TableHead className="text-center"> Email</TableHead>
            <TableHead className="text-center"> Telephone</TableHead>
            <TableHead className="text-center">Status </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-green-50">
          {registration.map((registration: any) => (
            <TableRow key={registration.id}>
              <TableCell className="text-center">{registration.id}</TableCell>
              <TableCell className="text-center">
                {registration.fullname}
              </TableCell>

              <TableCell className="text-center">
                {registration.address}
              </TableCell>
              <TableCell className="text-center">{registration.city}</TableCell>
              <TableCell className="text-center">
                {registration.province}
              </TableCell>
              <TableCell className="text-center">
                {registration.country}
              </TableCell>
              <TableCell className="text-center">
                {registration.postalcode}
              </TableCell>
              <TableCell className="text-center">
                {registration.email}
              </TableCell>
              <TableCell className="text-center">
                {registration.telephone}
              </TableCell>
              <TableCell className="text-center flex">
                <Button
                  className="bg-green-600 ml-5"
                  onClick={() => handleEdit(registration.id)}
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
                        Are you absolutely sure?
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
                        onClick={() => deleteAction(registration.id)}
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

export default RegistrationListPage
