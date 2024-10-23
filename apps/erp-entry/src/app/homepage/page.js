"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const axios_1 = require("axios");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
function HomePage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [data, setData] = (0, react_1.useState)('');
    const getData = async () => {
        const response = await axios_1.default.get('http://localhost:10000/getData', {
            withCredentials: true, // This ensures cookies are sent with the request
        });
        console.log('first');
        setData(response.data);
    };
    (0, react_1.useEffect)(() => {
        getData();
    }, []);
    return (<div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-green-500  to-white-500">
      <h1 className="text-6xl font-extrabold text-white mb-10">Ceyinfo ERP</h1>
      {/* <p>{data}</p> */}
      <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl" onClick={() => {
            navigate('login');
        }}>
        Login
      </button>
    </div>);
}
