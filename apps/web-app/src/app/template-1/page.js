"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const home_page_1 = __importDefault(require("./_component/home-page"));
const axios_1 = __importDefault(require("axios"));
const about_us_page_1 = __importDefault(require("./_component/about-us-page"));
const service_page_1 = __importDefault(require("./_component/service-page"));
const room_page_1 = __importDefault(require("./_component/room-page"));
const contact_page_1 = __importDefault(require("./_component/contact-page"));
const footer_page_1 = __importDefault(require("./_component/footer-page"));
function Template1() {
    const [data, setData] = (0, react_1.useState)([]); // Initialize state with null
    const [image, setImage] = (0, react_1.useState)([]); // Initialize state with null
    const getData = async () => {
        const response = await axios_1.default.get('http://localhost:4000/getData');
        setData(response.data.rows);
        console.log('first11', response.data.rows);
    };
    const getImage = async () => {
        const response = await axios_1.default.get('http://localhost:4000/getImage');
        setImage(response.data);
        console.log('tttttttttttt', response);
    };
    (0, react_1.useEffect)(() => {
        getData();
        getImage();
    }, []);
    return (<div className="w-full">
      <home_page_1.default data={data} image={image}></home_page_1.default>
      <about_us_page_1.default data={data} image={image}></about_us_page_1.default>
      <service_page_1.default data={data} image={image}></service_page_1.default>
      <room_page_1.default data={data} image={image}></room_page_1.default>
      <contact_page_1.default data={data}></contact_page_1.default>
      <footer_page_1.default data={data}></footer_page_1.default>
    </div>);
}
exports.default = Template1;
