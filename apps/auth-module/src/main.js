"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
require("./index.css");
const page_1 = __importDefault(require("./app/page"));
const react_query_1 = require("@tanstack/react-query");
// import 'core-js/actual/object/group-by'
const queryClient = new react_query_1.QueryClient();
(0, client_1.createRoot)(document.getElementById('root')).render(<react_1.StrictMode>
    <react_query_1.QueryClientProvider client={queryClient}>
      <page_1.default />
    </react_query_1.QueryClientProvider>
  </react_1.StrictMode>);
