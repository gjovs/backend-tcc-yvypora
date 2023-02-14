import { Metadata, sendUnaryData, ServerErrorResponse, ServerUnaryCall } from "@grpc/grpc-js"
import { RegisterCostumerRequest, Costumer } from "../proto/register"
import { CostumerModel} from "./models"

export const registerCostumer = async (
  call: ServerUnaryCall<RegisterCostumerRequest, Costumer>,
  callback: sendUnaryData<Costumer>
) => {
  const {
    name,
    email, 
    password,
    address
  } = call.request 
  const data: Costumer = {
    id: -1, name, email, password, address
  }

  if (call.request.profileUri)  data.pictureUri = call.request.profileUri
  
  const res = await CostumerModel.createCostumer(data);
  
  if (res?.error) {
      
  }

  return callback(null, res)
}