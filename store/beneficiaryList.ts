type BeneficiaryProps = {
  id: string;
  firstname: string;
  lastname: string;
  image?: any;
  account: number;
};

export const formatAccountNumber = (account: number) => {
  const accountStr = account.toString();
  const visibleDigits = accountStr.slice(-4);
  const maskedDigits = "*" + visibleDigits;
  return maskedDigits;
};

export const BeneficiaryData: BeneficiaryProps[] = [
  {
    id: "1",
    firstname: "Bilal",
    lastname: "Naeem",
    // image: require('@/')
    account: 5231385949303820,
  },
  {
    id: "2",
    firstname: "Ali",
    lastname: "Mahmood",
    // image: require('@/')
    account: 5231385949305515,
  },
  {
    id: "3",
    firstname: "Umair",
    lastname: "Khan",
    // image: require('@/')
    account: 5231385949302804,
  },
  {
    id: "6",
    firstname: "Sibtain",
    lastname: "Haider",
    // image: require('@/')
    account: 5231385949303820,
  },
  {
    id: "4",
    firstname: "Shurabeel",
    lastname: "Peerzada",
    // image: require('@/')
    account: 5231385949302804,
  },
  {
    id: "5",
    firstname: "Arhum",
    lastname: "Humair",
    // image: require('@/')
    account: 5231385949303820,
  },
];

export const sortedBeneficiaryData = BeneficiaryData.sort((a, b) => 
  a.firstname.localeCompare(b.firstname)
);


export const groupByInitialLetter = (data: BeneficiaryProps[]): Record<string, BeneficiaryProps[]> => {
  return data.reduce((acc: Record<string, BeneficiaryProps[]>, beneficiary: BeneficiaryProps) => {
    const firstLetter = beneficiary.firstname[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(beneficiary);
    return acc;
  }, {});
};
