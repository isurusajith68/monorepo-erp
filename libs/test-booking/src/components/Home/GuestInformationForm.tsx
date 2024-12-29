import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function GuestInformationForm() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100">
      {/* Header */}
      <div className="bg-gray-700 text-white p-4 font-bold">
        Guest Information
      </div>

      {/* Form Container */}
      <form className="bg-gray-200 p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2">Title</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Mr." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Mr.</SelectItem>
                <SelectItem value="dark">Ms.</SelectItem>
                <SelectItem value="system">Mrs.</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Country */}
          <div>
            <label className="block font-semibold mb-2">Country *</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">India</SelectItem>
                <SelectItem value="dark">USA</SelectItem>
                <SelectItem value="system">Sri Lanka</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* First Name */}
          <div>
            <label className="block font-semibold mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <Input placeholder="First Name" className="w-full" />
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-semibold mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Last Name" className="w-full" />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <Input placeholder="+94710000000" className="w-full" />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Input placeholder="help@example.com" className="w-full" />
          </div>

          {/* Confirm Email */}
          <div>
            <label className="block font-semibold mb-2">
              Confirm Email <span className="text-red-500">*</span>
            </label>
            <Input placeholder="help@example.com" className="w-full" />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block font-semibold mb-2">Special Requests</label>
          <Textarea
            placeholder="Enter your requests"
            className="w-full"
            rows={4}
          />
        </div>

        {/* Note */}
        <p className="text-sm text-gray-500">
          Please note that special characters are not allowed.
        </p>

        {/* Required Fields Notice */}
        <div className="text-red-500 text-sm font-semibold">
          * Required Fields
        </div>
      </form>
    </div>
  )
}
