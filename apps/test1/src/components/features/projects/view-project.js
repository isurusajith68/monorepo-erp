"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectList;
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const react_alert_dialog_1 = require("@radix-ui/react-alert-dialog");
const react_1 = require("react");
const project_action_1 = require("./project-action");
const navigation_1 = require("next/navigation");
const input_1 = require("@/components/ui/input");
const use_toast_1 = require("@/components/ui/use-toast");
function ProjectList() {
    const [projects, setProjects] = (0, react_1.useState)([]);
    const [searchId, setSearchId] = (0, react_1.useState)('');
    const [searchName, setSearchName] = (0, react_1.useState)('');
    const [searchType, setSearchType] = (0, react_1.useState)('all');
    const [searchDate, setSearchDate] = (0, react_1.useState)('');
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        (0, project_action_1.SelectAllProjects)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                setProjects(reversedData); // Set the reversed array to state
            }
            else {
                console.log('error');
            }
        });
    }, []);
    const handleEdit = (pid) => {
        router.push(`/projects/${pid}`);
    };
    const deleteAction = async (id) => {
        if (id) {
            await (0, project_action_1.DeleteProjects)(Number(id));
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Project',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
            (0, project_action_1.SelectAllProjects)().then((response) => {
                if (response.success) {
                    console.log(response.data);
                    setProjects(response.data);
                }
                else {
                    console.log('error');
                }
            });
            router.push('/projects');
        }
    };
    const AddNew = () => {
        router.push(`/projects/add`);
    };
    //search project
    const handleSearchChangeID = (e) => {
        setSearchId(e.target.value);
    };
    const handleSearchChangeName = (e) => {
        setSearchName(e.target.value);
    };
    const handleSearchChangeType = (e) => {
        setSearchType(e.target.value);
    };
    const handleSearchChangeDate = (e) => {
        setSearchDate(e.target.value);
    };
    const filteredProjects = projects.filter((project) => {
        // Check if the project type matches the search type or if "all" is selected
        const matchesProjectType = searchType === 'all' ||
            project.ptype.toLowerCase() === searchType.toLowerCase();
        // Check if the project ID, name, and date match the search criteria
        const matchesSearchCriteria = project.pid.toString().includes(searchId) &&
            project.pname.toLowerCase().includes(searchName.toLowerCase()) &&
            project.prdate.includes(searchDate);
        // Return true only if all conditions are met
        return matchesProjectType && matchesSearchCriteria;
    });
    //...
    return (<>
      <div className="ml-5 mt-20 text-xl font-semibold">
        <div className="flex">
          <h1 className="text-3xl font-bold pb-3">Projects</h1>
          <button_1.Button onClick={AddNew} type="button" className="lg:ml-[80%]  h-9  text-white bg-green-600">
            +Add New
          </button_1.Button>
        </div>
        <hr className="bg-green-400 h-0.5"/>

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-4 gap-16 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[80%]">
            <div className="flex flex-col-2 gap-3 lg:w-[60%] ">
              <label className="font-extralight text-sm mt-2">No</label>
              <input_1.Input type="search" className="pl-3 pr-3 py-2 border border-gray-300 " placeholder="" value={searchId} onChange={handleSearchChangeID}/>
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-48">
                Project Name
              </label>
              <input_1.Input type="search" className="pl-8 pr-3 py-2 border border-gray-300 " placeholder="" value={searchName} onChange={handleSearchChangeName}/>
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 lg:w-[40%]">
                Reg: Date
              </label>
              <input_1.Input type="date" className="pl-1 pr-3 py-2 border border-gray-300 " placeholder="" value={searchDate} onChange={handleSearchChangeDate}/>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 pl-12 pr-4 border-green-300">
        <table_1.Table className="rounded-xl border border-green-300 overflow-hidden">
          <table_1.TableHeader className="bg-green-200 text-center border border-green-300">
            <table_1.TableRow>
              <table_1.TableHead className="text-center px-4 py-2">
                Project No
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Project Owner
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Project Name
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Estimate Budget
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Project Re:Date
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Project End Date
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Description
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Action</table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody className="bg-green-50">
            {filteredProjects.map((project, index) => (<table_1.TableRow key={index} className={index % 2 === 0 ? 'hover:bg-green-100' : 'hover:bg-green-100'}>
                <table_1.TableCell className="text-center px-4 py-2">
                  {project.pid}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {project.powner}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {project.pname}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {project.estibudget}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {project.prdate}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {project.pdate}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {project.pdescription}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  <div className="flex gap-5 ml-2">
                    <div>
                      <button_1.Button onClick={() => handleEdit(project.pid)} className="bg-green-600">
                        Edit
                      </button_1.Button>
                    </div>
                    <div>
                      <alert_dialog_1.AlertDialog>
                        <react_alert_dialog_1.AlertDialogTrigger>
                          <button_1.Button className="ml-5 bg-green-600 bg-destructive">
                            Delete
                          </button_1.Button>
                        </react_alert_dialog_1.AlertDialogTrigger>
                        <alert_dialog_1.AlertDialogContent>
                          <alert_dialog_1.AlertDialogHeader>
                            <alert_dialog_1.AlertDialogTitle>
                              Are you absolutely sure?
                            </alert_dialog_1.AlertDialogTitle>
                            <alert_dialog_1.AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </alert_dialog_1.AlertDialogDescription>
                          </alert_dialog_1.AlertDialogHeader>
                          <alert_dialog_1.AlertDialogFooter>
                            <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                            <alert_dialog_1.AlertDialogAction onClick={() => deleteAction(project.pid)}>
                              Continue
                            </alert_dialog_1.AlertDialogAction>
                          </alert_dialog_1.AlertDialogFooter>
                        </alert_dialog_1.AlertDialogContent>
                      </alert_dialog_1.AlertDialog>
                    </div>
                  </div>
                </table_1.TableCell>
              </table_1.TableRow>))}
          </table_1.TableBody>
        </table_1.Table>
      </div>
    </>);
}
