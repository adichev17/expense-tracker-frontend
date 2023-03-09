import React, { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import Database from "sql";
import { SQLTransaction } from "expo-sqlite";
import TheLayout from "layouts";
import AppConstants from "styles/constants";
import TopPanel from "components/UI/TopPanel";
import Label from "components/UI/Label";
import Skin from "components/UI/Skin";
import Input from "components/UI/Input";
import Button from "components/UI/Button";
import PaymentSystem from "components/UI/PaymentSystem";

const AddCardScreen: FunctionComponent<IScreen> = ({ navigation }) => {
  const [paymentSystem, setPaymentSystem] = useState<IPaymentSystem>("Visa");
  const [skinID, setSkinID] = useState<number>(0);
  const [initialSum, setInitialSum] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  function onCreateCardPressHandler(): void {
    Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "INSERT INTO cards (balance, paymentSystem, number, endDate, colorId) VALUES (?, ?, ?, ?, ?);",
        [initialSum, paymentSystem, cardNumber, endDate, skinID]
      );
    });
    navigation.push("Home");
  }

  function validateData(): boolean {
    if (initialSum !== "" && cardNumber.length === 19 && endDate.length === 10) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <TheLayout>
      <TopPanel navigation={navigation} withBack isGoBack />
      <View style={styles.body}>          
        <View style={styles.mt}>
          <Label>Наименование кошелька</Label>
          <View style={styles.cardInfoContent}>
            <Input
              state={initialSum}
              setState={setInitialSum}
              keyboardType="decimal-pad"
              placeholder="Введите наименование кошелька"
            />
          </View>
          <Label>Цвет кошелька</Label>  
          <View style={styles.skins}>
          {AppConstants.CardSkins.map(skin => {
            return <Skin key={skin.id} setState={setSkinID} state={skinID} colors={skin.colors} id={skin.id} />;
          })}
        </View>
        </View>

        <View style={styles.createButton}>
          <Button variant="primary" onPressHandler={onCreateCardPressHandler} isValidate={validateData()}>
            Создать
          </Button>
        </View>
      </View>
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 32,
  },
  mt: {
    marginTop: 25,
  },
  createButton: {
    marginTop: 60,
    paddingBottom: 35,
  },
  skins: {
    marginTop: 35,
    height: 320,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardInfoContent: {
    marginTop: 23,
    height: 100,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  paymentSystems: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 23,
  },
});

export default AddCardScreen;
