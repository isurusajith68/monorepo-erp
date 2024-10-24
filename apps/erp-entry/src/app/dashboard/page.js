"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dashboard;
const use_toast_1 = require("@/hooks/use-toast");
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
function Dashboard() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [data, setData] = (0, react_1.useState)('');
    //   const getData = async () => {
    //     const response = await Axios.get("http://localhost:10000/getData",{
    //       withCredentials: true, // This ensures cookies are sent with the request
    //     });
    //     console.log("first");
    //     setData(response.data);
    //   };
    //   useEffect(() => {
    //     getData();
    //   }, []);
    const logout = async () => {
        const response = await axios_1.default.get('http://localhost:10000/logout', {
            withCredentials: true,
        });
        console.log('logout respone', response);
        if (response.data.success) {
            (0, use_toast_1.toast)({
                title: 'Logout successfull',
                description: response.data.message,
            });
            window.localStorage.clear();
            navigate('/');
            //window.location.href = "/";
        }
    };
    return (<div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-green-500  to-white-500">
      <h1 className="text-6xl font-extrabold text-white mb-10">
        Welcome to the Hotel
      </h1>
      <p>{data}</p>
      <div className="flex">
        <button className="mx-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" onClick={() => {
            //navigate("");
            window.open('https://acc.ceyinfo.cloud/dashboard');
        }}>
          Account app
        </button>

        <button className="mx-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" onClick={() => {
            //navigate("");
            window.open('https://acc.ceyinfo.cloud/dashboard');
        }}>
          HR app
        </button>

        <button className="mx-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" onClick={() => {
            //navigate("");
            window.open('https://acc.ceyinfo.cloud/dashboard');
        }}>
          Booking app
        </button>

        <button className="mx-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" onClick={() => {
            //navigate("");
            window.open('https://acc.ceyinfo.cloud/reports');
        }}>
          Reports
        </button>

        <button className="mx-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" onClick={() => {
            //navigate("");
            window.open('https://acc.ceyinfo.cloud/dashboard');
        }}>
          Admin
        </button>
      </div>

      <div className="mt-6">
        <button className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" onClick={() => {
            logout();
            navigate('');
        }}>
          Log out
        </button>
      </div>
    </div>);
}
