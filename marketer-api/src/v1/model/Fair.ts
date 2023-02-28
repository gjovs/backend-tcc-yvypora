import db from '../libs/prisma'
import address from '../utils/interfaces/address.interface'
class Fair {
  async create(data: {
    address: address
  }) {
    try {
      const res = await db.fair.create({
        data: {
          location: { 
            create: {
              latitude: data.address.latitude,
              longitude: data.address.longitude
            }
          },

          address: {
            create: {
              CEP: data.address.cep,
              uf: {
                connectOrCreate: {
                  where: {
                    name: data.address.uf
                  },
                  create: {
                    name: data.address.uf
                  }
                }
              },
              city: {
                connectOrCreate: {
                  where: {
                    name: data.address.city
                  },
                  create: {
                    name: data.address.city
                  }
                }
              },
              neighborhood: {
                connectOrCreate: {
                  create: {
                    name: data.address.neighborhood
                  },
                  where: {
                    name: data.address.neighborhood
                  }
                }
              },
              complemento: data.address.complemento,
              type: {
                connect: { id: 3 }
              },
              number: data.address.number
            }
          }
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: error.message, code: 400 }
      }
    }
  }

  async index() {

  }

  // TODO list fair and it respective products + marketers
  async get() {

  }
}


export default new Fair()