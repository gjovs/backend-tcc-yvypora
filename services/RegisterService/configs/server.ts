import { resolve } from 'path';

import * as protoLoader from '@grpc/proto-loader';

export default {
  packageDefinitions:
    protoLoader.loadSync(resolve(__dirname, '..', 'proto', 'messages.proto'), {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    }),
};
