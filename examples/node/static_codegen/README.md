This is the static code generation variant of the Node examples. Code in these examples is pre-generated using protoc and the Node gRPC protoc plugin, and the generated code can be found in various `*_pb.js` files. The command line sequence for generating those files is as follows (assuming that `protoc` and `grpc_node_plugin` are present, and starting in the directory which contains this README.md file):

```sh
cd ../../protos
npm install -g grpc-tools # 全局安装生成grpc服务的插件
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../node/static_codegen/ --grpc_out=../node/static_codegen --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` helloworld.proto
```

这个命令使用了 grpc_tools_node_protoc 工具，它是针对 Node.js 的 gRPC 代码生成器。这个命令使用了 --js_out 和 --grpc_out 参数来指定生成的 JavaScript 代码的输出目录和选项。另外，--plugin 参数指定了用于生成 gRPC 代码的插件路径。

对于 protos/helloworld.proto 文件，这个命令生成了以下两个文件：

- helloworld_pb.js：这是使用 --js_out 参数生成的 Protocol Buffers 的 JavaScript 代码文件，它定义了消息类型和服务客户端。
- helloworld_grpc_pb.js：这是使用 --grpc_out 参数和 protoc-gen-grpc 插件生成的 gRPC 相关的 JavaScript 代码文件，它定义了服务端和客户端的实现。

```
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:static_codegen/test --grpc_out=static_codegen/test  protos/helloworld.proto;
# 生成message和Service两个js文件

grpc_tools_node_protoc --ts_out=static_codegen/test --grpc_out=static_codegen/test   protos/helloworld.proto;
# 生成message和Service两个*.dts文件

```

执行命令生成 js 文件头部代码 改 require('grpc') => require('@grpc/grpc-js')
同类引入都要改
