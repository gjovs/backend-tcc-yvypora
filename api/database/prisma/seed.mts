import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
import bcryptjs from "bcryptjs";

// await db.day_of_week.createMany({
//   data: [
//     { name: "Segunda-Feira" },
//     { name: "Terça-Feira" },
//     { name: "Quarta-Feira" },
//     { name: "Quinta-Feira" },
//     { name: "Sexta-Feira" },
//     { name: "Sabado" },
//     { name: "Domingo" },
//   ],
// });

// await db.type_of_price.createMany({
//   data: [{ name: "Peso" }, { name: "Unitario" }, { name: "Duzia" }],
// });

// await db.category_of_product.create({
//   data: {
//     name: "Frutas",
//     image: {
//       create: {
//         uri: "https://w7.pngwing.com/pngs/375/323/png-transparent-wild-strawberry-fruit-strawberry-fruit-natural-foods-frutti-di-bosco-food-thumbnail.png",
//       },
//     },
//   },
// });

// await db.category_of_product.create({
//   data: {
//     name: "Vegetais",
//     image: {
//       create: {
//         uri: "https://img.favpng.com/10/2/8/vegetable-high-definition-television-high-definition-video-display-resolution-wallpaper-png-favpng-wTpc1A3TMi8wXbcBNHc5PWHS1.jpg",
//       },
//     },
//   },
// });

// await db.category_of_product.create({
//   data: {
//     name: "Especiarias",
//     image: {
//       create: {
//         uri: "https://e7.pngegg.com/pngimages/861/863/png-clipart-colorful-spices-spices-colorful.png",
//       },
//     },
//   },
// });




// await db.gender.createMany({
//   data: [{ name: "Male" }, { name: "Female" }],
// });

// await db.marketer.create({
//   data: {
//     tent_name: "Barraca de Teste",
//     name: "Feirate de Exemplo",
//     email: "marketer@gmail.com",
//     password_hash: await bcryptjs.hash("12345678", 6),
//     birthday: "1988-02-02",
//     phone: "+5511987728938",
//     cpf: "14352417890",
//     gender: {
//       connect: {
//         id: 1,
//       },
//     },
//     location: {
//       create: {
//         latitude: -20,
//         longitude: 20,
//       },
//     },
//   },
// });

// await db.costumer.create({
//   data: {
//     name: "Guilherme Joviniano de Sousa",
//     birthday: "2006-04-04",
//     email: "00drpixelss@gmail.com",
//     password_hash: await bcryptjs.hash("12345678", 5),
//     cpf: "49620968859",
//     gender: {
//       connect: {
//         id: 1,
//       },
//     },
//     costumer_addresses: {
//       create: {
//         address: {
//           create: {
//             logradouro: "Rua São Pedro",
//             cep: "06233250",
//             complemento: "Atras do sesi",
//             number: 146,
//             location: {
//               create: {
//                 latitude: 0,
//                 longitude: 0,
//               },
//             },
//             neighborhood: {
//               create: {
//                 name: "I.A.PI",
//               },
//             },
//             city: {
//               create: {
//                 name: "Osasco",
//               },
//             },
//             uf: {
//               create: {
//                 name: "SP",
//               },
//             },
//             type: {
//               create: {
//                 name: "Casa",
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// });

// await db.deliveryman.create({
//   data: {
//     name: "entregador de teste",
//     birthday: "2005-11-04",
//     email: "entregador@gmail.com",
//     password_hash: await bcryptjs.hash("12345678", 5),
//     picture_uri:
//       "https://www.clubeindriver.com.br/wp-content/uploads/2021/09/indriver-entregador.png",
//     gender: {
//       connect: {
//         id: 1,
//       },
//     },
//     location: {
//       create: {
//         latitude: 0,
//         longitude: 0,
//       },
//     },
//   },
// });

// await db.address_type.createMany({
//   data: [{ name: "Casa" }, { name: "Apartamento" }, { name: "Feira" }],
// });


await db.category_of_product.create({
  data: {
    name: "Outros",
    image: {
      create: {
        uri: "https://cdn.awsli.com.br/600x450/1568/1568912/produto/5840753624618a8fd0.jpg"
      },
    },
  },
});

await db.category_of_product.create({
  data: {
    name: "Verduras",
    image: {
      create: {
        uri: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR61F36y-FxJ1SuhuKrBUmJeQtWyklBOtf_QcqLNnziuboOyVCBPXjSiJsNqIQ_AIvd",
      },
    },
  },
});