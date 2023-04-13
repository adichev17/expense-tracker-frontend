import React, { FunctionComponent } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppConstants from "styles/constants";
import BigBlackPlus from "components/SVGs/BigBlackPlus";

interface IIncomeButton {
  navigation: INavigation;
  route: IRoute;
}

const ScannerButton: FunctionComponent<IIncomeButton> = ({ navigation, route }) => {
  function onPressHandler(): void {
    //alert(JSON.stringify(route.params));
    navigation.push("Scanner", {
      cardId: route.params.id,
    });
  }

  return (
    <TouchableOpacity onPress={onPressHandler} activeOpacity={AppConstants.ActiveOpacity}>
      <View style={[styles.expandButton, styles.shadow]}>
        <Text style={styles.header}>QR</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  expandButton: {
    height: (Dimensions.get("window").width / 2 - 38) / 2 - 7,
    width: Dimensions.get("window").width / 2 - 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9F8F8",
  },
  shadow: {
    shadowColor: "#D6EBF1",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12.78,
    elevation: 12,
  },
  header: {
    fontFamily: AppConstants.FontExtra,
    fontSize: 14,
  },
  desc: {
    fontFamily: AppConstants.FontRegular,
    marginTop: 8,
    fontSize: 10,
  },
});

export default ScannerButton;
