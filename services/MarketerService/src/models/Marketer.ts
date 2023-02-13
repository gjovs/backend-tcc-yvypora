import db from './prisma';

import { marketer } from '@prisma/client';

import { Marketer } from '../../proto/messages';

class MarketerModel {
  async findAll(): Promise<marketer[]> {
    const marketers = await db.marketer.findMany();
    return marketers;
  }

  async findById(id: number): Promise<Marketer | null> {
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

    
    // @ts-ignore
    return res;
  }
}

export default new MarketerModel();
