export const user = [
  {
    id: 1,
    username: "sample",
    email: "sample@sample.com",
    password: "1234",
  },
  {
    id: 2,
    username: "wyn",
    email: "wyn@sample.com",
    password: "wyn123",
  },
  {
    id: 3,
    username: "emman",
    email: "emman@gmail.com",
    password: "emman123",
  },
];

export const category = [
  {
    id: 1,
    name: "cake",
  },
  {
    id: 2,
    name: "cookie",
  },
  {
    id: 3,
    name: "pastry",
  },
];

export const product = [
  {
    id: 1,
    category_id: 1,
    name: "Carrot",
    description:
      "Soft and moisty goodness packed with carrots, walnuts, and cream cheese.",
    price: 600,
    img_name: "carrot.png",
    variant_set_id: 1,
  },
  {
    id: 2,
    category_id: 1,
    name: "Chocolate Fudge",
    description:
      "Decadent fudge-filled chocolate topped with caramel frosting.",
    price: 600,
    img_name: "chocofudge.png",
    variant_set_id: 1,
  },
  {
    id: 3,
    category_id: 1,
    name: "Marble",
    description: "Layers of vanilla and chocolate mixed in buttery bread.",
    price: 600,
    img_name: "marble.png",
    variant_set_id: 1,
  },
  {
    id: 4,
    category_id: 1,
    name: "Red Velvet",
    description:
      "Our own take on the traditional velvet flavor—vanilla drenched in butter with a hint of cocoa flavor.",
    price: 700,
    img_name: "redvelvet.png",
    variant_set_id: 1,
  },
  {
    id: 5,
    category_id: 1,
    name: "Tiramisu",
    description:
      "A fusion of espresso-dipped ladyfingers and a creamy, lightly sweetened mascarpone cream, making a bittersweet result of flavors.",
    price: 700,
    img_name: "tiramisu.png",
    variant_set_id: 1,
  },
  {
    id: 6,
    category_id: 1,
    name: "Ube",
    description: "Moist, nutty, delectable ube goodness you all know and love.",
    price: 700,
    img_name: "ube.png",
    variant_set_id: 1,
  },
  {
    id: 7,
    category_id: 2,
    name: "Chocolate Chip",
    description: "Our famous, traditional chocolate chip cookie.",
    price: 60,
    img_name: "chocochip.png",
    variant_set_id: 2,
  },
  {
    id: 8,
    category_id: 2,
    name: "Chocolate Crinkles",
    description:
      "Brownie-like chocolate cookies coated in confectioners' sugar.",
    price: 50,
    img_name: "chococringles.png",
    variant_set_id: 2,
  },
  {
    id: 9,
    category_id: 2,
    name: "Gingerbread",
    description:
      "Molasses and brown sugar-sweetened holiday goodness that are crispy on the edges yet soft in the center.",
    price: 80,
    img_name: "gingerbread.png",
    variant_set_id: 2,
  },
  {
    id: 10,
    category_id: 3,
    name: "Egg Tart",
    description:
      "Bright savory egg richness with a scorched caramelized exterior.",
    price: 60,
    img_name: "eggtart.png",
    variant_set_id: 3,
  },
  {
    id: 11,
    category_id: 3,
    name: "Macarons",
    description:
      "Evocatively delicate nutty sandwich cookies with a crisp exterior.",
    price: 50,
    img_name: "macaron.png",
    variant_set_id: 2,
  },
  {
    id: 12,
    category_id: 3,
    name: "Soft Pretzel",
    description:
      "Traditional pretzels with a deeply browned exterior and a chewy texture.",
    price: 50,
    img_name: "pretzel.png",
    variant_set_id: 4,
  },
];

export const variant = [
  {
    id: 1,
    name: "6 x 8",
    price_multiplier: 1,
    set_id: 1,
  },
  {
    id: 2,
    name: "8 x 10",
    price_multiplier: 1.2,
    set_id: 1,
  },
  {
    id: 3,
    name: "10 x 12",
    price_multiplier: 1.4,
    set_id: 1,
  },
  {
    id: 4,
    name: "5 pcs",
    price_multiplier: 1,
    set_id: 2,
  },
  {
    id: 5,
    name: "10 pcs",
    price_multiplier: 1.8,
    set_id: 2,
  },
  {
    id: 6,
    name: "20 pcs",
    price_multiplier: 2.8,
    set_id: 2,
  },
  {
    id: 7,
    name: "2 pcs",
    price_multiplier: 1,
    set_id: 3,
  },
  {
    id: 8,
    name: "4 pcs",
    price_multiplier: 1.8,
    set_id: 3,
  },
  {
    id: 8,
    name: "6 pcs",
    price_multiplier: 2.6,
    set_id: 3,
  },
  {
    id: 9,
    name: "6 pcs",
    price_multiplier: 1,
    set_id: 4,
  },
  {
    id: 10,
    name: "12 pcs",
    price_multiplier: 1.8,
    set_id: 4,
  },
  {
    id: 10,
    name: "20 pcs",
    price_multiplier: 2.8,
    set_id: 4,
  },
];

export const variant_set = [
  {
    id: 1,
    variants: [1, 2, 3],
  },
  {
    id: 2,
    variants: [4, 5, 6],
  },
  {
    id: 3,
    variants: [7, 8, 9],
  },
  {
    id: 4,
    variants: [10, 11, 12],
  },
];

export const cart_item = [
  {
    id: 1,
    user_id: 1,
    product_id: 2,
    quantity: 1,
    variant_id: 1,
  },
];

export const checkout_item = [
  {
    id: 1,
    checkout_id: 1,
    product_id: 9,
    quantity: 3,
    variant_id: 5,
    total_price: 432,
  },
];

export const checkout = [
  {
    id: 1,
    user_id: 1,
    name: "sample name",
    address: "sample address",
    contact_number: "09123456789",
    payment_method: "cod",
    total_quantity: 3,
    total_price: 432,
    shipping_fee: 50,
  },
];
