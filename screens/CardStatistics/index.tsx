import React, { FunctionComponent, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Database from "sql";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import TheLayout from "layouts";
import TopPanel from "components/UI/TopPanel";
import Label from "components/UI/Label";
import { ResponsivePie } from "@nivo/pie";
import CardStatisticsPie from "components/Custom/CardStatisticsPie";

interface IExpenseStatistics {
  categoryName: string;
  categoryId: number;
  percent: number;
  percentString: string;
  amount: number;
  colorId: number;
}

const testData = {
  card: {
    id: 1,
    balance: 600.0,
    name: "Кошелек 1",
    colorId: 2,
    created: "2023-03-21T19:26:25.4673902",
  },
  transactions: [
    {
      id: 4,
      comment: "Зарплата",
      amount: 400.0,
      category: {
        id: 5,
        categoryName: "Зарплата",
        imageUri: "https://img.icons8.com/fluency/64/money-transfer.png",
        actionTypeId: 2,
      },
      date: "2023-03-21T19:26:25.4674044",
    },
    {
      id: 3,
      comment: "Оплата общежития",
      amount: 400.0,
      category: {
        id: 4,
        categoryName: "Недвижимость",
        imageUri: "https://img.icons8.com/fluency/64/real-estate.png",
        actionTypeId: 1,
        colorId: 2,
      },
      date: "2023-03-21T19:26:25.467404",
    },
    {
      id: 2,
      comment: "Магазин Пятерочка",
      amount: 85.0,
      category: {
        id: 1,
        categoryName: "Продукты",
        imageUri: "https://img.icons8.com/fluency/64/fast-moving-consumer-goods.png",
        actionTypeId: 1,
        colorId: 1,
      },
      date: "2023-03-21T19:26:25.4674037",
    },
    {
      id: 1,
      comment: "Магазин Магнолия",
      amount: 35.0,
      category: {
        id: 1,
        categoryName: "Продукты",
        imageUri: "https://img.icons8.com/fluency/64/fast-moving-consumer-goods.png",
        actionTypeId: 1,
        colorId: 1,
      },
      date: "2023-03-21T19:26:25.4674033",
    },
  ],
};

const CardStatisticsScreen: FunctionComponent<IScreen> = ({ navigation, route }) => {
  const [statistics, setStatistics] = useState<IExpenseStatistics[]>([]);

  useEffect(() => {
    var expenseStatistics: IExpenseStatistics[] = [];
    var expenseTestData = Object.assign({}, testData);
    expenseTestData.transactions = expenseTestData.transactions.filter(t => t.category.actionTypeId === 1);
    //alert(JSON.stringify(expenseTestData.transactions));
    const statistics = expenseTestData.transactions.map(item => {
      var index = expenseStatistics.findIndex(x => x.categoryId === item.category.id);
      var commonaAmount = expenseTestData.transactions
        .map(ca => ca.amount)
        .reduce((accumulator, current) => accumulator + current, 0);
      if (index !== -1) {
        expenseStatistics[index].amount += item.amount;
        expenseStatistics[index].percent = Math.round((expenseStatistics[index].amount / commonaAmount) * 100);
        expenseStatistics[index].percentString =
          ((expenseStatistics[index].amount / commonaAmount) * 100).toFixed(0).toString() + "%";
      } else {
        const model = {} as IExpenseStatistics;
        model.amount = item.amount;
        model.categoryId = item.category.id;
        model.colorId = item.category.colorId ?? 0; // its okey
        model.categoryName = item.category.categoryName;
        model.percent = Math.round((item.amount / commonaAmount) * 100);
        model.percentString = ((item.amount / commonaAmount) * 100).toFixed(0).toString() + "%";
        expenseStatistics.push(model);
      }
    });
    setStatistics(expenseStatistics);
  }, [route]);

  function onCreateExpenseCategoryPressHandler(): void {
    //alert(JSON.stringify(route.params));
    navigation.push("Expense", {
      cardId: route.params.cardId,
    });
  }

  return (
    <TheLayout>
      <TopPanel withBack navigation={navigation} backPathname="Card" backParams={{ id: route.params.cardId }} />
      <View style={styles.body}>
        <View style={styles.bodyLabel}>
          <Label>Статистика расходов</Label>
        </View>
        <CardStatisticsPie data={testData} />
      </View>
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 39,
    paddingBottom: 39,
  },
  headerInput: {
    marginTop: 15,
  },
  headerType: {
    marginTop: 25,
  },
  bodyTypes: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    marginTop: 92,
  },
  headerComment: {
    marginTop: 15,
  },
  bodyComment: {
    marginTop: 15,
  },
  bodyLabel: {
    marginBottom: 25,
  },
});

export default CardStatisticsScreen;
