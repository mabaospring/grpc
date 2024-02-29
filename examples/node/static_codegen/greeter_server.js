/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

let messages = require('./helloworld_pb');
let services = require('./helloworld_grpc_pb');

let grpc = require('@grpc/grpc-js');

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
    let reply = new messages.HelloReply();
    reply.setMessage('Hello ' + call.request.getName());
    callback(null, reply);
}

function sayHelloAgain(call, callback) {
    let reply = new messages.HelloReply();
    reply.setMessage('Hello again ' + call.request.getName());
    callback(null, reply);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    let server = new grpc.Server();
    server.addService(services.GreeterService, { sayHello: sayHello, sayHelloAgain: sayHelloAgain });

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error('Failed to bind:', err);
            return;
        }
        console.log('Server running on port:', port);
    })
    // server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    // server.start();
}

main();
