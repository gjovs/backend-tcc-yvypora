/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientReadableStream,
  ClientUnaryCall,
  handleServerStreamingCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";
import { Empty } from "../google/protobuf/empty";

export const protobufPackage = "marketer";

export interface Marketer {
  id: string;
  email: string;
  name: string;
}

export interface MarketerRequest {
  id: number;
}

function createBaseMarketer(): Marketer {
  return { id: "", email: "", name: "" };
}

export const Marketer = {
  encode(message: Marketer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Marketer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.email = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Marketer {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      email: isSet(object.email) ? String(object.email) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: Marketer): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.email !== undefined && (obj.email = message.email);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<Marketer>, I>>(base?: I): Marketer {
    return Marketer.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Marketer>, I>>(object: I): Marketer {
    const message = createBaseMarketer();
    message.id = object.id ?? "";
    message.email = object.email ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMarketerRequest(): MarketerRequest {
  return { id: 0 };
}

export const MarketerRequest = {
  encode(message: MarketerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarketerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MarketerRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MarketerRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  create<I extends Exact<DeepPartial<MarketerRequest>, I>>(base?: I): MarketerRequest {
    return MarketerRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MarketerRequest>, I>>(object: I): MarketerRequest {
    const message = createBaseMarketerRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

export type MarketersService = typeof MarketersService;
export const MarketersService = {
  getMarketer: {
    path: "/marketer.Marketers/GetMarketer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: MarketerRequest) => Buffer.from(MarketerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => MarketerRequest.decode(value),
    responseSerialize: (value: Marketer) => Buffer.from(Marketer.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Marketer.decode(value),
  },
  getMarketers: {
    path: "/marketer.Marketers/GetMarketers",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: Marketer) => Buffer.from(Marketer.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Marketer.decode(value),
  },
} as const;

export interface MarketersServer extends UntypedServiceImplementation {
  getMarketer: handleUnaryCall<MarketerRequest, Marketer>;
  getMarketers: handleServerStreamingCall<Empty, Marketer>;
}

export interface MarketersClient extends Client {
  getMarketer(
    request: MarketerRequest,
    callback: (error: ServiceError | null, response: Marketer) => void,
  ): ClientUnaryCall;
  getMarketer(
    request: MarketerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Marketer) => void,
  ): ClientUnaryCall;
  getMarketer(
    request: MarketerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Marketer) => void,
  ): ClientUnaryCall;
  getMarketers(request: Empty, options?: Partial<CallOptions>): ClientReadableStream<Marketer>;
  getMarketers(request: Empty, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<Marketer>;
}

export const MarketersClient = makeGenericClientConstructor(MarketersService, "marketer.Marketers") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): MarketersClient;
  service: typeof MarketersService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
