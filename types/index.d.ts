interface INavigation {
  push: (path: string, params?: any) => any;
  navigate: (path: string, params?: any) => any;
  goBack: () => any;
}

interface IRoute {
  key: string;
  path: string;
  name: string;
  params: any;
}
interface IScreen {
  navigation: INavigation;
  route: IRoute;
}

interface ICard {
  id: number;
  balance: number;
  name: string;
  colorId: number;
}

interface IGoal {
  id: number;
  name: string;
  description: string;
  finalAmount: number;
  currentAmount: number;
}

interface ICategory {
  id: number;
  categoryName: string;
  imageUri: string;
  actionTypeId: number;
}

interface ITransaction {
  id: number;
  card?: ICard;
  comment?: string;
  amount: number;
  date: string;
  category?: ICategory;
}

type IPaymentSystem = "Visa" | "Paypal" | "Mir";
