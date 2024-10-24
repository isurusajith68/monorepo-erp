"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListModule;
const table_1 = require("@/components/ui/table");
const queries_1 = require("../_services/queries");
const fa_1 = require("react-icons/fa");
const navbar_1 = __importDefault(require("@/components/commonUi/navbar"));
function ListModule() {
    const { data } = (0, queries_1.useGetModules)();
    return (<div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        {/* Tab Buttons */}
        <navbar_1.default />
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold ml-10 mt-6 w-[150px]">
            Module List
          </p>

          <div className="flex justify-end w-full mr-10 mt-6">
            <div className="relative">
              <fa_1.FaUserCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"/>
              <input type="text" placeholder="Search by Module Name" className="border rounded-full pl-10 pr-4 py-2 focus:outline-none"/>
            </div>
          </div>
        </div>
        <div className="m-10 ">
          <table_1.Table className="rounded-md overflow-hidden">
            <table_1.TableCaption className="pt-4">
              A list of your sysem modules.
            </table_1.TableCaption>
            <table_1.TableHeader className="bg-blue-400">
              <table_1.TableRow className="justify-center">
                <table_1.TableHead className="w-[20%] text-center text-black">
                  ID
                </table_1.TableHead>
                <table_1.TableHead className="w-[40%] text-center text-black">
                  MODULE
                </table_1.TableHead>
                <table_1.TableHead className="w-[40%] text-center text-black">
                  DESCRIPTION
                </table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>

            <table_1.TableBody>
              {data &&
            data.modules.map((module, index) => (<table_1.TableRow key={module.modid}>
                    <table_1.TableCell className="font-medium text-center">
                      {module.modid}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center">
                      {module.modname}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center">
                      {module.description}
                    </table_1.TableCell>
                  </table_1.TableRow>))}
            </table_1.TableBody>
          </table_1.Table>
        </div>
      </div>
    </div>);
}
