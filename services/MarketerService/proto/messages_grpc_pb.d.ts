// package: marketer
// file: messages.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as messages_pb from "./messages_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IMarketersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getMarketer: IMarketersService_IGetMarketer;
    getMarketers: IMarketersService_IGetMarketers;
}

interface IMarketersService_IGetMarketer extends grpc.MethodDefinition<messages_pb.MarketerRequest, messages_pb.Marketer> {
    path: "/marketer.Marketers/GetMarketer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<messages_pb.MarketerRequest>;
    requestDeserialize: grpc.deserialize<messages_pb.MarketerRequest>;
    responseSerialize: grpc.serialize<messages_pb.Marketer>;
    responseDeserialize: grpc.deserialize<messages_pb.Marketer>;
}
interface IMarketersService_IGetMarketers extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, messages_pb.Marketer> {
    path: "/marketer.Marketers/GetMarketers";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<messages_pb.Marketer>;
    responseDeserialize: grpc.deserialize<messages_pb.Marketer>;
}

export const MarketersService: IMarketersService;

export interface IMarketersServer {
    getMarketer: grpc.handleUnaryCall<messages_pb.MarketerRequest, messages_pb.Marketer>;
    getMarketers: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, messages_pb.Marketer>;
}

export interface IMarketersClient {
    getMarketer(request: messages_pb.MarketerRequest, callback: (error: grpc.ServiceError | null, response: messages_pb.Marketer) => void): grpc.ClientUnaryCall;
    getMarketer(request: messages_pb.MarketerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: messages_pb.Marketer) => void): grpc.ClientUnaryCall;
    getMarketer(request: messages_pb.MarketerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: messages_pb.Marketer) => void): grpc.ClientUnaryCall;
    getMarketers(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<messages_pb.Marketer>;
    getMarketers(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<messages_pb.Marketer>;
}

export class MarketersClient extends grpc.Client implements IMarketersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getMarketer(request: messages_pb.MarketerRequest, callback: (error: grpc.ServiceError | null, response: messages_pb.Marketer) => void): grpc.ClientUnaryCall;
    public getMarketer(request: messages_pb.MarketerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: messages_pb.Marketer) => void): grpc.ClientUnaryCall;
    public getMarketer(request: messages_pb.MarketerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: messages_pb.Marketer) => void): grpc.ClientUnaryCall;
    public getMarketers(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<messages_pb.Marketer>;
    public getMarketers(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<messages_pb.Marketer>;
}
