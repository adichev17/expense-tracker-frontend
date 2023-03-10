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
  { id: 0, image: Scholarship, title: "Scholarship" },
  { id: 1, image: Investment, title: "Продукы" },
  { id: 4, image: Salary, title: "Salary" },
];

const ExpenseTypes: IIncomeExpenseType[] = [
  { id: 2, image: Saving, title: "Saving" },
  { id: 3, image: Spending, title: "Spending" },
  { id: 5, image: Shopping, title: "Shopping" },
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
