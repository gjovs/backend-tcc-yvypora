import { FastifyInstance, FastifyRequest } from "fastify";
import Marketer from "../model/Marketer";
import axios from "axios";
import address from '../utils/interfaces/address.interface'

export default async function fairPlugin(server: FastifyInstance) {
    // TODO add an new fair to marketer
    server.put("/add/:id", {
        // @ts-ignore
        onRequest: [server.auth],
        schema: {
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' }
                }
            }
        }
    }, async (req: FastifyRequest<{
        Params: {
            fairId: string
        }
    }>, rep) => {
        // @ts-ignore
        const { id } = req.user.payload
        const { fairId } = req.params

        const res = await Marketer.addFair(parseInt(id), parseInt(fairId))

        if (res?.error) {
            // @ts-ignore
            return rep.status(res?.code).send({
                error: true,
                cause: res.message,
            });
        }

        return rep.send({
            code: 200,
            payload: res?.data,
            error: false
        })
    })

    server.delete("/remove/:id", {
        // @ts-ignore
        onRequest: [server.auth],
        schema: {
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' }
                }
            }
        }
    }, async (req: FastifyRequest<{
        Params: {
            fairId: string
        }

    }>, rep) => {
        // @ts-ignore
        const { id } = req.user.payload
        const { fairId } = req.params

        const res = await Marketer.removeFair(parseInt(id), parseInt(fairId))

        if (res?.error) {
            // @ts-ignore
            return rep.status(res?.code).send({
                error: true,
                cause: res.message,
            });
        }

        return rep.send({
            code: 200,
            payload: res?.message,
            error: false
        })
    })

    server.post("/", {
        schema: {
            body: {
                type: 'object',
                required: ['dateAndHourOfWork', 'address'],
                properties: {
                    dateAndHourOfWork: {
                        type: 'array',
                        maxItems: 7,
                        items: {
                            type: 'object',
                            required: ['open', 'close', 'dayOfWeek'],
                            properties: {
                                open: {
                                    type: 'integer'
                                },
                                close: {
                                    type: 'integer'
                                },
                                dayOfWeek: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer' },
                                        name: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    address: {
                        type: 'object',
                        required: ['cep', 'number', 'complemento', 'addressTypeId'],
                        properties: {
                            cep: {
                                type: 'string',
                            },
                            number: {
                                type: 'number',
                            },
                            complemento: {
                                type: 'string',
                            },
                            addressTypeId: {
                                type: 'number',
                            },
                        },
                    },

                }
            }
        }
    }, async (req: FastifyRequest<{
        Body: {
            dateAndHourOfWork: {
                open: number,
                close: number,
                dayOfWeek: {
                    name: string,
                    id: number
                }
            }[],

            address: {
                cep: number,
                complemento: string,
                addressTypeId: number,
                number: number
            }

        }
    }>, rep) => {
        const { dateAndHourOfWork, address } = req.body

        // @ts-ignore
        let addressObject: address = {}
        try {
            const addressRes: {
                data: {
                    logradouro: string,
                    complemento: string,
                    cep: string,
                    bairro: string,
                    localidade: string,
                    uf: string
                    latitude: 0,
                    longitude: 0
                }
            } = await axios.get(`https://viacep.com.br/ws/${address.cep}/json/`)

           
            
            const addressToSearch = addressRes.data.uf + ", " + addressRes.data.localidade;

            const latAndLonRes: {
                data: {
                    lat: string,
                    lon: string
                }
            } = await axios.get(`https://nominatim.openstreetmap.org/search?country=Brazil&q=${addressToSearch}&format=json&limit=1`)


            addressObject.latitude = parseFloat(latAndLonRes.data.lat)
            addressObject.longitude = parseFloat(latAndLonRes.data.lon)

            addressObject.city = addressRes.data.localidade
            addressObject.cep = addressRes.data.cep
            addressObject.neighborhood = addressRes.data.bairro
            addressObject.uf = addressRes.data.uf
            addressObject.latitude = addressRes.data.latitude
            addressObject.longitude = addressRes.data.longitude

        } catch (e) {s
            console.log(e);
            return rep.code(400).send({
                error: true,
                message: "This CEP value cant be search, probably is wrong!"
            })
        }


        const data = { address: addressObject, }


    })


}