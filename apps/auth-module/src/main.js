"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
require("./index.css");
const page_1 = require("./app/page");
const react_query_1 = require("@tanstack/react-query");
const queryClient = new react_query_1.QueryClient();
(0, client_1.createRoot)(document.getElementById('root')).render(<react_1.StrictMode>
    <react_query_1.QueryClientProvider client={queryClient}>
      <page_1.default />
    </react_query_1.QueryClientProvider>
  </react_1.StrictMode>);
