import { Metadata, sendUnaryData, ServerErrorResponse, ServerUnaryCall } from "@grpc/grpc-js"
import {
  Marketer,
  MarketerRequest,
  MarketersService
} from "../proto/messages"
import { MarketerModel } from "./models"


export const getMarketer = async (
  call: ServerUnaryCall<MarketerRequest, Marketer>,
  callback: sendUnaryData<Marketer>
) => {
  const user = await MarketerModel.findById(call.request.id)
  if (!user) {
    const error: ServerErrorResponse = {
      message: `This ${call.request.id} is not founded`,
      name: "Not Founded Content",
      code: 404,
      details: `This ${call.request.id} is not founded`,
      metadata: new Metadata(),
      stack: `This ${call.request.id} is not founded`,
    }
    callback(error, null)
  }

  callback(null, user)
}
