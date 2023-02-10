import db from 'db';

import {
  marketer,
} from '@prisma/client';
import { Marketer } from '../../proto/messages_pb';

class MarketerModel {
  async findAll(): Promise<marketer[]> {
    const marketers = await db.marketer.findMany();
    return marketers;
  }

  async findById(id: number): Promise<Marketer.AsObject | null> {
    const res = await db.marketer.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return res;
  }
}

export default new MarketerModel();
