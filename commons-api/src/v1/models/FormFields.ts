import db from '../libs/prisma';

class FormFields {
  async indexGender() {
    const res = await db.gender.findMany({
      select: {
        id: true,
        name: true
      }
    });
    
    return res;
  }

  async indexFairs() {
    const res = await db.fair.findMany({
      select: {
        id: true,
        address: {
          select: {
            CEP: true,
            complemento: true,
          },
        },
        fair_date_hour_of_work: {
          include: {
            dates: true,
          },
        },
      },
    });
    return res;
  }

  async indexDaysOfWeek() {
    const res = await db.day_of_week.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return res;
  }

  async indexTypeOfVeicules() {
    const res = await db.veicule.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return res;
  }

  async indexPaymentMethods() {
    const res = await db.payment_method.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return res;
  }
}

export default new FormFields();
