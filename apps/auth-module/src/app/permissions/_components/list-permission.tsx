import {
  useAddPermission,
  useGetModules,
  useGetPermissions,
} from '../_services/queries'
import Navbar from '@/components/commonUi/navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetRoles } from '@/app/role/_services/queries'
import { useEffect, useState } from 'react'
import {
  useActions,
  useGetDocumentsByModule,
} from '@/app/actions/_services/queries'
import { Button } from '@/components/ui/button'

export default function ListPermission() {
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)

  const { data: modules } = useGetModules()
  const { data: roles } = useGetRoles()
  const { data: documents } = useGetDocumentsByModule(selectedModule)
  const { data: permissions } = useGetPermissions(selectedModule, selectedRole)
  const { mutate, data: datamute } = useAddPermission()

  // const [truePermissions, settruePermissions] = useState<number[]>([])
  const [truePermissions, settruePermissions] = useState<
    { actid: number; docid: number }[]
  >([])

  useEffect(() => {
    settruePermissions(
      permissions?.list
        ?.filter((r) => r.permission)
        .map((p) => {
          return { actid: p.actid, docid: p.docid }
        }),
    )
  }, [permissions?.list])

  useEffect(() => {
    console.log('truePermissions', truePermissions)
  }, [truePermissions])

  const handleSwitchChange = (
    actionId: number,
    value: boolean,
    docid: number,
  ) => {
    if (value) {
      settruePermissions((prev) => [...prev, { actid: actionId, docid: docid }])
    } else {
      settruePermissions((prev) => prev.filter((a) => a.actid != actionId))
    }
  }

  const handleSave = () => {
    const obj = {
      truePermissions: truePermissions,
      rid: selectedRole,
      module: selectedModule,
    }

    console.log('obj', obj)
    mutate(obj, {
      onSuccess: (data) => {
        console.log('Received data after mutation:', data)
        // You can access the data here directly after mutation
      },
    })
  }
  return (
    <div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        {/* Tab Buttons */}
        <Navbar />
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold ml-10 mt-6 w-[450px]">
            Module & Document permission
          </p>

          <div className="flex justify-end w-full mr-10 mt-6 gap-6">
            {/* Role Select */}
            <div className="w-[20%] ">
              <Select
                onValueChange={(value) => {
                  setSelectedRole(value)
                }}
              >
                <SelectTrigger className="border-2">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {roles?.roles.map((role) => (
                    <SelectItem key={role.rid} value={role.rid}>
                      {role.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Document Select */}
            <div className="w-[20%] ">
              <Select
                onValueChange={(value) => {
                  setSelectedModule(value)
                }}
              >
                <SelectTrigger className="border-2">
                  <SelectValue placeholder="Select Module" />
                </SelectTrigger>
                <SelectContent>
                  {modules?.modules.map((module) => (
                    <SelectItem key={module.modid} value={module.modid}>
                      {module.modname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {documents?.documents && (
          <div className="">
            <div className="border-2 border-blue-200 shadow-sm m-6 p-4 rounded-md flex flex-col   items-start gap-6 ">
              {documents?.documents.map((document) => (
                <div key={document.docid} className="flex justify-start gap-6">
                  <div className="w-[100px] bg-blue-200 border-2  border-blue-300 rounded-md flex justify-center items-center">
                    {document.docname}
                  </div>

                  <div className="flex gap-4">
                    {permissions &&
                      permissions?.list
                        .filter((a) => a.docid == document.docid)
                        .map((a) => (
                          <ActionSelector
                            actionId={a.actid}
                            name={a.actname}
                            key={a.actid}
                            selected={a.permission}
                            docid={a.docid}
                            onSwitchChange={handleSwitchChange}
                          />
                        ))}
                  </div>
                </div>
              ))}
              <div className="w-full">
                <div className="flex justify-end mr-2">
                  <Button
                    className="bg-green-500 w-[80px]"
                    type="submit"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export const ActionSelector = ({
  actionId,
  name,
  selected = false,
  docid,
  onSwitchChange,
}: {
  actionId: number
  name: string | boolean
  selected?: boolean
  docid: number
  onSwitchChange: (actionId: number, value: boolean, docid: number) => void
}) => {
  const [sel, setSel] = useState<boolean>(selected)

  const handleSwitchChange = (checked: boolean) => {
    setSel(checked)
    onSwitchChange(actionId, checked, docid)
  }

  return (
    <div className="flex items-center space-x-2 border-2 border-blue-300 rounded-2xl p-2 bg-slate-100">
      <Switch
        className=" data-[state=checked]:bg-green-500  data-[state=unchecked]:bg-red-500"
        id={`${actionId.toString()}`}
        defaultChecked={sel}
        checked={sel}
        onCheckedChange={handleSwitchChange}
      />

      <Label htmlFor={`${actionId.toString()}`}>{name}</Label>
    </div>
  )
}
