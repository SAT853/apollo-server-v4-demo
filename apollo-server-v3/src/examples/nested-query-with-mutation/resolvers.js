const products = [
  {
    id: 1,
    name: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    category: 'smartphones',
  },
  {
    id: 2,
    name: 'iPhone X',
    description:
      'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
    price: 899,
    category: 'smartphones',
  },
  {
    id: 3,
    name: 'Women Shoulder Bags',
    description:
      'LouisWill Women Shoulder Bags Long Clutches Cross Body Bags Phone Bags PU Leather Hand Bags Large Capacity Card Holders Zipper Coin Purses Fashion Crossbody Bags for Girls Ladies',
    price: 46,
    category: 'womens-bags',
  },
  {
    id: 4,
    name: 'Bluetooth Aux',
    description:
      'Bluetooth Aux Bluetooth Car Aux Car Bluetooth Transmitter Aux Audio Receiver Handfree Car Bluetooth Music Receiver Universal 3.5mm Streaming A2DP Wireless Auto AUX Audio Adapter With Mic For Phone MP3',
    price: 25,
    category: 'automotive',
  },
];

const categorys = [
  { name: 'smartphones' },
  { name: 'womens-bags' },
  { name: 'automotive' },
];
const getProducts = () => {
  return Promise.resolve(products);
};
const getProductById = ({ productId }) => {
  return Promise.resolve(products.find((p) => p.id === productId));
};
const createProduct = ({ product }) => {
  products.push(product);
  return Promise.resolve('success');
};

const resolvers = {
  Query: {
    products: async () => {
      const response = await getProducts();
      return response;
    },
    product: async (_, { id }) => getProductById({ productId: id }),
    categorys: () => {
      return categorys;
    },
  },
  Category: {
    products: ({ name }) => {
      return products.filter((p) => p.category === name);
    },
  },
  Mutation: {
    createProduct: async (_, { product }) => createProduct({ product }),
  },
};

module.exports = resolvers;
