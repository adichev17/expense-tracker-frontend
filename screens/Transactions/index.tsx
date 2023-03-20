import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TheLayout from "layouts";
import Database from "sql";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import Transaction from "components/Custom/Transaction";
import TopPanel from "components/UI/TopPanel";
import Label from "components/UI/Label";

const TransactionsScreen: FunctionComponent<IScreen> = ({ navigation }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const card = {
    id: 1,
    name: "Кошелек 1",
    balance: 50,
    colorId: 1,
  };
  const categoryProduct = {
    id: 1,
    categoryName: "Продукты",
    imageUri: "https://reactnative.dev/img/tiny_logo.png",
    actionTypeId: 1,
  };

  const transactionsData = [
    {
      id: 8,
      card: card,
      amount: 6,
      date: "1678392327699",
      category: categoryProduct, // Lazy Load
    },
    {
      id: 9,
      card: card,
      amount: 100,
      date: "1678392327699",
      category: categoryProduct, // Lazy Load
    },
  ];

  useEffect(() => {
    fetch("http://192.168.0.106:4444/api/expense?userId=1")
      .then(res => {
        if (res.status !== 200) {
          alert("Error-" + res.status);
        }
        return res.json();
      })
      .then(data => {
        //alert(JSON.stringify(data));
        var allTransactions: ITransaction[] = [];
        var transactions2 = data.map(
          (item: { card: { id: number; balance: number; name: string; colorId: number }; transactions: any }) => {
            //alert(JSON.stringify(item.transactions));
            var cardTransactions = item.transactions.map(
              (transactionItem: {
                id: number;
                amount: number;
                date: string;
                category: { id: number; categoryName: string; imageUri: string; actionTypeId: number };
              }) => {
                return {
                  id: transactionItem.id,
                  card: item.card,
                  amount: transactionItem.amount,
                  date: transactionItem.date,
                  category: transactionItem.category,
                };
              }
            );
            allTransactions.push(...cardTransactions);
          }
        );
        //alert(JSON.stringify(allTransactions));
        //alert(JSON.stringify(transactions))
        setTransactions(allTransactions);
      })
      .catch(function (error) {
        alert("Error-" + error.message);
      });
    /*Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "SELECT * FROM transactions ORDER BY id DESC",
        [],
        (transaction: SQLTransaction, result: SQLResultSet) => {
          setTransactions(result.rows._array);
        }
      );
    });*/
  }, []);

  return (
    <TheLayout>
      <TopPanel withBack navigation={navigation} backPathname="Home" />
      <View style={styles.body}>
        <Label>Все транзакции</Label>
        <View style={styles.data}>
          {transactions.map((_transaction: ITransaction) => {
            return <Transaction navigation={navigation} key={_transaction.id} data={_transaction} />;
          })}
        </View>
      </View>
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 39,
    paddingBottom: 39,
  },
  data: {
    marginTop: 11,
  },
});

export default TransactionsScreen;
