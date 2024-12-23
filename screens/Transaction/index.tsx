import React, { FunctionComponent, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Database from "sql";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import returnConfigurationData from "libs/config";
import toPriceFormat from "libs/toPriceFormat";
import toDateFormat from "libs/toDateFormat";
import AppConstants from "styles/constants";
import TheLayout from "layouts";
import Transaction from "components/Custom/Transaction";
import TopPanel from "components/UI/TopPanel";
import Label from "components/UI/Label";

const TransactionScreen: FunctionComponent<IScreen> = ({ navigation, route }) => {
  const [currentTransaction, setCurrentTransaction] = useState<ITransaction>();
  const [transactions, setTransactions] = useState<ITransaction[]>();

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

  const currentTransactionData = {
    id: 8,
    card: card,
    amount: 6,
    date: "1678392327699",
    category: categoryProduct, // Lazy Load
  };

  const secondtTransactionData = [
    {
      id: 9,
      card: card,
      amount: 100,
      date: "2023-03-14 20:42:08.2809162",
      category: categoryProduct, // Lazy Load
    },
  ];

  useEffect(() => {
    fetch("http://192.168.0.106:4444/api/expense/" + route.params.id)
      .then(res => {
        if (res.status !== 200) {
          alert("Error-" + res.status);
        }
        return res.json();
      })
      .then(data => {
        //alert(JSON.stringify(data.comment));
        setCurrentTransaction(data);
      })
      .catch(function (error) {
        alert("Error-" + error.message);
      });
    setCurrentTransaction(currentTransactionData);
    setTransactions(secondtTransactionData);
    {
      /*Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "SELECT * FROM transactions WHERE id = ?",
        [route.params.id],
        (_: SQLTransaction, result: SQLResultSet) => {
          setCurrentTransaction(result.rows._array[0]);
          transaction.executeSql(
            "SELECT * FROM transactions WHERE type = ? AND id != ? ORDER BY id DESC LIMIT 5",
            [result.rows._array[0].type, result.rows._array[0].id],
            (transaction: SQLTransaction, result: SQLResultSet) => {
              setTransactions(result.rows._array);
            }
          );
        }
      );
    });*/
    }
  }, [route]);

  return (
    <TheLayout>
      <TopPanel withBack isGoBack navigation={navigation} />
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: currentTransaction?.category?.imageUri,
            }}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={[styles.center, styles.transactionType]}>{currentTransaction?.category?.categoryName}</Text>
          <Text style={[styles.center, styles.transactionDate]}>{toDateFormat(currentTransaction?.date || "")}</Text>
          <Text style={[styles.center, styles.transactionAmount]}>
            {currentTransaction?.category?.actionTypeId === 2 ? "+ " : "- "}
            {toPriceFormat(currentTransaction?.amount || 0)} ₽
          </Text>
          {currentTransaction?.comment !== null ? (
            <Text style={[styles.center, styles.transactionComment]}>{currentTransaction?.comment || ""} </Text>
          ) : (
            ""
          )}
        </View>
      </View>
      {Boolean(transactions?.length) && (
        <View style={styles.transactionsWrapper}>
          <Label>Еще</Label>
          <View style={styles.transactionsBody}>
            {transactions?.map(transaction => {
              return <Transaction key={transaction.id} data={transaction} navigation={navigation} />;
            })}
          </View>
        </View>
      )}
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppConstants.BackgroundSecondColor,
    width: "100%",
    paddingVertical: 31,
    borderRadius: 20,
    marginTop: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    width: 134,
    height: 134,
    backgroundColor: AppConstants.BackgroundColor,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 74,
    height: 74,
  },
  center: {
    textAlign: "center",
  },
  transactionType: {
    fontFamily: AppConstants.FontBold,
    color: "#F9F9F9",
    fontSize: 16,
    marginTop: 16,
  },
  transactionDate: {
    fontFamily: AppConstants.FontBold,
    color: "#9E9E9E",
    fontSize: 10,
    marginTop: 4,
  },
  transactionsBody: {
    marginTop: 11,
  },
  transactionAmount: {
    fontFamily: AppConstants.FontExtra,
    color: "#F9F9F9",
    fontSize: 18,
    marginTop: 16,
  },
  transactionComment: {
    fontFamily: AppConstants.FontExtra,
    color: "#F9F9F9",
    fontSize: 16,
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  transactionsWrapper: {
    marginTop: 42,
    paddingBottom: 40,
  },
});

export default TransactionScreen;
