import { FastifyReply, FastifyRequest } from 'fastify';
import { OsmService } from '../../infrastructure/services';
import { CostumerRepository } from '../../domain/repositories';
import IAddress from '../../domain/models/address';
import { IAddressController } from '../../interfaces/controllers.interface';

export class AddressController implements IAddressController {
  async addToCostumer(
    req: FastifyRequest<{
      Body: {
        address: IAddress;
      };
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;
    const { address } = req.body;

    const exists = await CostumerRepository.getCostumer(parseInt(id, 10));

    // @ts-ignore
    if (!exists.data) {
      return rep.status(404).send({
        error: true,
        message: 'This costumer do not exist',
      });
    }

    const osmAddressRes = await OsmService.getGeocoding(address);

    if (!osmAddressRes) {
      rep.code(400).send({
        error: true,
        message: 'This CEP value cant be search, probably is wrong!',
      });
    }

    const res = await CostumerRepository.addNewCostumerAddress({
      // @ts-ignore
      address: osmAddressRes,
      id: parseInt(id, 10),
    });

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }
    return rep.send(res?.message);
  }

  async removeToCostumer(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const res = await CostumerRepository.deleteCostumerAddress(
      parseInt(id, 10)
    );

    if (res?.error) {
      // @ts-ignore
      return rep.status(res?.code).send({
        error: true,
        cause: res.message,
      });
    }

    return rep.send(res?.message);
  }
}

export default new AddressController();
