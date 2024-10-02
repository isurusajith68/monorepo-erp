import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function HomePage({formData}: {formData:any}) {
    return (
      <div>
        <nav className="bg-white shadow-sm py-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <a href="#" className="text-lg font-semibold text-gray-800">{formData.name}</a>
            </div>
            <div className="space-x-6 mr-20">
              <a href="#" className="text-gray-700">Home</a>
              <a href="#" className="text-gray-700">About Us</a>
              <a href="#" className="text-gray-700">Gallery</a>
              <a href="#" className="text-gray-700">Rooms</a>
              <a href="#" className="text-gray-700">Contact Us</a>
            </div>
          </div>
        </nav>
        <div
        className="relative bg-cover bg-center h-[600px] z-0"
        style={{
          backgroundImage: `url(${formData.imageUrl})`
        }}
      >
          <div className="absolute z-10 inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <p className="text-lg uppercase tracking-wider">Luxurious Hotel Experience</p>
          <h1 className="text-5xl font-bold mb-6">{formData.title}</h1>
          <div className="flex space-x-4">
            <button className="bg-yellow-600 text-black px-6 py-3 rounded-lg hover:bg-yellow-600">
              Our Rooms
            </button>
            <button className="bg-blue-100 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-200">
              Book a Room
            </button>
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

export default HomePage;