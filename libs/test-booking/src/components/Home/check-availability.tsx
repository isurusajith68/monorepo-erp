import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function CheckAvailability() {
  return (
    <div className="ml-10 mr-10">
      <div className="">
        {/* Form Section */}
        <div className=" bg-gray-300 p-6 rounded-md shadow-md w-full">
          {/* <h2 className="text-lg font-semibold mb-4">Search Criteria</h2> */}
          <form>
            <div className="grid grid-cols-4 gap-4 ">
              {/* <div className="mb-4 grid grid-cols-2 gap-2">
                <Label
                  htmlFor="hotel"
                  className="block text-sm font-medium text-end mt-4"
                >
                  Hotel
                </Label>
                <Input
                  type="text"
                  name="name"
                  // value={'HillRoots'}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"
                />
              </div> */}

              <div className="mb-4 grid grid-cols-2 gap-2">
                <Label
                  htmlFor="checkin"
                  className="block text-sm font-medium text-end mt-4"
                >
                  Check In Date
                </Label>
                <Input
                  type="date"
                  id="checkin"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-2">
                <Label
                  htmlFor="checkout"
                  className="block text-sm font-medium text-end mt-4"
                >
                  Check Out Date
                </Label>
                <Input
                  type="date"
                  id="checkout"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-2">
                <Label
                  htmlFor="promo"
                  className="block text-sm font-medium text-end mt-4"
                >
                  Promotion Code
                </Label>
                <Input
                  type="text"
                  id="promo"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"
                />
              </div>

              <Button
                type="submit"
                className="w-[50%] py-2 bg-red-900 text-white rounded-md ml-4"
              >
                Submit
              </Button>
            </div>

            {/* <div className="mb-4 grid grid-cols-2 gap-8">
              <Label className="block text-sm font-medium text-end">
              Are you Sri Lankan?
              </Label>
              <div className="flex items-center space-x-4">
              <Label className="inline-flex items-center">
                  <Input
                  type="radio"
                  name="srilankan"
                  value="yes"
                  className="form-radio text-red-600"
                  />
                  <span className="ml-2">Yes</span>
                  </Label>
                  <Label className="inline-flex items-center">
                  <Input
                  type="radio"
                  name="srilankan"
                  value="no"
                  className="form-radio text-red-600"
                  />
                  <span className="ml-2">No</span>
                  </Label>
                  </div>
                  </div> */}
          </form>
        </div>
        <div className="mt-10">
          <h1>Available Rooms</h1>
        </div>
      </div>
    </div>
  )
}

export default CheckAvailability
