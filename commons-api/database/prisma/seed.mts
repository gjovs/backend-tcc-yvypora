import { PrismaClient } from "@prisma/client";
const db = new PrismaClient()

async function createImage() {
    await db.image.createMany({
        data: [
            { uri: "teste" },
            { uri: "teste 2" }
        ]
    })
}

await createImage()

async function createPaymentMethod() {
    await db.payment_method.createMany({
        data: [
            { name: "PIX" },
            { name: "Cartao de Debito" },
            { name: "Cartao de Credito" },
            { name: "Boleto" },
        ]
    })
}

await createPaymentMethod()

async function createVeicule() {
    await db.veicule.createMany({
        data: [
            { name: "Moto" },
            { name: "A pe" },
            { name: "Carro" },
            { name: "Bicicleta" },

        ]
    })
}

await createVeicule()

async function createAddressType() {
    await db.address_type.createMany({
        data: [
            { name: "Casa" },
            { name: "Apartamento" },
            { name: "Feira" }
        ]
    })
}

await createAddressType()


async function createAddress() {
    await db.address.createMany({
        data: [
            {
                CEP: 0o6233250,
                logradouro: "Rua sao pedro Osasco Sp",
                number: 146,
                address_typeId: 1
            },
            {
                CEP: 0o6233250,
                logradouro: "Rua sao pedro Osasco Sp",
                number: 147,
                address_typeId: 1
            },
            {
                CEP: 0o6233250,
                logradouro: "Condominio agacias",
                number: 52,
                address_typeId: 2
            },
        ]
    })
}

await createAddress()

async function createCostumer() {
    await db.costumer.createMany({
        data: [
            {
                email: "00drpixelss@gmail.com",
                name: "Guilherme Joviniano de Sousa",
                password_hash: "teste de hash",
            },
            {
                email: "segundo_email@gmail.com",
                name: "segundo nome",
                password_hash: "teste de hash",
            },
        ]
    })
}

await createCostumer()

async function createCostumerAddress() {
    await db.costumer_addresses.createMany({
        data: [
            {
                addressId: 1,
                costumerId: 1
            },
            {
                addressId: 2,
                costumerId: 1
            },
            {
                addressId: 3,
                costumerId: 2
            }
        ]
    })
}

await createCostumerAddress()


async function createLocation() {
    await db.location.createMany({
        data: [
            {
                latitude: 123123,
                longitude: 123123
            },
            {
                latitude: 123123,
                longitude: 123123
            },
            {
                latitude: 123123,
                longitude: 123123
            },
        ]
    })
}

await createLocation()

async function createMarketer() {
    await db.marketer.createMany({
        data: [
            {
                email: "feirante1@gmai.com",
                name: "zé da fruta",
                password_hash: "asdasd",
                locationId: 1,
                review: 0.0
            },
            {
                email: "feirante2@gmai.com",
                name: "zé da fruta 2",
                password_hash: "asdasd",
                locationId: 2,
                review: 0.0
            },
            {
                email: "feirante3@gmai.com",
                name: "zé da fruta 3",
                password_hash: "asdasd",
                locationId: 3,
                review: 0.0
            },
        ]
    })
}


await createMarketer()

async function createFair() {
    await db.fair.create({
        data: {
            address: {
                create: {
                    CEP: 0o6233252,
                    logradouro: "Rua da feira 1 Sp",
                    number: 146,
                    address_typeId: 3
                }
            }
        }
    })

    await db.fair.create({
        data: {
            address: {
                create: {
                    CEP: 0o6233252,
                    logradouro: "Rua da feira 2 Sp",
                    number: 146,
                    address_typeId: 3
                }
            }
        }
    })

    await db.fair.create({
        data: {
            address: {
                create: {
                    CEP: 0o6233252,
                    logradouro: "Rua da feira 3 Sp",
                    number: 146,
                    address_typeId: 3
                }
            }
        }
    })


}

await createFair()

async function createDaysOfWeek() {
    await db.day_of_week.createMany({
        data: [
            {
                name: "SEGUNDA-FEIRA",
            },
            {
                name: "TERÇA-FEIRA",
            },
            {
                name: "QUARTA-FEIRA",
            },
            {
                name: "QUINTA-FEIRA",
            },
            {
                name: "SEXTA-FEIRA",
            },
            {
                name: "SABADO",
            },
            {
                name: "DOMINGO",
            },

        ]
    })
}

await createDaysOfWeek()

async function createDateAndHourOfWork() {
    const open = new Date("2023-02-08T07:30:00.000Z")
    const close = new Date("2023-02-08T14:30:00.000Z")
    await db.date_and_hour_of_work.create({
        data:
        {
            day_of_weekId: 3,
            open_datetime: open,
            close_datetime: close,
        }

    })
}

await createDateAndHourOfWork()

async function createFairWithDateAndHourOfWork() {
    await db.fair_date_hour_of_work.createMany({
        data: [
            {
                fairId: 1,
                date_and_hour_of_workId: 1
            },
            {
                fairId: 1,
                date_and_hour_of_workId: 1
            },
            {
                fairId: 2,
                date_and_hour_of_workId: 1
            },
            {
                fairId: 3,
                date_and_hour_of_workId: 1
            }

        ]
    })
}

await createFairWithDateAndHourOfWork()

async function createFairsInMarkets() {
    await db.fair_marketers.createMany({
        data: [
            {
                fairId: 1,
                marketerId: 1,
            },
            {
                fairId: 1,
                marketerId: 1
            },
            {
                fairId: 3,
                marketerId: 2
            },
            {
                marketerId: 3,
                fairId: 3
            }
        ]
    })
}

await createFairsInMarkets()

async function createProduct() {
    await db.product.createMany({
        data: [
            {
                available_quantity: 100,
                name: "Maça",
                marketerId: 1,
                price: 2,
            },
            {
                available_quantity: 50,
                name: "Maça",
                marketerId: 1,
                price: 2,
            },
            {
                available_quantity: 200,
                name: "Maça",
                marketerId: 2,
                price: 2,
            },
            {
                available_quantity: 24,
                name: "Banana",
                marketerId: 3,
                price: 8.50,
            }
        ]
    })
}

await createProduct()

async function createShoppingList() {
    await db.shopping_list.createMany({
        data: [
            {
                costumerId: 1,
                total: 100,
                freight: 20,
            },
            {
                costumerId: 2,
                total: 17.0,
                freight: 20,
            }

        ]
    })
}

await createShoppingList()

async function createShoppingListWithProduct() {
    await db.products_in_shopping_list.createMany({
        data: [
            {
                shopping_listId: 1,
                productId: 1
            },
            {
                shopping_listId: 1,
                productId: 3
            },
            {
                shopping_listId: 2,
                productId: 2
            },
        ]
    })
}

await createShoppingListWithProduct()


async function appendImagesInProduct() {
    await db.image_of_product.createMany({
        data: [{
            imageId: 1,
            productId: 1
        }, {
            imageId: 2,
            productId: 2
        }]
    })
}

await appendImagesInProduct()


async function createDeliveryFeatures() {
    await db.order.create({
        data: {
            shopping_list: {
                connect: {
                    id: 1
                }
            },
            costumer_addresses: {
                connect: {
                    id: 1
                }
            },
            payment: {
                create: {
                    payment_methodId: 1,
                    details: "asdad",
                    status: true,
                }
            },
            deliveryman: {
                create: {
                    name: "DJ BOY",
                    email: "deliveyman@gmai.com",
                    password_hash: "asdasd",
                    picture_uri: "asddad",
                    location: {
                        create: {
                            latitude: 123123,
                            longitude: 13213123,
                        }
                    }
                }
            },
        }
    })
}

await createDeliveryFeatures()



