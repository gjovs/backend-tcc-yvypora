import { FastifyReply, FastifyRequest } from 'fastify';
import ReportsService from '../services/reports.service';

export class ReportsController {
  async index(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.user;
    const res = await ReportsService.index(id);

    // @ts-ignore
    if (res?.error || !res) {
      return rep.code(400).send({
        code: 400,
        error: true,
        // @ts-ignore
        message: res?.message,
      });
    }

    return rep.send({
      code: 200,
      error: false,
      data: res,
    });
  }
  async getDailySells(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.user;

    const res = await ReportsService.dailySellsReport(id);

    // @ts-ignore
    if (res?.error || !res) {
      return rep.code(400).send({
        code: 400,
        error: true,
        // @ts-ignore
        message: res?.message,
      });
    }

    return rep.send({
      code: 200,
      error: false,
      data: res,
    });
  }

  async getWeeklySells(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.user;

    const res = await ReportsService.weeklySellsReport(id);

    // @ts-ignore
    if (res?.error || !res) {
      return rep.code(400).send({
        code: 400,
        error: true,
        // @ts-ignore
        message: res?.message,
      });
    }

    return rep.send({
      code: 200,
      error: false,
      data: res,
    });
  }

  async getMonthlySells(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.user;

    const res = await ReportsService.monthlySellsReport(id);

    // @ts-ignore
    if (res?.error || !res) {
      return rep.code(400).send({
        code: 400,
        error: true,
        // @ts-ignore
        message: res?.message,
      });
    }

    return rep.send({
      code: 200,
      error: false,
      data: res,
    });
  }
}

export default new ReportsController();
