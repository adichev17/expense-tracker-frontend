import React, { FunctionComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppConstants from "styles/constants";
import toPriceFormat from "libs/toPriceFormat";
import VisaSVG from "components/SVGs/Visa";
import PayPalSVG from "components/SVGs/PayPal";

interface IMinCard {
  navigation: INavigation;
  id: number;
  name: string;
  balance: number;
  colorId: number;
}

const MinCard: FunctionComponent<IMinCard> = ({
  navigation,
  id = 0,
  name = "Кошелек",
  balance = 45000,
  colorId = 0,
}) => {
  function navigateToCard(): void {
    navigation.push("Card", {
      id,
    });
  }

  return (
    <TouchableOpacity activeOpacity={AppConstants.ActiveOpacity} onPress={navigateToCard}>
      <View style={{ backgroundColor: AppConstants.CardSkins[colorId].colors, ...styles.minCard }}>
        <View style={styles.paymentSystem}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View>
          <Text style={styles.price}>{toPriceFormat(balance)} ₽</Text>
          <Text style={styles.typeBalance}>Баланс кошелька</Text>
        </View>
        {/*<View style={styles.cardInfo}>
          <Text style={[styles.cardInfoText, styles.cardInfoDate]}>
            {date.slice(3)[0]}
            {date.slice(3)[1]}
            {date.slice(3)[2]}
            {date.slice(3)[5]}
            {date.slice(3)[6]}
  </Text>
        </View>*/}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  minCard: {
    height: 155,
    width: 171,
    borderRadius: 14,
    marginLeft: 12,
    paddingHorizontal: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 32,
    paddingTop: 36,
    shadowColor: "#eeeeee",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 14.78,
    elevation: 14,
  },
  name: {
    fontSize: 20,
  },
  price: {
    fontFamily: AppConstants.FontExtra,
    fontSize: 18,
  },
  typeBalance: {
    fontSize: 10,
    marginTop: 7,
    fontFamily: AppConstants.FontRegular,
  },
  paymentSystem: {
    height: 20,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    fontFamily: AppConstants.FontRegular,
  },
  cardInfoText: {
    fontSize: 10,
  },
  cardInfoDate: {
    fontFamily: AppConstants.FontExtra,
  },
});

export default MinCard;
