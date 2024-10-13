export enum PaymentType {
    CREDIT,
    DEBIT,
  }
  
  export type PieChartDataItem = {
    color: string;
    percent: number;
    category: string;
    totalAmount: number;
  };
  
  export type Payment = {
    id: string;
    name: string;
    category: string;
    amount: number;
    logo: string;
    payment: PaymentType;
    date: Date;
  };
  
  export const Payments = [
    {
      id: "1",
      name: "AirBnb",
      logo: "https://news.airbnb.com/wp-content/uploads/sites/4/2021/07/2014_July@2X.jpg?fit=616%2C616&resize=616%2C616",
      category: "Housing",
      amount: 160.55,
      payment: PaymentType.DEBIT,
      date: new Date(),
    },
    {
      id: "2",
      name: "McDonalds",
      logo: "https://theconsumerverse.wordpress.com/wp-content/uploads/2019/10/mcdonalds-green.jpg?w=640",
      category: "Resturant",
      amount: 1123.1,
      payment: PaymentType.DEBIT,
      date: new Date(2023, 12, 12),
    },
    {
      id: "3",
      name: "Transfer",
      logo: "https://www.mastercard.com/content/dam/public/brandcenter/global/mastercard_symbol_square_black.png",
      category: "*4243",
      amount: 1135.0,
      payment: PaymentType.CREDIT,
      date: new Date(),
    },
    {
      id: "4",
      name: "Apple",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSARTguhtw8xarKMtDiHz6xWPt1CCe1VI3Meg&s",
      category: "Not enough funds",
      amount: 8.99,
      payment: PaymentType.DEBIT,
      date: new Date(2024, 5, 13),
    },
    {
      id: "5",
      name: "Subscription Play+",
      logo: "https://static.gameloop.com/img/6078f98a9cfeaa3ecd478882ca7d0f0f.png?imageMogr2/thumbnail/172.8x172.8/format/webp",
      category: "Recreation & Entertainment",
      amount: 1123.1,
      payment: PaymentType.DEBIT,
      date: new Date(2024, 5, 13),
    },
    {
      id: "6",
      name: "Transfer",
      logo: "https://km.visamiddleeast.com/content/dam/VCOM/blogs/visa-blue-gradient-800x450.jpg",
      category: "*4243",
      amount: 1135.0,
      payment: PaymentType.CREDIT,
      date: new Date(2024, 5, 13),
    },
    {
      id: "7",
      name: "Seven Eleven",
      logo: "https://mma.prnewswire.com/media/94545/7_Eleven_LOGO.jpg?p=twitter",
      category: "Food & Groceries",
      amount: 511.1,
      payment: PaymentType.DEBIT,
      date: new Date(2024, 5, 13),
    },
  ];
  
  export const calculatePieChartData = (
    activeCategory: string
  ): PieChartDataItem[] => {
    const debitPayments = Payments.filter(
      (payment) => payment.payment === PaymentType.DEBIT
    );
    const totalAmount = debitPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
  
    const categories = debitPayments.reduce((acc, payment) => {
      if (!acc[payment.category]) {
        acc[payment.category] = {
          amount: 0,
          color: activeCategory === payment.category ? "#4D72F5" : "#F2F2F2",
        }; // Use blue for active category and grey for others
      }
      acc[payment.category].amount += payment.amount;
      return acc;
    }, {} as Record<string, { amount: number; color: string }>);
  
    return Object.keys(categories).map((category) => ({
      color: categories[category].color,
      percent: categories[category].amount / totalAmount,
      category,
      totalAmount,
    }));
  };