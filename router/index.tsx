import { FunctionComponent } from "react";
import StartScreen from "screens/Start";
import AddCardScreen from "screens/AddCard";
import HomeScreen from "screens/Home";
import AddGoalScreen from "screens/AddGoal";
import CardScreen from "screens/Card";
import GoalScreen from "screens/Goal";
import TransactionsScreen from "screens/Transactions";
import ExpenseScreen from "screens/Expense";
import TransferScreen from "screens/Transfer";
import IncomeScreen from "screens/Income";
import EditCardScreen from "screens/EditCard";
import TransactionScreen from "screens/Transaction";
import IncomeCategoryScreen from "screens/AddIncomeCategory";
import ExpenseCategoryScreen from "screens/AddExpenseCategory";
import CardStatisticsScreen from "screens/CardStatistics";
import ScannerScreen from "screens/Scanner/scanner";

interface IRouteScreen {
  name: string;
  component: FunctionComponent<IScreen>;
}

const router: IRouteScreen[] = [
  { name: "Start", component: StartScreen },
  { name: "AddCard", component: AddCardScreen },
  { name: "EditCard", component: EditCardScreen },
  { name: "Home", component: HomeScreen },
  { name: "AddGoal", component: AddGoalScreen },
  { name: "Card", component: CardScreen },
  { name: "Goal", component: GoalScreen },
  { name: "Transactions", component: TransactionsScreen },
  { name: "Expense", component: ExpenseScreen },
  { name: "Transfer", component: TransferScreen },
  { name: "Income", component: IncomeScreen },
  { name: "AddIncomeCategory", component: IncomeCategoryScreen },
  { name: "AddExpenseCategory", component: ExpenseCategoryScreen },
  { name: "Transaction", component: TransactionScreen },
  { name: "CardStatistics", component: CardStatisticsScreen },
  { name: "Scanner", component: ScannerScreen },
];

export default router;
