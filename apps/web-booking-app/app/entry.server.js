"use strict";
/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleRequest;
const node_stream_1 = require("node:stream");
const node_1 = require("@remix-run/node");
const react_1 = require("@remix-run/react");
const isbot_1 = require("isbot");
const server_1 = require("react-dom/server");
const ABORT_DELAY = 5_000;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, 
// This is ignored so we can keep it in the template for visibility.  Feel
// free to delete this parameter in your app if you're not using it!
// eslint-disable-next-line @typescript-eslint/no-unused-vars
loadContext) {
    return (0, isbot_1.isbot)(request.headers.get('user-agent') || '')
        ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
        : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
    return new Promise((resolve, reject) => {
        let shellRendered = false;
        const { pipe, abort } = (0, server_1.renderToPipeableStream)(<react_1.RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY}/>, {
            onAllReady() {
                shellRendered = true;
                const body = new node_stream_1.PassThrough();
                const stream = (0, node_1.createReadableStreamFromReadable)(body);
                responseHeaders.set('Content-Type', 'text/html');
                resolve(new Response(stream, {
                    headers: responseHeaders,
                    status: responseStatusCode,
                }));
                pipe(body);
            },
            onShellError(error) {
                reject(error);
            },
            onError(error) {
                responseStatusCode = 500;
                // Log streaming rendering errors from inside the shell.  Don't log
                // errors encountered during initial shell rendering since they'll
                // reject and get logged in handleDocumentRequest.
                if (shellRendered) {
                    console.error(error);
                }
            },
        });
        setTimeout(abort, ABORT_DELAY);
    });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
    return new Promise((resolve, reject) => {
        let shellRendered = false;
        const { pipe, abort } = (0, server_1.renderToPipeableStream)(<react_1.RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY}/>, {
            onShellReady() {
                shellRendered = true;
                const body = new node_stream_1.PassThrough();
                const stream = (0, node_1.createReadableStreamFromReadable)(body);
                responseHeaders.set('Content-Type', 'text/html');
                resolve(new Response(stream, {
                    headers: responseHeaders,
                    status: responseStatusCode,
                }));
                pipe(body);
            },
            onShellError(error) {
                reject(error);
            },
            onError(error) {
                responseStatusCode = 500;
                // Log streaming rendering errors from inside the shell.  Don't log
                // errors encountered during initial shell rendering since they'll
                // reject and get logged in handleDocumentRequest.
                if (shellRendered) {
                    console.error(error);
                }
            },
        });
        setTimeout(abort, ABORT_DELAY);
    });
}
