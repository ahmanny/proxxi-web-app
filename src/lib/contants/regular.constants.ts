export const HIGHLIGHT_OPTIONS = ["Handcrafted", "Premium Quality", "Stylish and Comfortable", "Made By Skilled Artisans",
  "Premium Quality", "Versatile Wardrobe Staple", "Available in Various Sizes", "Tailored Fit"]
export const colors = ["red", "blue", "green", "yellow", "purple", "pink", "black", "brown", "gray"];
export const genders = ["male", "female", "unisex"];
export const stockStatus = ["In Stock", "Out of Stock", "Low Stock", "Pre-order", "Discontinued"];
export const materials = ["leather", "Suede", "canvas", "Rubber"];
export const sizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46"];

export const ProductTableHeader = ["name", "SKU", "Price", "Stock", "Gender"];
export const OrderTableHeader = ["order", "Date", "Total", "Statue"];
export const CustomersTableHeader = ["name", "email", "shipping address"];
export const ReviewsTableHeader = ["name", "review"];
export const orders = [
  {
    id: 1, order: "Raw Black T-Shirt Lineup", date: "20 Mar, 2023", total: 75.0, status: "Processing",
  },
  {
    id: 2, order: "Classic Monochrome Tees", date: "19 Mar, 2023", total: 35.0, status: "Processing",
  },
  {
    id: 3, order: "Monochromatic Wardrobe", date: "7 Feb, 2023", total: 27.0, status: "Completed",
  },
  {
    id: 4, order: "Essential Neutrals", date: "29 Jan, 2023", total: 22.0, status: "Completed",
  },
  {
    id: 5, order: "UTRAANET Black", date: "27 Jan, 2023", total: 43.0, status: "Processing",
  },
  {
    id: 6, order: "Elegant Ebony Sweatshirts", date: "4 Jan, 2023", total: 35.0, status: "Cancelled",
  },
  {
    id: 7, order: "Sleek and Cozy Black", date: "28 Dec, 2022", total: 57.0, status: "Completed",
  },
  {
    id: 8, order: "MOCKUP Black", date: "20 Dec, 2022", total: 30.0, status: "Processing",
  },
  {
    id: 9, order: "MOCKUP Black", date: "20 Dec, 2022", total: 30.0, status: "Processing",
  },
  {
    id: 10, order: "MOCKUP Black", date: "20 Dec, 2022", total: 30.0, status: "Processing",
  },
  {
    id: 11, order: "MOCKUP Black", date: "20 Dec, 2022", total: 30.0, status: "Processing",
  },
  {
    id: 12, order: "MOCKUP Black", date: "20 Dec, 2022", total: 30.0, status: "Processing",
  },
  {
    id: 13, order: "MOCKUP Black", date: "20 Dec, 2022", total: 30.0, status: "Processing",
  },
  {
    id: 14, order: "MOCKUP Black", date: "20 Dec, 2022", total: 30.0, status: "Processing",
  },
  {
    id: 15, order: "MOCKUP Black", date: "20 Dec, 2022", total: 30.0, status: "Processing",
  },
  {
    id: 16, order: "MOCKUP Black", date: "20 Dec, 2022", total: 30.0, status: "Processing",
  },
];

export const customers = [
  {
    _id: 1, name: "esther edwards", email: "estheredwards@gmail.com", shippingAddress: {
      address: "8642 Yule Street, Arvada CO 80007",
      city: "mimemi",
      state: "enugu",
      zipCode: "heheh",
      country: "minemine"
    },
  },
  {
    _id: 2, name: "wade warren", email: "wadewarren@gmail.com", shippingAddress: {
      address: "5331 Rexford Court, Montgomery AL 36116",
      city: "mimemi",
      state: "enugu",
      zipCode: "heheh",
      country: "minemine"
    },
  },
];
export const reviews = [
  {
    id: 1,
    rating: 3,
    name: "Essential Neutrals",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil autem minima officia,so whats up man ",
    image: "/shirt4.png",
  },
  {
    id: 2,
    rating: 3,
    name: "Essential Neutrals",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil autem minima officia, yo whats good ",
    image: "/shirt4.png",
  },
  {
    id: 3,
    rating: 3,
    name: "Essential Neutrals",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil autem minima officia,hmmm usay ",
    image: "/shirt4.png",
  },
  {
    id: 4,
    rating: 3,
    name: "Essential Neutrals",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil autem minima officia, minan hsh ",
    image: "/shirt4.png",
  }
];