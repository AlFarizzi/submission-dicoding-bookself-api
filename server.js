const hapi = require("@hapi/hapi");
const router = require("./util/router");

const init = async() => {
    const server = hapi.server({
        port:3000,
        host: "localhost"
    })
    
    // Router
    server.route(router)

    // Start Server
    await server.start();
    console.log(`server running on ${server.info.port}`);
}
init();
