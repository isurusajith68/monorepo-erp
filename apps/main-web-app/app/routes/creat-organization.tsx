import { Link } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'

export default function CreateOrganizationForm() {
  return (
    <div
      className="relative h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url('img/hotel-2.jpg')` }}
    >
      {' '}
      {/* Replace with your image path */}
      {/* Form container with a dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 w-full max-w-md p-8 bg-white/20 backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Organization
        </h2>

        {/* Email Input */}
        <label className="text-white mb-2 block">Email</label>
        <Input
          type="email"
          placeholder="Email"
          className="w-full mb-4 rounded-md bg-white"
        />

        {/* Password Input */}
        <label className="text-white mb-2 block">Password</label>
        <Input
          type="password"
          placeholder="Password"
          className="w-full mb-4 rounded-md bg-white"
        />

        {/* Phone Number Input */}
        <label className="text-white mb-2 block">Phone Number</label>
        <Input
          type="tel"
          placeholder="Phone Number"
          className="w-full mb-4 rounded-md bg-white"
        />

        {/* Organization Name Input */}
        <label className="text-white mb-2 block">Organization Name</label>
        <Input
          type="text"
          placeholder="Organization Name"
          className="w-full mb-4 rounded-md bg-white"
        />

        {/* Domain Type (Radio Buttons) */}
        <label className="text-white mb-2 block">Domain Type</label>
        <RadioGroup defaultValue="top" className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <RadioGroupItem value="top" id="top" />
            <label htmlFor="top" className="ml-2 text-white">
              Top
            </label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="custom" id="custom" />
            <label htmlFor="custom" className="ml-2 text-white">
              Custom
            </label>
          </div>
        </RadioGroup>

        {/* Domain Name Input */}
        <label className="text-white mb-2 block">Domain Name</label>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Domain Name"
            className="w-full mb-4 rounded-md bg-white"
          />
          <span className="text-white ml-2">.com</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <Link to={'/'}>
            <Button variant="outline" className="w-full mr-2 ">
              Cancel
            </Button>
          </Link>
          <Link to={'/dashbord'}>
            <Button variant="outline" className="w-full mr-2 ">
              Create
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
