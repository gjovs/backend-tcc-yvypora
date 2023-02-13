import * as grpc from '@grpc/grpc-js';
import { ServerCredentials } from '@grpc/grpc-js';
import serverConfigs from '../configs/server';
import { MarketersService } from '../proto/messages';
import {
getMarketer
} from './implementations'

const proto = grpc.loadPackageDefinition(serverConfigs.packageDefinitions);

const server = new grpc.Server();

server.addService(MarketersService,  {
    getMarketer: getMarketer
});


server.bindAsync('localhost:3333', ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.log(err)
    }
    console.log(`FIRST MOTHERFUCKING MICROSSERVICE RUNNING ${port}`)
  });

// server.start();
