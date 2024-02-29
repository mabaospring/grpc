// grpc_tools_node_protoc --js_out=import_style=commonjs,binary:static_codegen/test --grpc_out=static_codegen/test --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` protos/helloworld.proto;
// protoc --js_out=import_style=commonjs,binary:static_codegen/test --grpc_out=static_codegen/test --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` protos/helloworld.proto;

let grpc = require("@grpc/grpc-js");
let messages = require("./protos/helloworld_pb");
let services = require("./protos/helloworld_grpc_pb");

function sayHello(call, callback) {
    let response = new messages.HelloReply();
    response.setMessage("Hello " + call.request.getName());
    callback(null, response);
}

function sayHelloAgain(call, callback) {
    let response = new messages.HelloReply();
    response.setMessage("Hello Again" + call.request.getName());
    callback(null, response);
}

function main() {
    let server = new grpc.Server();
    server.addService(services.GreeterService, {
        sayHello: sayHello,
        sayHelloAgain: sayHelloAgain
    });

    server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error("Failded to bind ", err);
        }
        console.log("Server is running on port", port);
    })
}

main()