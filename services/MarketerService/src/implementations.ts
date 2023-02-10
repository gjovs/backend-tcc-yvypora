import {
  ServerUnaryCall,
  sendUnaryData,
  ServiceError,
  ServerWritableStream,
} from 'grpc';

import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { IMarketersServer } from '../proto/messages_grpc_pb';
import { Marketer, MarketerRequest } from '../proto/messages_pb';

// model
import { MarketerModel } from './models';

class ServiceImplementations implements IMarketersServer {
  async getMarketer(call: ServerUnaryCall<MarketerRequest>, callback: sendUnaryData<Marketer>): Promise<void> {
    const id = call.request.getId();
    const res = await MarketerModel.findById(id);

    if (!res) {
      const error: ServiceError = {
        name: 'Marketer Missing',
        message: `Marketer with ID ${id} does not exist.`,
      };
      callback(error, null);
    }

    // @ts-ignore
    callback(null, res);
  }

  async getMarketers(call: ServerWritableStream<Empty, Marketer>): Promise<void> {
    const marketers = await MarketerModel.findAll();

    marketers.forEach((marketer) => {
      call.write(marketer);
    });

    call.end();
  }
}

export default new ServiceImplementations();
