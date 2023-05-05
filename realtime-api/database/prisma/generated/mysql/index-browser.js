
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.12.0
 * Query Engine version: 659ef412370fa3b41cd7bf6e94587c1dfb7f67e7
 */
Prisma.prismaVersion = {
  client: "4.12.0",
  engine: "659ef412370fa3b41cd7bf6e94587c1dfb7f67e7"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AddressScalarFieldEnum = makeEnum({
  id: 'id',
  cep: 'cep',
  logradouro: 'logradouro',
  number: 'number',
  created_at: 'created_at',
  updated_at: 'updated_at',
  address_typeId: 'address_typeId',
  complemento: 'complemento',
  cityId: 'cityId',
  uFId: 'uFId',
  neighborhoodId: 'neighborhoodId',
  locationId: 'locationId'
});

exports.Prisma.Address_typeScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.Category_of_productScalarFieldEnum = makeEnum({
  id: 'id',
  imageId: 'imageId',
  name: 'name'
});

exports.Prisma.CityScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name'
});

exports.Prisma.CostumerScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  email: 'email',
  password_hash: 'password_hash',
  picture_uri: 'picture_uri',
  created_at: 'created_at',
  updated_at: 'updated_at',
  genderId: 'genderId',
  birthday: 'birthday',
  cpf: 'cpf'
});

exports.Prisma.Costumer_addressesScalarFieldEnum = makeEnum({
  id: 'id',
  addressId: 'addressId',
  costumerId: 'costumerId',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.Date_and_hour_of_workScalarFieldEnum = makeEnum({
  id: 'id',
  open_datetime: 'open_datetime',
  close_datetime: 'close_datetime',
  created_at: 'created_at',
  updated_at: 'updated_at',
  day_of_weekId: 'day_of_weekId'
});

exports.Prisma.Day_of_weekScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.DeliverymanScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  email: 'email',
  password_hash: 'password_hash',
  picture_uri: 'picture_uri',
  locationId: 'locationId',
  online: 'online',
  created_at: 'created_at',
  updated_at: 'updated_at',
  genderId: 'genderId',
  birthday: 'birthday'
});

exports.Prisma.FairScalarFieldEnum = makeEnum({
  name: 'name',
  id: 'id',
  review: 'review',
  addressId: 'addressId',
  created_at: 'created_at',
  updated_at: 'updated_at',
  locationId: 'locationId'
});

exports.Prisma.Fair_date_hour_of_workScalarFieldEnum = makeEnum({
  id: 'id',
  fairId: 'fairId',
  date_and_hour_of_workId: 'date_and_hour_of_workId',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.Fair_marketersScalarFieldEnum = makeEnum({
  id: 'id',
  fairId: 'fairId',
  marketerId: 'marketerId',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.GenderScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.ImageScalarFieldEnum = makeEnum({
  id: 'id',
  uri: 'uri',
  created_at: 'created_at',
  updated_at: 'updated_at',
  fairId: 'fairId'
});

exports.Prisma.Image_of_productScalarFieldEnum = makeEnum({
  id: 'id',
  imageId: 'imageId',
  productId: 'productId',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.LocationScalarFieldEnum = makeEnum({
  id: 'id',
  longitude: 'longitude',
  latitude: 'latitude',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.MarketerScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  email: 'email',
  password_hash: 'password_hash',
  picture_uri: 'picture_uri',
  review: 'review',
  online: 'online',
  locationId: 'locationId',
  created_at: 'created_at',
  birthday: 'birthday',
  updated_at: 'updated_at',
  genderId: 'genderId',
  cnpj: 'cnpj',
  cpf: 'cpf',
  phone: 'phone',
  tent_name: 'tent_name'
});

exports.Prisma.NeighborhoodScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name'
});

exports.Prisma.OrderScalarFieldEnum = makeEnum({
  id: 'id',
  accepted_status: 'accepted_status',
  delivered_status_for_client: 'delivered_status_for_client',
  retreat_products_status: 'retreat_products_status',
  deliverymanId: 'deliverymanId',
  shopping_listId: 'shopping_listId',
  created_at: 'created_at',
  updated_at: 'updated_at',
  costumer_addressesId: 'costumer_addressesId',
  intent_payment_id: 'intent_payment_id'
});

exports.Prisma.PaymentScalarFieldEnum = makeEnum({
  id: 'id',
  status: 'status',
  details: 'details',
  payment_methodId: 'payment_methodId',
  orderId: 'orderId',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.Payment_methodScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.ProductScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  price: 'price',
  quantity: 'quantity',
  review: 'review',
  active_for_selling: 'active_for_selling',
  available_quantity: 'available_quantity',
  marketerId: 'marketerId',
  created_at: 'created_at',
  updated_at: 'updated_at',
  description: 'description',
  category_of_productId: 'category_of_productId',
  type_of_productId: 'type_of_productId'
});

exports.Prisma.Products_in_shopping_listScalarFieldEnum = makeEnum({
  id: 'id',
  shopping_listId: 'shopping_listId',
  productId: 'productId',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.Sale_offScalarFieldEnum = makeEnum({
  id: 'id',
  value: 'value',
  productId: 'productId'
});

exports.Prisma.Shopping_listScalarFieldEnum = makeEnum({
  id: 'id',
  freight: 'freight',
  total: 'total',
  costumerId: 'costumerId',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Type_of_priceScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name'
});

exports.Prisma.UfScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name'
});

exports.Prisma.VeiculeScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at'
});

exports.Prisma.Veicule_deliverymanScalarFieldEnum = makeEnum({
  id: 'id',
  veiculeId: 'veiculeId',
  deliverymanId: 'deliverymanId',
  created_at: 'created_at',
  updated_at: 'updated_at'
});


exports.Prisma.ModelName = makeEnum({
  costumer: 'costumer',
  deliveryman: 'deliveryman',
  veicule_deliveryman: 'veicule_deliveryman',
  payment: 'payment',
  order: 'order',
  shopping_list: 'shopping_list',
  products_in_shopping_list: 'products_in_shopping_list',
  product: 'product',
  marketer: 'marketer',
  fair: 'fair',
  fair_marketers: 'fair_marketers',
  costumer_addresses: 'costumer_addresses',
  location: 'location',
  address: 'address',
  address_type: 'address_type',
  veicule: 'veicule',
  image_of_product: 'image_of_product',
  image: 'image',
  payment_method: 'payment_method',
  fair_date_hour_of_work: 'fair_date_hour_of_work',
  date_and_hour_of_work: 'date_and_hour_of_work',
  day_of_week: 'day_of_week',
  gender: 'gender',
  city: 'city',
  neighborhood: 'neighborhood',
  uf: 'uf',
  category_of_product: 'category_of_product',
  sale_off: 'sale_off',
  type_of_price: 'type_of_price'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
