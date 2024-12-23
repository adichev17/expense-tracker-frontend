import React, { FunctionComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppConstants from "styles/constants";
import toPriceFormat from "libs/toPriceFormat";
import VisaSVG from "components/SVGs/Visa";
import PayPalSVG from "components/SVGs/PayPal";

interface ICard {
  onPressHandler?: () => void;
  id?: number;
  balance?: number;
  name?: string;
  colorId?: number;
}

const Card: FunctionComponent<ICard> = ({
  onPressHandler = undefined,
  balance = 45000,
  name = "",
  id = 0,
  colorId = 0,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={onPressHandler ? AppConstants.ActiveOpacity : 1}
      onPress={() => {
        if (onPressHandler) {
          onPressHandler();
        }
      }}
    >
      <View style={{ backgroundColor: AppConstants.CardSkins[colorId].colors, ...styles.minCard }}>
        <Text style={styles.name}>{name}</Text>
        <View>
          <Text style={styles.price}>{toPriceFormat(balance)} ₽</Text>
          <Text style={styles.typeBalance}>Баланс кошелька</Text>
        </View>
        <View style={styles.cardInfo}>
          {/*<Text style={styles.cardInfoText}>
            ****{" "}
            {number[number.length - 4] +
              number[number.length - 3] +
              number[number.length - 2] +
              number[number.length - 1]}
          </Text>
          <Text style={[styles.cardInfoText, styles.cardInfoDate]}>
            {date.slice(3)[0]}
            {date.slice(3)[1]}
            {date.slice(3)[2]}
            {date.slice(3)[5]}
            {date.slice(3)[6]}
          </Text>
          */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  minCard: {
    height: 175,
    width: "100%",
    borderRadius: 14,
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
  price: {
    fontFamily: AppConstants.FontExtra,
    fontSize: 18,
  },
  name: {
    fontSize: 20,
  },
  typeBalance: {
    fontSize: 11,
    marginTop: 7,
    fontFamily: "Lato-Regular",
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 11,
    fontFamily: AppConstants.FontRegular,
  },
  cardInfoText: {
    fontSize: 11,
  },
  cardInfoDate: {
    fontFamily: AppConstants.FontExtra,
  },
});

export default Card;
