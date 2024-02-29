// grpc_tools_node_protoc --js_out=import_style=commonjs,binary:static_codegen/test --grpc_out=static_codegen/test --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` protos/helloworld.proto;
// protoc --js_out=import_style=commonjs,binary:static_codegen/test --grpc_out=static_codegen/test --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` protos/helloworld.proto;

let grpc = require("@grpc/grpc-js");
let messages = require("./protos/helloworld_pb");
let services = require("./protos/helloworld_grpc_pb");

const main = () => {
    let client = new services.GreeterClient("localhost:50051",
        grpc.credentials.createInsecure());

    let request = new messages.HelloRequest();

    let user;
    if (process.argv.length >= 3) {
        user = process.argv[2];
    } else {
        user = "world"
    }
    request.setName(user);
    client.sayHello(request, (err, response) => {
        if (!err) {
            console.log("Greeter", response.getMessage() + " !");
        } else {
            console.error(err);
        }
    })
}
main()
