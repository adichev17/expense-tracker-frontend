import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Database from "sql";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import AppConstants from "styles/constants";
import TheLayout from "layouts";
import Card from "components/Custom/Card";
import IncomeButton from "components/Custom/IncomeButton";
import TransferButton from "components/Custom/TransferButton";
import ExpenseButton from "components/Custom/ExpenseButton";
import Transaction from "components/Custom/Transaction";
import TopPanel from "components/UI/TopPanel";
import Label from "components/UI/Label";
import StatisticsButton from "components/Custom/StatisticsButton";
import ScannerButton from "components/Custom/ScannerButton/scannerButton";

const CardScreen: FunctionComponent<IScreen> = ({ navigation, route }) => {
  const [card, setCard] = useState<ICard>();
  const [cardsLength, setCardsLength] = useState<number>(0);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  function onGoToChangeCardInformationHandler(): void {
    navigation.push("EditCard", {
      id: route.params.id,
    });
  }

  const cardData = {
    id: 1,
    name: "Кошелек 1",
    balance: 50000,
    colorId: 2,
  };
  const categoryProduct = {
    id: 1,
    categoryName: "Продукты",
    imageUri: "https://reactnative.dev/img/tiny_logo.png",
    actionTypeId: 1,
  };
  const categoryCar = {
    id: 2,
    categoryName: "Автомобиль",
    imageUri: "https://img.icons8.com/fluency/64/sedan.png",
    actionTypeId: 1,
  };

  const transactionsData = [
    {
      id: 8,
      card: cardData,
      amount: 150,
      date: "2023-03-14 20:42:08.2809162",
      category: categoryProduct, // Lazy Load
    },
    {
      id: 9,
      card: cardData,
      amount: 300,
      date: "2023-03-14 20:42:08.2809162",
      category: categoryCar, // Lazy Load
    },
    {
      id: 10,
      card: cardData,
      amount: 1000,
      date: "2023-03-14 20:42:08.2809162",
      category: categoryCar, // Lazy Load
    },
    {
      id: 11,
      card: cardData,
      amount: 545,
      date: "2023-03-14 20:42:08.2809162",
      category: categoryProduct, // Lazy Load
    },
  ];

  useEffect(() => {
    /*Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "SELECT * FROM cards WHERE id = ?",
        [route.params.id],
        (transaction: SQLTransaction, result: SQLResultSet) => {
          setCard(result.rows._array[0]);
          //alert("cards - " + JSON.stringify(result.rows._array))
        }
      );
    });
    Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "SELECT * FROM transactions WHERE cardId = ? ORDER BY id DESC",
        [route.params.id],
        (transaction: SQLTransaction, result: SQLResultSet) => {
          setTransactions(result.rows._array);
        }
      );
    });*/
    setCard(cardData);
    setTransactions(transactionsData);
    Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql("SELECT * FROM cards WHERE 1", [], (transaction: SQLTransaction, result: SQLResultSet) => {
        setCardsLength(result.rows._array.length);
      });
    });
  }, []);

  return (
    <TheLayout>
      <TopPanel withBack navigation={navigation} backPathname={"Home"} />
      <View style={styles.body}>
        <Card key={card?.id} id={card?.id} name={card?.name} colorId={card?.colorId} balance={card?.balance} />
        <TouchableOpacity onPress={onGoToChangeCardInformationHandler} activeOpacity={AppConstants.ActiveOpacity}>
          <Text style={styles.goChange}>Изменить данные карты</Text>
        </TouchableOpacity>
        <View style={styles.block}>
          <Label>Действия</Label>
          <View style={styles.blockContent}>
            <IncomeButton navigation={navigation} route={route} />
            <View style={styles.rightButtons}>
              {/* <TransferButton navigation={navigation} route={route} isActive={cardsLength > 1} /> */}
              <ExpenseButton navigation={navigation} route={route} />
            </View>
          </View>
          <View style={styles.blockContent}>
            <StatisticsButton navigation={navigation} route={route} />
            <View style={styles.rightButtons}>
              {/* <TransferButton navigation={navigation} route={route} isActive={cardsLength > 1} /> */}
              <ScannerButton navigation={navigation} route={route} />
            </View>
          </View>
        </View>
        {Boolean(transactions.length) && (
          <View style={styles.block}>
            <Label>Транзакции</Label>
            <View style={styles.transactionsData}>
              {transactions.map((transaction: ITransaction) => {
                return <Transaction navigation={navigation} key={transaction.id} data={transaction} />;
              })}
            </View>
          </View>
        )}
      </View>
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 46,
    paddingBottom: 46,
  },
  block: {
    marginTop: 28,
  },
  blockContent: {
    marginTop: 23,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightButtons: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  transactionsData: {
    marginTop: 11,
  },
  goChange: {
    fontFamily: AppConstants.FontBold,
    textAlign: "center",
    fontSize: 12,
    color: "#F9F9F9",
    marginTop: 28,
  },
});

export default CardScreen;
