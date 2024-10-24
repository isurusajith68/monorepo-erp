"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewFormRole;
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const fa_1 = require("react-icons/fa");
const zod_1 = require("zod");
const mutation_1 = __importDefault(require("../_services/mutation"));
const queries_1 = require("../_services/queries");
const react_1 = require("react");
const react_form_1 = require("@tanstack/react-form");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
const zod_form_adapter_1 = require("@tanstack/zod-form-adapter");
const utils_1 = require("@/lib/utils");
const react_router_dom_1 = require("react-router-dom");
const navbar_1 = __importDefault(require("@/components/commonUi/navbar"));
const roleDetailSchema = zod_1.z.object({
    rid: zod_1.z.number().optional(),
    role: zod_1.z.string().min(2, { message: 'Role must be at least 2 characters' }),
    description: zod_1.z.string(),
});
const formSchema = zod_1.z.object({
    roles: zod_1.z.array(roleDetailSchema).min(1, { message: 'Role must be at 10' }),
});
function NewFormRole() {
    const Navigate = (0, react_router_dom_1.useNavigate)();
    const form = (0, react_form_1.useForm)({
        defaultValues: {
            roles: [
                {
                    rid: 0,
                    role: 'Role',
                    description: 'Description',
                },
            ],
        },
        validators: {
            //   onChange: formSchema,
            onSubmit: formSchema,
        },
        validatorAdapter: (0, zod_form_adapter_1.zodValidator)(),
        //   as { rid: string; role: string; description: string }[],
        //role: [] as string[],
        //   password: '',
        //   confirmPassword: '',
        //   role: [] as string[],
        //   skills: [] as { language: string; rating: number }[],
        onSubmit: ({ value }) => {
            console.log(value);
            const res = (0, utils_1.getDirtyValuesTF)({ roles: roles.roles.rows }, value, [{ arrayName: 'roles', pkName: 'rid' }], 'rid');
            mutate(res);
            //window.location.reload()
        },
    });
    const { mutate, data: datamute } = (0, mutation_1.default)();
    const { data: roles } = (0, queries_1.useGetRoles)();
    (0, react_1.useEffect)(() => {
        if (roles) {
            // form.setFieldValue('role', [
            //   { rid: '1', role: '1,', description: 'ppp' },
            //   { rid: '1', role: '1,', description: 'ppp' },
            // ])
            for (let index = 0; index < roles.roles.rows.length; index++) {
                const role = roles.roles.rows[index];
                form.setFieldValue('roles', roles.roles.rows);
            }
            //   roles.roles.rows.forEach((role, index) => {
            //     form.setFieldValue(`role[${index}].rid`, role.rid)
            //     form.setFieldValue(`role[${index}].role`, role.role)
            //     form.setFieldValue(`role[${index}].description`, role.description)
            //   })
        }
    }, [roles]);
    return (<div className="mx-[10%] ">
      <div className="m-10 border-2 border-blue-200 rounded-lg shadow-lg ">
        {/* Tab Buttons */}
        <navbar_1.default />

        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold ml-10 mt-6 w-[150px]">
            User Role List{' '}
          </p>

          <div className="flex justify-end w-full mr-10 mt-6">
            <div className="relative">
              <fa_1.FaUserCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"/>
              <input type="text" placeholder="Search by Role Name" className="border rounded-full pl-10 pr-4 py-2 focus:outline-none"/>
            </div>
          </div>
        </div>
        <div className="m-10 ">
          <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            //form.handleSubmit()
        }}>
            <div>
              <form.Field name="roles" mode="array" children={(field) => (<>
                    <div className="flex gap-1 mb-6 font-bold text-center mt-6 rounded-t-md bg-blue-400 py-2">
                      <div className="flex-1 items-center text-center lg:ml-[10%]">
                        <label_1.Label>ID</label_1.Label>
                      </div>
                      <div className="flex-1 items-center text-center lg:ml-[15%]">
                        <label_1.Label>ROLE NAME</label_1.Label>
                      </div>
                      <div className="flex-1 items-center text-center lg:ml-[18%]">
                        <label_1.Label>DESCRIPTION</label_1.Label>
                      </div>
                      <div className="flex-1 items-center text-center lg:ml-[5%]">
                        <label_1.Label>ACTIONS</label_1.Label>
                      </div>
                    </div>
                    {field.state.value.map((_, index) => (<div key={index} className="flex gap-2 mb-6">
                        <form.Field name={`roles[${index}].rid`} children={(subField) => (<div className="flex-row w-[33%]">
                              <input_1.Input type="text" readOnly value={subField.state.value} autoFocus onChange={(e) => subField.handleChange(e.target.value)}/>
                            </div>)}/>

                        <form.Field name={`roles[${index}].role`} children={(subField) => (<div className="flex-row w-[33%]">
                              <input_1.Input type="text" value={subField.state.value} autoFocus onChange={(e) => subField.handleChange(e.target.value)}/>
                              <FieldInfo field={subField}/>
                            </div>)}/>
                        <form.Field name={`roles[${index}].description`} children={(subField) => (<div className="flex-row w-[33%]">
                              <input_1.Input type="text" value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/>
                              <FieldInfo field={subField}/>
                            </div>)}/>

                        <button_1.Button variant={'destructive'} onClick={() => field.removeValue(index)}>
                          <lucide_react_1.X />
                        </button_1.Button>

                        <button_1.Button className="bg-green-600  " type="button" onClick={() => field.pushValue({
                    rid: 0,
                    role: '',
                    description: '',
                })}>
                          <fa_1.FaPlus />
                        </button_1.Button>
                      </div>))}
                    <FieldInfo field={field}/>
                    <div className="flex">
                      <button_1.Button type="button" variant={'outline'} onClick={() => field.pushValue({ rid: 0, role: '', description: '' })}>
                        Add
                      </button_1.Button>

                      <div className="flex justify-center mx-4">
                        <button_1.Button className="bg-red-600 " type="submit" onClick={() => form.reset()}>
                          Reset
                        </button_1.Button>
                      </div>

                      <div className="flex justify-center mx-4">
                        <button_1.Button className="bg-green-600  " type="submit" onClick={form.handleSubmit}>
                          Save
                        </button_1.Button>
                      </div>
                    </div>
                  </>)}/>
            </div>
          </form>
        </div>
      </div>
    </div>);
}
function FieldInfo({ field }) {
    return (<>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (<em>{field.state.meta.errors.join(',')}</em>) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>);
}
// function FieldInfo({ fieldMeta }: { fieldMeta: FieldMeta | undefined }) {
//   if (!fieldMeta) return null
//   return (
//     <>
//       {fieldMeta.isTouched && fieldMeta.errors.length ? (
//         <p className="text-destructive text-sm mt-1">
//           {fieldMeta.errors.join(',')}
//         </p>
//       ) : null}
//       {fieldMeta.isValidating ? 'Validating...' : null}
//     </>
//   )
// }
