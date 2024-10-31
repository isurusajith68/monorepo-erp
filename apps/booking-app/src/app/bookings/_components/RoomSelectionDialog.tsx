import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface RoomSelectionDialogProps {
  onSelect: (rooms: string[]) => void
  selectedRooms: string[]
}

const RoomSelectionDialog: React.FC<RoomSelectionDialogProps> = ({
  onSelect,
  selectedRooms,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const rooms = ['101', '102', '103', '201', '202', '203', '301', '302', '303']

  const filteredRooms = rooms.filter((room) => room.includes(searchTerm))

  const handleSelect = (room: string) => {
    const updatedRooms = selectedRooms.includes(room)
      ? selectedRooms.filter((r) => r !== room)
      : [...selectedRooms, room]
    onSelect(updatedRooms)
  }

  const handleClose = () => {
    setOpen(false)
    setSearchTerm('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Select Rooms</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Rooms</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {filteredRooms.map((room) => (
              <Button
                key={room}
                variant={selectedRooms.includes(room) ? 'default' : 'outline'}
                onClick={() => handleSelect(room)}
              >
                {room}
              </Button>
            ))}
          </div>
        </div>
        <Button onClick={handleClose}>Done</Button>
      </DialogContent>
    </Dialog>
  )
}

export default RoomSelectionDialog
