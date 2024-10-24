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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileForm;
const page_1 = __importDefault(require("@/app/imageSave/page"));
const accordion_1 = require("@/components/ui/accordion");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_1 = __importStar(require("react"));
function ProfileForm({ formData, setParentFormDataChange, }) {
    // Handle change in the form and pass the updated data to the parent
    const [fileRecords, setFileRecords] = (0, react_1.useState)([]);
    const handleChange = (e) => {
        const { name, files, value } = e.target;
        setParentFormDataChange({
            ...formData,
            [name]: value,
            fileRecords: fileRecords,
        });
    };
    (0, react_1.useEffect)(() => {
        setParentFormDataChange({
            ...formData,
            fileRecords: fileRecords,
        });
    }, [fileRecords]);
    return (<div>
      <accordion_1.Accordion type="single" collapsible>
        <accordion_1.AccordionItem value="item-1">
          <accordion_1.AccordionTrigger className="text-xl">
            Hotel Information
          </accordion_1.AccordionTrigger>
          <accordion_1.AccordionContent>
            <form_1.Form>
              <form>
                <div>
                  <label>Hotel Name</label>
                  <input_1.Input type="text" name="name" value={formData.name} placeholder="Hotel Name" onChange={handleChange}/>
                </div>

                <div>
                  <label>Phone Number</label>
                  <input_1.Input type="text" name="phone" value={formData.phone} placeholder="Enter phone number" onChange={handleChange}/>
                </div>

                <div>
                  <label>Email</label>
                  <input_1.Input type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange}/>
                </div>

                <div>
                  <label>Hotel Title</label>
                  <input_1.Input type="text" name="title" value={formData.title} placeholder="Enter Hotel Title" onChange={handleChange}/>
                </div>
                <div>
                  <div>
                    <label>Hotel Image</label>
                    {/* <Input
          type="file"
          name="image"
          onChange={handleChange} // No value binding for file input
        /> */}

                    <page_1.default invoiceid={8} setParentFileRecords={setFileRecords}/>
                  </div>
                  {/* <div>
          {formData.imageUrl && (
            <div>
              <img
                src={formData.imageUrl}
                alt="Hotel Preview"
                width="100"
              />
            </div>
          )}
        </div> */}
                </div>
              </form>
            </form_1.Form>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
