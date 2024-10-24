"use strict";
'use clinet';
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
exports.default = AboutProfileForm;
const page_1 = __importDefault(require("@/app/imageSave/page"));
const accordion_1 = require("@/components/ui/accordion");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const react_1 = __importStar(require("react"));
function AboutProfileForm({ aboutFormData, handleAboutFormDataChange, }) {
    const [aboutimages, setFileRecords] = (0, react_1.useState)([]);
    const handleChange = (e) => {
        const { name, files, value } = e.target;
        handleAboutFormDataChange({
            ...aboutFormData,
            [name]: value,
            aboutimages: aboutimages,
        });
    };
    (0, react_1.useEffect)(() => {
        handleAboutFormDataChange({
            ...aboutFormData,
            aboutimages: aboutimages,
        });
    }, [aboutimages]);
    return (<div>
      <accordion_1.Accordion type="single" collapsible>
        <accordion_1.AccordionItem value="item-1">
          <accordion_1.AccordionTrigger className="text-xl">About Hotel</accordion_1.AccordionTrigger>
          <accordion_1.AccordionContent>
            <form_1.Form>
              <form>
                <div>
                  <label>Hotel Description</label>
                  <textarea_1.Textarea name="description" value={aboutFormData.description} placeholder="Hotel description" onChange={handleChange} className="h-20"/>
                </div>
                <div>
                  <label>Hotel Rooms</label>
                  <input_1.Input type="text" name="room" value={aboutFormData.room} placeholder="Hotel Rooms" onChange={handleChange}/>
                </div>
                <div>
                  <label>Hotel Staff</label>
                  <input_1.Input type="text" name="staff" value={aboutFormData.staff} placeholder="Hotel Staff" onChange={handleChange}/>
                </div>
                <div>
                  <label>Hotel Clients</label>
                  <input_1.Input type="text" name="client" value={aboutFormData.client} placeholder="Hotel Clients" onChange={handleChange}/>
                </div>
                <div>
                  <label>Hotel Images</label>

                  <page_1.default invoiceid={8} setParentFileRecords={setFileRecords}/>

                  {/* <Input
          type="file"
          name="aboutimages"
          multiple
          onChange={handleChange}
        />
      </div>
      <div className="grid">
        {aboutFormData.aboutimageUrls &&
          aboutFormData.aboutimageUrls.length > 0 && (
            <div className="flex gap-2">
              {aboutFormData.aboutimageUrls.map(
                (imageUrl: any, index: any) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Hotel Preview ${index + 1}`}
                    width="50"
                  />
                )
              )}
            </div>
          )}*/}
                </div>
              </form>
            </form_1.Form>
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </div>);
}
