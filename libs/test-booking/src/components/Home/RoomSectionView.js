"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const rooms = [
    {
        name: 'Luxury Twin',
        price: 73125,
        deals: [
            { name: 'Breakfast Included', price: 55125 },
            { name: 'Half Board', price: 58875 },
            { name: 'Full Board', price: 62625 },
        ],
        description: 'Luxury Rooms are located in the Sigiriya wing...',
        imageUrl: 'path/to/image1.jpg',
    },
    // Add more rooms
];
const RoomSelectionView = () => {
    const [currency, setCurrency] = (0, react_1.useState)('LKR');
    const [exchangeRate, setExchangeRate] = (0, react_1.useState)(1);
    const [selectedRoom, setSelectedRoom] = (0, react_1.useState)(null);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const handleCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        setCurrency(selectedCurrency);
        // Example rates for simplicity
        if (selectedCurrency === 'USD')
            setExchangeRate(0.003);
        else if (selectedCurrency === 'EUR')
            setExchangeRate(0.0028);
        else
            setExchangeRate(1); // Default to LKR
    };
    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };
    const formatPrice = (price) => {
        return (price * exchangeRate).toFixed(2);
    };
    return (<div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Heritance Kandalama (LKR)</h2>
        <select value={currency} onChange={handleCurrencyChange} className="border p-2">
          <option value="LKR">LKR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      {/* Rooms List */}
      {rooms.map((room) => (<div key={room.name} className="flex justify-between items-center mt-4 p-4 border-b">
          <img src={room.imageUrl} alt={room.name} className="w-1/3"/>
          <div className="flex-grow ml-4">
            <h3 className="font-bold">{room.name}</h3>
            <p className="text-sm">{room.description}</p>
            <div className="flex">
              {room.deals.map((deal) => (<div key={deal.name} className="mr-4">
                  <input type="radio" name="deal"/>
                  <span>{deal.name}</span>
                  <span>
                    {formatPrice(deal.price)} {currency}
                  </span>
                </div>))}
            </div>
            <button className="text-blue-500" onClick={() => handleRoomClick(room)}>
              View Room Details
            </button>
          </div>
          <div>
            <button className="bg-gold text-white p-2">Book</button>
          </div>
        </div>))}

      {/* Modal for Room Details */}
      {showModal && selectedRoom && (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold">{selectedRoom.name}</h2>
            <p>{selectedRoom.description}</p>
            <button className="mt-4 p-2 bg-red-500 text-white" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>)}
    </div>);
};
exports.default = RoomSelectionView;
