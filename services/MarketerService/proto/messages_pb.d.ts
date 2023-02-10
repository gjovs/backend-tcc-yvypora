// package: marketer
// file: messages.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Marketer extends jspb.Message { 
    getId(): string;
    setId(value: string): Marketer;

    getEmail(): string;
    setEmail(value: string): Marketer;

    getName(): string;
    setName(value: string): Marketer;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Marketer.AsObject;
    static toObject(includeInstance: boolean, msg: Marketer): Marketer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Marketer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Marketer;
    static deserializeBinaryFromReader(message: Marketer, reader: jspb.BinaryReader): Marketer;
}

export namespace Marketer {
    export type AsObject = {
        id: string,
        email: string,
        name: string,
    }
}

export class MarketerRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): MarketerRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MarketerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MarketerRequest): MarketerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MarketerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MarketerRequest;
    static deserializeBinaryFromReader(message: MarketerRequest, reader: jspb.BinaryReader): MarketerRequest;
}

export namespace MarketerRequest {
    export type AsObject = {
        id: number,
    }
}
