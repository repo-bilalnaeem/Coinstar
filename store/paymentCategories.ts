export type PaymentCategories = {
  id: string;
  name: string;
  logo: any;
  totalAmount?: any;
};

export const categories: PaymentCategories[] = [
  {
    id: "1",
    name: "Resturant",
    logo: require("@/assets/images/resturant.png"),
  },
  {
    id: "2",
    name: "Transportation",
    logo: require("@/assets/images/car.png"),
  },
  {
    id: "3",
    name: "Beauty & Medicine",
    logo: require("@/assets/images/medicine.png"),
  },
  {
    id: "4",
    name: "Recreation & Entertainment",
    logo: require("@/assets/images/recreation.png"),
  },
  {
    id: "5",
    name: "Food & Groceries",
    logo: require("@/assets/images/food.png"),
  },
  {
    id: "6",
    name: "Hosuing",
    logo: require("@/assets/images/housing.png"),
  },
  {
    id: "7",
    name: "Insurance",
    logo: require("@/assets/images/insurance.png"),
  },
];
