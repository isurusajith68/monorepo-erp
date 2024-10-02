import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ViewRegistration() {
  return (
    <div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">View Registration</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <Button>View List</Button>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      <Table className="rounded-xl overflow-hidden mt-10">
          <TableHeader className="bg-green-300 text-center">
            <TableRow>
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
        <TableBody>
          <TableRow>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
