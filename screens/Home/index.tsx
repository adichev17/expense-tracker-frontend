import React, { FunctionComponent, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import Database from "sql";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import TheLayout from "layouts";
import AppConstants from "styles/constants";
import AddCard from "components/Custom/AddCard";
import MinCard from "components/Custom/MinCard";
import AddGoal from "components/Custom/AddGoal";
import Goal from "components/Custom/Goal";
import Transaction from "components/Custom/Transaction";
import TopPanel from "components/UI/TopPanel";
import Label from "components/UI/Label";

const HomeScreen: FunctionComponent<IScreen> = ({ navigation, route }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  function onGoToTransactions(): void {
    navigation.push("Transactions");
  }

  const cardsData = [
    {
      id: 1,
      name: "Кошелек 1",
      balance: 50,
      colorId: 1,
    },
  ];

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
  ];

  useEffect(() => {
    /**
      @todo: Get Cards
    **/
    fetch("http://192.168.0.106:54249/api/card/1")
      .then(res => {
        if (res.status !== 200) {
          alert("Error-" + res.status);
        }
        return res.json();
      })
      .then(data => {
        //alert(JSON.stringify(data));
        setCards(data);
      })
      .catch(function (error) {
        alert("Error-" + error.message);
      });

    fetch("http://192.168.0.106:54249/api/expense?userId=1&rows=5")
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
    {
      /*Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "SELECT * FROM cards ORDER BY id DESC",
        [],
        (transaction: SQLTransaction, result: SQLResultSet) => {
          setCards(result.rows._array);alert(JSON.stringify(result.rows._array));
        }
      );
    });
    Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "SELECT * FROM goals ORDER BY id DESC",
        [],
        (transaction: SQLTransaction, result: SQLResultSet) => {
          setGoals(result.rows._array);
        }
      );
    });
    Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "SELECT * FROM transactions ORDER BY id DESC LIMIT 5",
        [],
        (transaction: SQLTransaction, result: SQLResultSet) => {
          setTransactions(result.rows._array);
          alert("transactions - " + JSON.stringify(result.rows._array))
        }
      );
    });
  */
    }

    setTransactions(transactionsData);
  }, [route]);

  return (
    <TheLayout withHorizontalPaddings={false}>
      <TopPanel />
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          <ScrollView horizontal>
            <AddCard navigation={navigation} />
            {cards.map(card => {
              return (
                <MinCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  colorId={card.colorId}
                  balance={card.balance}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.body}>
          {Boolean(transactions.length) && (
            <View>
              <View style={styles.transactionsHeader}>
                <Label>Последние транзакции</Label>
                <Pressable onPress={onGoToTransactions}>
                  <Text style={styles.allTransactions}>Все</Text>
                </Pressable>
              </View>
              <View style={styles.transactionsBody}>
                {transactions.map((transaction: ITransaction) => {
                  return <Transaction navigation={navigation} key={transaction.id} data={transaction} />;
                })}
              </View>
            </View>
          )}
        </View>
      </View>
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 46,
  },
  body: {
    marginTop: 10,
    paddingHorizontal: AppConstants.PaddingHorizontal,
    paddingBottom: 40,
  },
  cardsContainer: {
    paddingLeft: AppConstants.PaddingHorizontal,
    height: 200,
  },
  goalsContent: {
    marginTop: 5,
  },
  addGoal: {
    marginTop: 12,
  },
  transactionsHeader: {
    marginTop: 42,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionsBody: {
    marginTop: 11,
  },
  allTransactions: {
    fontFamily: AppConstants.FontExtra,
    color: "#585858",
  },
});

export default HomeScreen;
