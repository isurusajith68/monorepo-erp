"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const headers_1 = require("next/headers");
function HomePage() {
    const headersList = (0, headers_1.headers)();
    const host = headersList.get('host'); // Get domain/host
    const protocol = headersList.get('x-forwarded-proto') || 'http'; // Get protocol
    const domain = `${protocol}://${host}`;
    return (<div>
      <h1>Domain: {domain}</h1>
    </div>);
}
