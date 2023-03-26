import React, { FunctionComponent } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppConstants from "styles/constants";

interface IExpenseButton {
  navigation: INavigation;
  route: IRoute;
}

const ExpenseButton: FunctionComponent<IExpenseButton> = ({ navigation, route }) => {
  function onPressHandler(): void {
    navigation.push("Expense", {
      cardId: route.params.id,
    });
  }

  return (
    <TouchableOpacity onPress={onPressHandler} activeOpacity={AppConstants.ActiveOpacity}>
      <View style={[styles.button, styles.shadow]}>
        <Text style={styles.text}>Расход</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: (Dimensions.get("window").width / 2 - 38) / 2 - 7,
    width: Dimensions.get("window").width / 2 - 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EB9486",
  },
  shadow: {
    shadowColor: "#FACCD2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10.78,
    elevation: 10,
  },
  text: {
    fontFamily: AppConstants.FontExtra,
    fontSize: 14,
  },
});

export default ExpenseButton;
