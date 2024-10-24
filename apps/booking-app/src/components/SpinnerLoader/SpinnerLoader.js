"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function SpinnerLoader() {
    const [text, setText] = (0, react_1.useState)('');
    const [showImage, setShowImage] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            setShowImage(false);
            setText('i waited to 3 sec to load');
        }, 3000);
    }, []);
    return (<div>
      {showImage ? (<div className="items-center justify-center">
          <img src="./loading.svg"/>
        </div>) : (<h3>Text</h3>)}
    </div>);
}
exports.default = SpinnerLoader;
