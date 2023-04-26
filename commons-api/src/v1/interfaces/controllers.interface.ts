export interface IAddressController {
  addToCostumer(req: unknown, rep: unknown): Promise<unknown>;
  rmeoveToCostumer(req: unknown, rep: unknown): Promise<unknown>;
}

export interface ICostumerController {
  create(req: unknown, rep: unknown): Promise<unknown>;
  update(req: unknown, rep: unknown): Promise<unknown>;
  delete(req: unknown, rep: unknown): Promise<unknown>;
  listAddress(req: unknown, rep: unknown): Promise<unknown>;
}

export interface IFairController {
  listByClose(req: unknown, rep: unknown): Promise<unknown>;
}

export interface IFormFieldsController {
  listCategories(req: unknown, rep: unknown): Promise<unknown>;
  forCostumer(req: unknown, rep: unknown): Promise<unknown>;
  forMarketer(req: unknown, rep: unknown): Promise<unknown>;
  forDeliveryman(req: unknown, rep: unknown): Promise<unknown>;
  listCloseFairs(req: unknown, rep: unknown): Promise<unknown>;
}

export interface IMarketerController {
  create(req: unknown, rep: unknown): Promise<unknown>;
  update(req: unknown, rep: unknown): Promise<unknown>;
  delete(req: unknown, rep: unknown): Promise<unknown>;
}

export interface IPictureController {
  appendToUser(req: unknown, rep: unknown): Promise<unknown>;
}
