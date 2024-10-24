"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const react_1 = __importDefault(require("react"));
function page() {
    return (<div className="w-[1440px] h-[766px] relative bg-white">
      <div className="w-6 h-6 left-[269px] top-[96px] absolute"/>
      <div className="w-[300px] h-[109px] left-[284px] top-[107px] absolute text-black text-[29px] font-bold font-['Inter']">
        New Invoice
      </div>
      <div className="w-[1126px] h-[566px] left-[293px] top-[170px] absolute bg-[#eefaf1] rounded-xl"/>
      <div className="w-[228px] h-[41px] left-[504px] top-[188px] absolute bg-white rounded-xl border border-[#9cd8ac]"/>
      <div className="w-10 h-[41px] left-[692px] top-[188px] absolute bg-[#d6f4de] rounded-xl border border-[#9cd8ac]"/>
      <div className="w-6 h-6 left-[700px] top-[197px] absolute justify-center items-center inline-flex">
        <div className="w-6 h-6 relative"></div>
      </div>
      <div className="w-[228px] h-[41px] left-[508px] top-[251px] absolute bg-white rounded-xl border border-[#9cd8ac]"/>
      <div className="w-[228px] h-[41px] left-[1101px] top-[254px] absolute bg-white rounded-xl border border-[#9cd8ac]"/>
      <div className="w-10 h-[41px] left-[1289px] top-[254px] absolute bg-[#d6f4de] rounded-xl border border-[#9cd8ac]"/>
      <div className="w-6 h-6 left-[1297px] top-[262px] absolute justify-center items-center inline-flex">
        <div className="w-6 h-6 relative"></div>
      </div>
      <div className="w-[228px] h-[41px] left-[1101px] top-[188px] absolute bg-white rounded-xl border border-[#9cd8ac]"/>
      <div className="w-[349px] h-[29px] left-[329px] top-[199px] absolute text-[#756d6d] text-lg font-medium font-['Inter']">
        Customer Name
      </div>
      <div className="w-[349px] h-[29px] left-[518px] top-[202px] absolute text-[#756d6d] text-xs font-medium font-['Inter']">
        Select or enter
      </div>
      <div className="w-[349px] h-[29px] left-[1122px] top-[266px] absolute text-[#756d6d] text-xs font-medium font-['Inter']">
        Select or enter
      </div>
      <div className="w-[349px] h-[29px] left-[960px] top-[194px] absolute text-[#756d6d] text-lg font-medium font-['Inter']">
        Invoice Date
      </div>
      <div className="w-[349px] h-[29px] left-[329px] top-[260px] absolute text-[#756d6d] text-lg font-medium font-['Inter']">
        Due date
      </div>
      <div className="w-[349px] h-[29px] left-[960px] top-[262px] absolute text-[#756d6d] text-lg font-medium font-['Inter']">
        Select Project
      </div>
      <div className="w-[1047px] h-[50px] left-[318px] top-[370px] absolute bg-[#d6f4de] rounded-tl-xl rounded-tr-xl"/>
      <div className="w-[1047px] h-[50px] left-[318px] top-[370px] absolute bg-[#d6f4de] rounded-tl-xl rounded-tr-xl"/>
      <div className="w-[1047px] h-[105px] left-[318px] top-[420px] absolute bg-[#e3f2e7] rounded-bl-xl rounded-br-xl"/>
      <div className="w-[349px] h-[29px] left-[339px] top-[474px] absolute text-[#756d6d] text-xs font-normal font-['Inter']">
        Enter the item.
      </div>
      <div className="w-[349px] h-[29px] left-[1033px] top-[478px] absolute text-[#756d6d] text-xs font-normal font-['Inter']">
        0.00
      </div>
      <div className="w-[349px] h-[29px] left-[1207px] top-[474px] absolute text-[#756d6d] text-xs font-medium font-['Inter']">
        0.00
      </div>
      <div className="w-[349px] h-[29px] left-[611px] top-[478px] absolute text-[#756d6d] text-xs font-normal font-['Inter']">
        1.0
      </div>
      <div className="w-[349px] h-[29px] left-[922px] top-[478px] absolute text-[#756d6d] text-xs font-normal font-['Inter']">
        0.00
      </div>
      <div className="w-[233px] h-[58px] left-[329px] top-[380px] absolute text-black text-lg font-medium font-['Inter']">
        Item Table
      </div>
      <div className="w-[233px] h-[58px] left-[329px] top-[428px] absolute text-black text-xs font-medium font-['Inter']">
        ITEM DETAILS
      </div>
      <div className="w-[233px] h-[58px] left-[603px] top-[426px] absolute text-black text-xs font-medium font-['Inter']">
        QUANTITY
      </div>
      <div className="w-[233px] h-[58px] left-[922px] top-[426px] absolute text-black text-xs font-medium font-['Inter']">
        RATE
      </div>
      <div className="w-[233px] h-[58px] left-[1032px] top-[428px] absolute text-black text-xs font-medium font-['Inter']">
        TAX
      </div>
      <div className="w-[233px] h-[58px] left-[1207px] top-[426px] absolute text-black text-xs font-medium font-['Inter']">
        AMOUNT
      </div>
      <div className="w-[1033px] h-[0px] left-[329px] top-[455px] absolute border border-[#dfd1d1]"></div>
      <div className="w-[106px] h-[0px] left-[597px] top-[419px] absolute origin-top-left rotate-90 border border-[#dfd1d1]"></div>
      <div className="w-[103px] h-[0px] left-[913px] top-[421px] absolute origin-top-left rotate-90 border border-[#dfd1d1]"></div>
      <div className="w-[103px] h-[0px] left-[1027px] top-[422px] absolute origin-top-left rotate-90 border border-[#dfd1d1]"></div>
      <div className="w-[103px] h-[0px] left-[1198px] top-[422px] absolute origin-top-left rotate-90 border border-[#dfd1d1]"></div>
      <div className="w-[148px] h-[39px] left-[329px] top-[544px] absolute bg-[#d6f4de] rounded-xl"/>
      <div className="w-[233px] left-[364px] top-[555px] absolute text-black text-xs font-medium font-['Inter']">
        Add New Row
      </div>
      <div className="w-6 h-6 px-[7.76px] left-[664px] top-[197px] absolute justify-center items-center inline-flex"/>
      <div className="w-6 h-6 px-[7.76px] left-[1259px] top-[262px] absolute justify-center items-center inline-flex"/>
      <div className="w-[410px] h-[141px] left-[952px] top-[540px] absolute bg-[#e4f2e7] rounded-xl"/>
      <div className="w-[233px] h-[58px] left-[985px] top-[638px] absolute text-black text-lg font-medium font-['Inter']">
        Total (LKR)
      </div>
      <div className="w-[233px] h-[58px] left-[1304px] top-[632px] absolute text-black text-lg font-medium font-['Inter']">
        0.00
      </div>
      <div className="w-[349px] h-[29px] left-[985px] top-[568px] absolute text-[#756d6d] text-lg font-medium font-['Inter']">
        Adjustment
      </div>
      <div className="w-[228px] h-[41px] left-[1122px] top-[558px] absolute bg-white rounded-xl border border-[#9cd8ac]"/>
      <div className="w-40 h-10 left-[329px] top-[681px] absolute">
        <div className="w-[148px] h-[33px] left-0 top-0 absolute bg-[#0b640b] rounded-xl border-2 border-white"/>
        <div className="w-[117px] h-[33px] left-[43px] top-[7px] absolute text-white text-sm font-medium font-['Inter']">
          Submit
        </div>
      </div>
      <div className="w-8 h-8 left-[1346px] top-[461px] absolute"/>
    </div>);
}
