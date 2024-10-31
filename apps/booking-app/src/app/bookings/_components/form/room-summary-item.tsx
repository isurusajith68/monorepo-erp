import { useEffect, useState } from 'react'
import RoomCountSelector from './room-counter'
import { CiCircleRemove } from 'react-icons/ci'

// export const RoomSummaryItem = ({room,handleremove,settotalAmount}) => {

//     const [count, setcount] = useState<number>(room.count ?? 1);

//     useEffect(() => {
//         console.log("test",count)

//         settotalAmount(Number(count)*Number(room.price))

//     }, [count]);

//   return (
//     <div className="  key={index} flex justify-between gap-2 mt-2">
//     <div className="flex ">
//       <div>
//         <p className="font-bold">
//           {room.type} - {room.view}
//         </p>
//         <p className="text-gray-600">Basis: {room.basis}</p>
//       </div>
//       <div>
//         <p className="text-gray-600">Price: {room.price}</p>
//         <RoomCountSelector
//           roomCount={room.count }
//           callback={setcount}
//         />
//          <p className="text-gray-600">Amount: {count*room.price}</p>
//       </div>
//     </div>

//     <button
//       className="bg-red-500 text-white py-1 px-2 rounded"
//       onClick={() => handleremove(room.typeid, room.viewid, room.basis)}
//     >
//       <CiCircleRemove className="text-4xl" />
//     </button>
//   </div>
//   )
// }

//--------------------------------------------------------------

export const RoomSummaryItem = ({
  room,
  handleremove,
  updateTotal,
  handleCount,
  addoccupentdata,
  handleremoveocd,
}) => {
  //   const [count, setCount] = useState<number>(room.count ?? 1)

  const handleRoomCount = (typeid, viewid, basis, c) => {
    console.log('xcount', c)

    // setCount(c)
    handleCount(room.typeid, room.viewid, room.basis, c)
  }

  useEffect(() => {
    // Call updateRoomAmount whenever count or price changes
    // updateRoomAmount(room.typeid, room.viewid, count * room.price);
    updateTotal(room.occupantdetails.length * room.price)
  }, [room.occupantdetails.length])

  console.log('counttttt', room.occupantdetails.length)

  return (
    <div className="flex justify-between gap-2 mt-2">
      <div className="flex flex-col">
        <p className="font-bold">
          {room.type} - {room.view}
        </p>
        <p className="text-gray-600">Basis: {room.basis}</p>
        <p className="text-gray-600">Price: {room.price}</p>
        <RoomCountSelector
          typeid={room.typeid}
          viewid={room.viewid}
          basis={room.basis}
          count={room.occupantdetails.length}
          callback={handleRoomCount}
          occupantdetails={room.occupantdetails}
          addoccupentdata={addoccupentdata}
          handleremoveocd={handleremoveocd}
        />
        <p className="text-gray-600">
          Amount: {room.occupantdetails.length * room.price}
        </p>
      </div>

      <button
        className="bg-red-500 text-white py-1 px-2 rounded"
        onClick={() => {
          console.log('popo')

          handleremove(room.typeid, room.viewid, room.basis)
        }}
      >
        <CiCircleRemove className="text-4xl" />
      </button>
    </div>
  )
}

// export const RoomSummaryItem = ({ room, handleremove, updateRoomAmount }) => {
//     const [count, setCount] = useState<number>(room.count ?? 1);

//     const handleRoomCount = (c: number) => {
//       setCount(c);
//     };

//     useEffect(() => {
//       // Call updateRoomAmount whenever count or price changes
//       updateRoomAmount(room.typeid, room.viewid, count * room.price);
//     }, [count, room.price]);

//     return (
//       <div className="flex justify-between gap-2 mt-2">
//         <div className="flex flex-col">
//           <p className="font-bold">{room.type} - {room.view}</p>
//           <p className="text-gray-600">Basis: {room.basis}</p>
//           <p className="text-gray-600">Price: {room.price}</p>
//           <RoomCountSelector
//             roomCount={count}
//             callback={handleRoomCount}
//           />
//           <p className="text-gray-600">Amount: {count * room.price}</p>
//         </div>

//         <button
//           className="bg-red-500 text-white py-1 px-2 rounded"
//           onClick={() => handleremove(room.typeid, room.viewid, room.basis)}
//         >
//           <CiCircleRemove className="text-4xl" />
//         </button>
//       </div>
//     );
//   };
