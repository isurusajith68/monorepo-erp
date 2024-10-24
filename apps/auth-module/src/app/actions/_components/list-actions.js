"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListActions;
const table_1 = require("@/components/ui/table");
const queries_1 = require("@/app/modules/_services/queries");
const navbar_1 = __importDefault(require("@/components/commonUi/navbar"));
const queries_2 = require("../_services/queries");
const select_1 = require("@/components/ui/select");
const react_1 = require("react");
function ListActions() {
    const { data } = (0, queries_2.useActions)();
    const { data: documents } = (0, queries_2.useGetDocumentsAll)();
    const { data: modules } = (0, queries_1.useGetModules)();
    const [selectedModule, setSelectedModule] = (0, react_1.useState)(null);
    const [selectedDocument, setSelectedDocument] = (0, react_1.useState)(null);
    const filteredActions = data?.actions.filter((action) => {
        return ((!selectedModule || action.modid === selectedModule) &&
            (!selectedDocument || action.docid === selectedDocument));
    });
    return (<div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        {/* Tab Buttons */}
        <navbar_1.default />
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold ml-10 mt-6 w-[150px]">
            Action List
          </p>

          <div className="flex justify-end w-full mr-10 mt-6 gap-6">
            {/* Module Select */}
            <div className="w-[20%] ">
              <select_1.Select onValueChange={(value) => {
            setSelectedModule(value);
        }}>
                <select_1.SelectTrigger className="border-2">
                  <select_1.SelectValue placeholder="Select Module"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  {modules?.modules.map((module) => (<select_1.SelectItem key={module.modid} value={module.modid}>
                      {module.modname}
                    </select_1.SelectItem>))}
                </select_1.SelectContent>
              </select_1.Select>
            </div>

            {/* Document Select */}
            <div className="w-[20%] ">
              <select_1.Select onValueChange={(value) => {
            setSelectedDocument(value);
        }}>
                <select_1.SelectTrigger className="border-2">
                  <select_1.SelectValue placeholder="Select Document"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  {documents?.documents.map((doc) => (<select_1.SelectItem key={doc.docid} value={doc.docid}>
                      {doc.docname}
                    </select_1.SelectItem>))}
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </div>
        </div>
        <div className="m-10 ">
          <table_1.Table className="rounded-md overflow-hidden">
            <table_1.TableCaption className="pt-4">
              A list of your sysem actions.
            </table_1.TableCaption>
            <table_1.TableHeader className="bg-blue-400">
              <table_1.TableRow className="justify-center">
                <table_1.TableHead className="w-[20%] text-center text-black">
                  ID
                </table_1.TableHead>
                <table_1.TableHead className="w-[40%] text-center text-black">
                  ACTION
                </table_1.TableHead>
                <table_1.TableHead className="w-[40%] text-center text-black">
                  DESCRIPTION
                </table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>

            <table_1.TableBody>
              {filteredActions &&
            filteredActions.map((action, index) => (<table_1.TableRow key={action.actid}>
                    <table_1.TableCell className="font-medium text-center">
                      {action.actid}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center">
                      {action.actname}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center">
                      {action.description}
                    </table_1.TableCell>
                  </table_1.TableRow>))}
            </table_1.TableBody>
          </table_1.Table>
        </div>
      </div>
    </div>);
}
