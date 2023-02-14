/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "registerPackage";

export interface Address {
  CEP: number;
  number: number;
  additionalInformation: string;
  addresTypeId: number;
}

export interface RegisterCostumerRequest {
  name: string;
  email: string;
  password: string;
  address: Address | undefined;
  pictureUri?: string | undefined;
}

export interface Costumer {
  id: number;
  name: string;
  email: string;
  password: string;
  address: Address | undefined;
  pictureUri?: string | undefined;
}

function createBaseAddress(): Address {
  return { CEP: 0, number: 0, additionalInformation: "", addresTypeId: 0 };
}

export const Address = {
  encode(message: Address, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.CEP !== 0) {
      writer.uint32(8).int32(message.CEP);
    }
    if (message.number !== 0) {
      writer.uint32(16).int32(message.number);
    }
    if (message.additionalInformation !== "") {
      writer.uint32(26).string(message.additionalInformation);
    }
    if (message.addresTypeId !== 0) {
      writer.uint32(32).int32(message.addresTypeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Address {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.CEP = reader.int32();
          break;
        case 2:
          message.number = reader.int32();
          break;
        case 3:
          message.additionalInformation = reader.string();
          break;
        case 4:
          message.addresTypeId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Address {
    return {
      CEP: isSet(object.CEP) ? Number(object.CEP) : 0,
      number: isSet(object.number) ? Number(object.number) : 0,
      additionalInformation: isSet(object.additionalInformation) ? String(object.additionalInformation) : "",
      addresTypeId: isSet(object.addresTypeId) ? Number(object.addresTypeId) : 0,
    };
  },

  toJSON(message: Address): unknown {
    const obj: any = {};
    message.CEP !== undefined && (obj.CEP = Math.round(message.CEP));
    message.number !== undefined && (obj.number = Math.round(message.number));
    message.additionalInformation !== undefined && (obj.additionalInformation = message.additionalInformation);
    message.addresTypeId !== undefined && (obj.addresTypeId = Math.round(message.addresTypeId));
    return obj;
  },

  create<I extends Exact<DeepPartial<Address>, I>>(base?: I): Address {
    return Address.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Address>, I>>(object: I): Address {
    const message = createBaseAddress();
    message.CEP = object.CEP ?? 0;
    message.number = object.number ?? 0;
    message.additionalInformation = object.additionalInformation ?? "";
    message.addresTypeId = object.addresTypeId ?? 0;
    return message;
  },
};

function createBaseRegisterCostumerRequest(): RegisterCostumerRequest {
  return { name: "", email: "", password: "", address: undefined, pictureUri: undefined };
}

export const RegisterCostumerRequest = {
  encode(message: RegisterCostumerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(34).string(message.password);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(42).fork()).ldelim();
    }
    if (message.pictureUri !== undefined) {
      writer.uint32(50).string(message.pictureUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterCostumerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterCostumerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.password = reader.string();
          break;
        case 5:
          message.address = Address.decode(reader, reader.uint32());
          break;
        case 6:
          message.pictureUri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterCostumerRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
      address: isSet(object.address) ? Address.fromJSON(object.address) : undefined,
      pictureUri: isSet(object.pictureUri) ? String(object.pictureUri) : undefined,
    };
  },

  toJSON(message: RegisterCostumerRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    message.address !== undefined && (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    message.pictureUri !== undefined && (obj.pictureUri = message.pictureUri);
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterCostumerRequest>, I>>(base?: I): RegisterCostumerRequest {
    return RegisterCostumerRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RegisterCostumerRequest>, I>>(object: I): RegisterCostumerRequest {
    const message = createBaseRegisterCostumerRequest();
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.address = (object.address !== undefined && object.address !== null)
      ? Address.fromPartial(object.address)
      : undefined;
    message.pictureUri = object.pictureUri ?? undefined;
    return message;
  },
};

function createBaseCostumer(): Costumer {
  return { id: 0, name: "", email: "", password: "", address: undefined, pictureUri: undefined };
}

export const Costumer = {
  encode(message: Costumer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(34).string(message.password);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(42).fork()).ldelim();
    }
    if (message.pictureUri !== undefined) {
      writer.uint32(50).string(message.pictureUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Costumer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCostumer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.password = reader.string();
          break;
        case 5:
          message.address = Address.decode(reader, reader.uint32());
          break;
        case 6:
          message.pictureUri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Costumer {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
      address: isSet(object.address) ? Address.fromJSON(object.address) : undefined,
      pictureUri: isSet(object.pictureUri) ? String(object.pictureUri) : undefined,
    };
  },

  toJSON(message: Costumer): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    message.address !== undefined && (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    message.pictureUri !== undefined && (obj.pictureUri = message.pictureUri);
    return obj;
  },

  create<I extends Exact<DeepPartial<Costumer>, I>>(base?: I): Costumer {
    return Costumer.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Costumer>, I>>(object: I): Costumer {
    const message = createBaseCostumer();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.address = (object.address !== undefined && object.address !== null)
      ? Address.fromPartial(object.address)
      : undefined;
    message.pictureUri = object.pictureUri ?? undefined;
    return message;
  },
};

export type RegisterServiceService = typeof RegisterServiceService;
export const RegisterServiceService = {
  registerCostumer: {
    path: "/registerPackage.RegisterService/registerCostumer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RegisterCostumerRequest) => Buffer.from(RegisterCostumerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RegisterCostumerRequest.decode(value),
    responseSerialize: (value: Costumer) => Buffer.from(Costumer.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Costumer.decode(value),
  },
} as const;

export interface RegisterServiceServer extends UntypedServiceImplementation {
  registerCostumer: handleUnaryCall<RegisterCostumerRequest, Costumer>;
}

export interface RegisterServiceClient extends Client {
  registerCostumer(
    request: RegisterCostumerRequest,
    callback: (error: ServiceError | null, response: Costumer) => void,
  ): ClientUnaryCall;
  registerCostumer(
    request: RegisterCostumerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Costumer) => void,
  ): ClientUnaryCall;
  registerCostumer(
    request: RegisterCostumerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Costumer) => void,
  ): ClientUnaryCall;
}

export const RegisterServiceClient = makeGenericClientConstructor(
  RegisterServiceService,
  "registerPackage.RegisterService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): RegisterServiceClient;
  service: typeof RegisterServiceService;
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
