import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
import bcryptjs from 'bcryptjs';



await db.day_of_week.createMany({
  data: [
    { name: 'Segunda-Feira', abbr: 'Seg.' },
    { name: 'Terça-Feira', abbr: 'Terç.' },
    { name: 'Quarta-Feira', abbr: 'Qua.' },
    { name: 'Quinta-Feira', abbr: 'Qui.' },
    { name: 'Sexta-Feira', abbr: 'Sex.' },
    { name: 'Sabado', abbr: 'Sáb.' },
    { name: 'Domingo', abbr: 'Dom.' },
  ],
});

await db.type_of_price.createMany({
  data: [{ name: 'Kg' }, { name: 'unitário' }, { name: 'dúzia' }],
});

await db.category_of_product.create({
  data: {
    name: 'Frutas',
    image: {
      create: {
        uri: 'https://w7.pngwing.com/pngs/375/323/png-transparent-wild-strawberry-fruit-strawberry-fruit-natural-foods-frutti-di-bosco-food-thumbnail.png',
      },
    },
  },
});

await db.category_of_product.create({
  data: {
    name: 'Vegetais',
    image: {
      create: {
        uri: 'https://img.favpng.com/10/2/8/vegetable-high-definition-television-high-definition-video-display-resolution-wallpaper-png-favpng-wTpc1A3TMi8wXbcBNHc5PWHS1.jpg',
      },
    },
  },
});

await db.category_of_product.create({
  data: {
    name: 'Especiarias',
    image: {
      create: {
        uri: 'https://e7.pngegg.com/pngimages/861/863/png-clipart-colorful-spices-spices-colorful.png',
      },
    },
  },
});

await db.category_of_product.create({
  data: {
    name: 'Outros',
    image: {
      create: {
        uri: 'https://e7.pngegg.com/pngimages/861/863/png-clipart-colorful-spices-spices-colorful.png',
      },
    },
  },
});

await db.gender.createMany({
  data: [{ name: 'Male' }, { name: 'Female' }],
});

await db.deliveryman.create({
  data: {
    name: 'entregador de teste',
    birthday: '2005-11-04',
    email: 'entregador@gmail.com',
    password_hash: await bcryptjs.hash('12345678', 5),
    picture_uri:
      'https://www.clubeindriver.com.br/wp-content/uploads/2021/09/indriver-entregador.png',
    gender: {
      connect: {
        id: 1,
      },
    },
    location: {
      create: {
        latitude: 0,
        longitude: 0,
      },
    },
  },
});

await db.veicule.createMany({
  data: [
    {
      name: 'moto',
    },
    {
      name: 'bicicleta',
    },
    {
      name: 'carro',
    },
  ],
});

await db.address_type.createMany({
  data: [{ name: 'Casa' }, { name: 'Apartamento' }, { name: 'Feira' }],
});

await db.payment_method.createMany({
  data: [
    {
      name: 'PIX',
    },

    {
      name: 'Dinheiro',
    },

    {
      name: 'Cartão de Credito',
    },

    {
      name: 'Cartão de Debito',
    },
  ],
});
