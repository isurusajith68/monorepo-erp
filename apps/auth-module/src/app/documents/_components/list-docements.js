"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListDocements;
const table_1 = require("@/components/ui/table");
const queries_1 = require("../_services/queries");
const fa_1 = require("react-icons/fa");
const navbar_1 = __importDefault(require("@/components/commonUi/navbar"));
function ListDocements() {
    const { data } = (0, queries_1.useGetDocuments)();
    return (<div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        {/* Tab Buttons */}
        <navbar_1.default />
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold ml-10 mt-6 w-[220px]">
            Docements List
          </p>

          <div className="flex justify-end w-full mr-10 mt-6">
            <div className="relative">
              <fa_1.FaUserCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"/>
              <input type="text" placeholder="Search by Module Name" className="border rounded-full pl-10 pr-4 py-2 focus:outline-none"/>
            </div>
          </div>
        </div>
        <div className="m-10  ">
          <table_1.Table className="rounded-lg w-[100%]   ">
            <table_1.TableCaption className="pt-4">
              List of your sysem docements.
            </table_1.TableCaption>

            <table_1.TableBody>
              {data &&
            Object.keys(data).map((modname, index) => {
                const rows = data[modname];
                return (<div>
                      <div key={index}>
                        <p className="uppercaseb text-xl mb-6">{modname}</p>
                        <table_1.TableHeader className="bg-blue-400  w-[200%]   ">
                          <table_1.TableRow>
                            <table_1.TableHead className="w-[30%]  text-center text-black">
                              ID
                            </table_1.TableHead>
                            <table_1.TableHead className="w-[40%]   text-center text-black  ">
                              DOCUMENT
                            </table_1.TableHead>
                            <table_1.TableHead className=" w-[30%]   text-center text-black">
                              DESCRIPTION
                            </table_1.TableHead>
                            <table_1.TableHead className="w-[50%]    text-center text-black">
                              MODULE
                            </table_1.TableHead>
                          </table_1.TableRow>
                        </table_1.TableHeader>

                        {rows.map((row) => (<table_1.TableRow key={row.docid} className=" ">
                            <table_1.TableCell className="  font-medium text-center">
                              {row.docid}
                            </table_1.TableCell>
                            <table_1.TableCell className="  text-center">
                              {row.docname}
                            </table_1.TableCell>
                            <table_1.TableCell className=" text-center">
                              {row.description}
                            </table_1.TableCell>
                            <table_1.TableCell className=" text-center">
                              {row.modname}
                            </table_1.TableCell>
                          </table_1.TableRow>))}
                      </div>
                    </div>);
            })}
            </table_1.TableBody>
          </table_1.Table>
        </div>
      </div>
    </div>);
}
