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
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const dialog_1 = require("@/components/ui/dialog");
const RoomSelectionDialog = ({ onSelect, selectedRooms, }) => {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [open, setOpen] = (0, react_1.useState)(false);
    const rooms = ['101', '102', '103', '201', '202', '203', '301', '302', '303'];
    const filteredRooms = rooms.filter((room) => room.includes(searchTerm));
    const handleSelect = (room) => {
        const updatedRooms = selectedRooms.includes(room)
            ? selectedRooms.filter((r) => r !== room)
            : [...selectedRooms, room];
        onSelect(updatedRooms);
    };
    const handleClose = () => {
        setOpen(false);
        setSearchTerm('');
    };
    return (<dialog_1.Dialog open={open} onOpenChange={setOpen}>
      <dialog_1.DialogTrigger asChild>
        <button_1.Button variant="outline">Select Rooms</button_1.Button>
      </dialog_1.DialogTrigger>
      <dialog_1.DialogContent className="sm:max-w-[425px]">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Select Rooms</dialog_1.DialogTitle>
        </dialog_1.DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <lucide_react_1.Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
            <input_1.Input placeholder="Search rooms..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {filteredRooms.map((room) => (<button_1.Button key={room} variant={selectedRooms.includes(room) ? 'default' : 'outline'} onClick={() => handleSelect(room)}>
                {room}
              </button_1.Button>))}
          </div>
        </div>
        <button_1.Button onClick={handleClose}>Done</button_1.Button>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
};
exports.default = RoomSelectionDialog;
