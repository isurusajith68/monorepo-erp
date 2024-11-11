import { useEffect, useState } from 'react'
import { RoomSummaryItem } from './room-summary-item'

const SelectedRoomsList = ({
  selectedRooms,
  handleremove,
  handleCount,
  addoccupentdata,
  handleremoveocd,
  updateocupentcount,
  roomtypeviewcounts,
}) => {
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const calTotal = (selectedRooms1) => {
    const t = selectedRooms1.reduce(
      (a, c) => a + c.occupantdetails?.length * c.price,
      0,
    )
    console.log('tttt', t)

    setTotalAmount(t)
  }
  // const [roomAmounts, setRoomAmounts] = useState({}); // Track each room’s amount individually
  // const handleCount = (c:number,typeid:number,viewid:number,basis:string)=>{
  //  const t = selectedRooms.find(r=> r.typeid==typeid && r.viewid==viewid && r.basis ==basis)
  //  if(t){
  //   t.count = c
  //  }

  //  console.log("selectedRooms",selectedRooms)
  //  calTotal(selectedRooms)

  // }

  useEffect(() => {
    console.log('selectedRoomsx', selectedRooms)
    calTotal(selectedRooms)
  }, [selectedRooms])
  // Function to update each room's total amount based on count and price
  const updateTotal = (amount) => {
    // setTotalAmount(p=> p+amount)
    //setRoomAmounts((prev) => ({ ...prev, [`${typeid}-${viewid}`]: amount }));
  }

  // useEffect(() => {
  //   // Calculate the total amount whenever roomAmounts changes
  //   const newTotal = Object.values(roomAmounts).reduce((sum, amount) => sum + amount, 0);
  //   setTotalAmount(newTotal);
  // }, [roomAmounts]);

  return (
    <div className="p-4 border-l border-gray-300">
      <h3 className="text-xl font-bold mb-4">Selected Rooms</h3>
      {selectedRooms.length > 0 ? (
        selectedRooms.map((room, index) => (
          <RoomSummaryItem
            room={room}
            handleremove={handleremove}
            updateTotal={updateTotal}
            handleCount={handleCount}
            addoccupentdata={addoccupentdata}
            handleremoveocd={handleremoveocd}
            updateocupentcount={updateocupentcount}
            roomtypeviewcounts={roomtypeviewcounts}
            key={index}
          />
        ))
      ) : (
        <p className="text-gray-500">No rooms selected.</p>
      )}
      <p className="font-bold ">Total Amount : {totalAmount}</p>
    </div>
  )
}

export default SelectedRoomsList
