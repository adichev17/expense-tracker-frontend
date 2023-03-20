const Scholarship = require("assets/payments-types/fellowship.png");
const Investment = require("assets/payments-types/investment.png");
const Salary = require("assets/payments-types/salary.png");
const Saving = require("assets/payments-types/saving.png");
const Spending = require("assets/payments-types/spending.png");
const Shopping = require("assets/payments-types/shopping.png");

export interface IIncomeExpenseType {
  id: number;
  image: any;
  title: string;
}

const IncomeTypes: IIncomeExpenseType[] = [
  { id: 5, image: Scholarship, title: "Зарплата" },
  { id: 6, image: Investment, title: "Инвестиции" },
  { id: 7, image: Salary, title: "Подарок" },
];

const ExpenseTypes: IIncomeExpenseType[] = [
  { id: 1, image: Saving, title: "Продукты" },
  { id: 2, image: Spending, title: "Автомобиль" },
  { id: 3, image: Shopping, title: "Образование" },
  { id: 4, image: Saving, title: "Недвижимость" },
];

interface IReturnConfigurationData {
  IncomeTypes: IIncomeExpenseType[];
  ExpenseTypes: IIncomeExpenseType[];
  AllTransactionTypes: IIncomeExpenseType[];
}

function returnConfigurationData(): IReturnConfigurationData {
  return {
    IncomeTypes,
    ExpenseTypes,
    AllTransactionTypes: [...IncomeTypes, ...ExpenseTypes],
  };
}

export default returnConfigurationData;
