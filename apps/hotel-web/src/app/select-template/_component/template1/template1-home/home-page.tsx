"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useEffect, useState } from 'react';

function Home({ formData }: any) {
  const [imgUrl,setimgUrl] = useState<string>("")

  useEffect(()=>{
    console.log("aaaaaa",formData)
    if(formData?.fileRecords?.length>0){

      setimgUrl( URL.createObjectURL(formData.fileRecords[0].file))
    }
  },[formData])
  
  return (
   <div>
    <div className="bg-blue-900 text-white z-0 relative">
      <div className="container mx-auto flex justify-between py-4 items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-yellow-400 ml-10">{formData.name}</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-yellow-400">Home</a>
          <a href="#" className="hover:text-yellow-400">About</a>
          <a href="#" className="hover:text-yellow-400">Services</a>
          <a href="#" className="hover:text-yellow-400">Rooms</a>
          <a href="#" className="hover:text-yellow-400">Contact</a>
        </div>
        <button />
      </div>
      <div className="bg-gray-100 py-2 text-center">
        <p className="text-blue-900">
          <i className="fa fa-envelope mr-2">{formData.phone}</i> |
          <i className="fa fa-phone-alt ml-4 mr-2">{formData.email}</i>
        </p>
      </div>

      {/* Corrected backgroundImage style */}
      <div
        className="relative bg-cover bg-center h-[600px] z-0"
        style={{
          backgroundImage: `url(${imgUrl})`
        }}
      >
        <div className="absolute z-10 inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <p className="text-lg uppercase tracking-wider">Luxury Living</p>
          <h1 className="text-5xl font-bold mb-6">{formData.title}</h1>
          <div className="flex space-x-4">
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600">
              Our Rooms
            </button>
            <button className="bg-blue-100 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-200">
              Book a Room
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center items-center bg-slate-100 -mt-10 z-50 absolute w-[90%] ml-10 mr-10 ">
      <form  className="flex space-x-4 bg-white p-6 rounded-lg shadow-md w-full  h-28 justify-between">
        {/* Check-in Date */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="checkIn">Check in</Label>
          <Input
            id="checkIn"
            type="date"
            name="checkIn"
          />
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="checkOut">Check out</Label>
          <Input
            id="checkOut"
            type="date"
            name="checkOut"
          />
        </div>

        {/* Adults Select */}
        <div className="flex flex-col space-y-1 w-40">
          <Label htmlFor="adult">Adults</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select adults" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Children Select */}
        <div className="flex flex-col space-y-1 w-40">
          <Label htmlFor="child">Children</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select children" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="bg-yellow-500 text-white mt-4">
          Submit
        </Button>
      </form>
    </div>
   </div>
  );
}

export default Home;
