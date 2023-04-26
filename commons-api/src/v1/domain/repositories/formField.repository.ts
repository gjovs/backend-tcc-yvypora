import db from "../../infrastructure/libs/prisma";

class FormFieldRepository {
  async indexGender() {
    const res = await db.gender.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return res;
  }

  async indexFairs() {
    const res = await db.fair.findMany({
      select: {
        id: true,
        address: {
          select: {
            cep: true,
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
        name: true,
      },
    });
    return res;
  }

  async indexTypeOfVeicules() {
    const res = await db.veicule.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return res;
  }

  async indexPaymentMethods() {
    const res = await db.payment_method.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return res;
  }

  async indexTypeOfAddress() {
    const res = await db.address_type.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        name: {
          not: "Feira",
        },
      },
    });
    return res;
  }

  async indexCategories() {
    const res = await db.category_of_product.findMany({
      include: {
        image: true,
      },
    });

    return res;
  }
}

export default new FormFieldRepository();
