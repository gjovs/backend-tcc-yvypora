import * as grpc from 'grpc';
import { ServerCredentials } from 'grpc';
import serverConfigs from '../configs/server';
import { MarketersService } from '../proto/messages_grpc_pb';
import implementations from './implementations';

const proto = grpc.loadPackageDefinition(serverConfigs.packageDefinitions);

const server = new grpc.Server();

server.addService(MarketersService, implementations);
server.bind('localhost:3333', ServerCredentials.createInsecure());
server.start();
