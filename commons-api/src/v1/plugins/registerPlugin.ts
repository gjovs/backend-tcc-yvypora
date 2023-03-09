import { FastifyInstance, FastifyRequest } from 'fastify';
import { Costumer, Marketer } from '../models';
import { hashPassword, isValidDate } from '../utils/utils';

export default async function registerPlugin(server: FastifyInstance) {
  server.post('/costumer', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password', 'address', 'birthday'],
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          gender: {
            type: 'string',
          },
          birthday: {
            type: 'string',
          },
          address: {
            type: 'object',
            required: ['cep', 'number', 'complemento', 'addressTypeId', 'city', 'uf', 'neighborhood', 'logradouro'],
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
              city: {
                type: 'string',

              },
              logradouro: {
                type: 'string',
              },
              uf: {
                type: 'string',
              },
              neighborhood: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Body: {
      password: string,
      name: string,
      email: string,
      gender: string,
      birthday: string,
      address: {
        cep: string,
        complemento: string,
        addressTypeId: number,
        number: number,
        city: string,
        uf: string,
        neighborhood: string,
        logradouro: string
      }
    }
  }>, rep) => {
    const { body } = req;
    const {
      name, email, password, address, gender, birthday,
    } = body;

    if (!isValidDate(birthday)) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message: 'Date format to attribute birthday is wrong, need to be yyyy-mm-dd',
      });
    }

    // male Default
    let genderId = 1;

    // female id
    if (gender.toUpperCase() === 'F') genderId = 2;

    const password_hash = await hashPassword(password);

    const res = await Costumer.createCostumer({
      name, email, password: password_hash, address, gender: genderId, birthday,
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.data);
  });

  // update costumer
  server.put('/costumer/:id', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          gender: {
            type: 'string',
          },
          birthday: {
            type: 'string',
          },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Body: {
      name: string,
      email: string,
      password: string,
      gender: string,
      birthday: string
    },
    Params: {
      id: string
    }
  }>, rep) => {
    const { id } = req.params;
    const { body } = req;
    let password_hash = null;

    if (body.password) {
      password_hash = await hashPassword(body.password);
    }

    if (body.birthday) {
      if (!isValidDate(body.birthday)) {
        return rep.status(400).send({
          code: 400,
          error: true,
          message: 'Date format to attribute birthday is wrong, need to be yyyy-mm-dd',
        });
      }
    }

    let genderId = 1;

    // female id
    if (body.gender.toUpperCase() === 'F') genderId = 2;

    const res = await Costumer.updateCostumer({
      name: body.name,
      password_hash,
      email: body.email,
      id: parseInt(id, 10),
      genderId,
      birthday: body.birthday,
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.data);
  });

  server.delete('/costumer/:id', async (req: FastifyRequest<{
    Params: {
      id: string
    }
  }>, rep) => {
    const { id } = req.params;

    const exists = await Costumer.getCostumer(parseInt(id, 10));

    // @ts-ignore
    if (!exists.data) {
      return rep.status(404).send({
        error: true,
        message: 'This costumer do not exist',
      });
    }

    const res = await Costumer.deleteCostumer(parseInt(id, 10));

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }
    return rep.send(res?.data);
  });

  server.put('/costumer/address/:id', {
    schema: {
      body: {
        type: 'object',
        required: ['address'],
        properties: {
          address: {
            type: 'object',
            required: ['cep', 'number', 'complemento', 'addressTypeId', 'city', 'uf', 'neighborhood', 'logradouro'],
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
              city: {
                type: 'string',

              },
              logradouro: {
                type: 'string',
              },
              uf: {
                type: 'string',
              },
              neighborhood: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Body: {
      address: {
        cep: string,
        complemento: string,
        addressTypeId: number,
        number: number,
        city: string,
        uf: string,
        neighborhood: string,
        logradouro: string
      }
    },
    Params: {
      id: string
    }
}>, rep) => {
    const { id } = req.params;
    const { address } = req.body;

    const exists = await Costumer.getCostumer(parseInt(id, 10));

    // @ts-ignore
    if (!exists.data) {
      return rep.status(404).send({
        error: true,
        message: 'This costumer do not exist',
      });
    }

    const res = await Costumer.addNewCostumerAddress({ address, id: parseInt(id, 10) });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }
    return rep.send(res?.message);
  });

  server.delete('/costumer/address/:id', async (req: FastifyRequest<{
    Params: {
      id: string
    }
  }>, rep) => {
    const { id } = req.params;

    const res = await Costumer.deleteCostumerAddress(parseInt(id, 10));

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.message);
  });

  server.post('/marketer', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password', 'location', 'gender', 'phone', 'birthday'],
        properties: {
          name: { type: 'string' },
          cpf: { type: 'string' },
          cnpj: { type: 'string' },
          birthday: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          phone: { type: 'string' },
          gender: { type: 'string' },
          location: {
            type: 'object',
            properties: {
              latitude: { type: 'number' },
              longitude: { type: 'number' },
            },
          },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Body: {
      name: string,
      cnpj: string,
      cpf: string,
      email: string,
      password: string,
      phone: string,
      birthday: string
      location: {
        longitude: number,
        latitude: number
      },
      gender: string,
    }
  }>, rep) => {
    const {
      cpf, cnpj, gender, email, name, password, location, phone, birthday,
    } = req.body;

    if (!isValidDate(birthday)) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message: 'Date format to attribute birthday is wrong, need to be yyyy-mm-dd',
      });
    }

    if (!cnpj && !cpf) {
      return rep.status(401).send({
        error: true,
        message: ['It is required one field of identification (CPF or CNPJ)'],
        code: 401,
      });
    }

    const password_hash = await hashPassword(password);

    // male Default
    let genderId = 1;

    // female id
    if (gender.toUpperCase() === 'F') genderId = 2;

    const data = {
      location,
      email,
      name,
      password_hash,
      phone,
      genderId,
      birthday,
    };

    const res = await Marketer.createMarketer(data);

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.data);
  });

  server.delete('/marketer/:id', async (req: FastifyRequest<{
    Params: {
      id: string
    }
  }>, rep) => {
    const { id } = req.params;

    const res = await Marketer.delete(parseInt(id, 10));

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.message);
  });

  server.put('/marketer/:id', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password', 'gender', 'phone', 'birthday'],
        properties: {
          name: { type: 'string' },
          cpf: { type: 'string' },
          cnpj: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          gender: { type: 'string' },
          birthday: { type: 'string' },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Params: {
      id: string
    }
    Body: {
      name: string,
      password: string | null,
      cpf: string | null,
      cnpj: string| null,
      email: string,
      gender: string,
      birthday: string
    }
  }>, rep) => {
    const { id } = req.params;
    const {
      name, email, password, cpf, cnpj, gender, birthday,
    } = req.body;

    if (birthday) {
      if (!isValidDate(birthday)) {
        return rep.status(400).send({
          code: 400,
          error: true,
          message: 'Date format to attribute birthday is wrong, need to be yyyy-mm-dd',
        });
      }
    }

    let newCnpj = null;
    let newCpf = null;
    let newPassword = null;

    if (password) {
      newPassword = await hashPassword(password);
    }

    if (cnpj) newCnpj = cnpj;
    if (cpf) newCpf = cpf;

    // male Default
    let genderId = 1;

    // female id
    if (gender.toUpperCase() === 'F') genderId = 2;

    const res = await Marketer.update({
      id: parseInt(id, 10),
      cnpj: newCnpj,
      cpf: newCpf,
      password_hash: newPassword,
      email,
      name,
      genderId,
      birthday,
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.message);
  });
}
