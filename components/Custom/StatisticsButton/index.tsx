import React, { FunctionComponent } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppConstants from "styles/constants";
import BigBlackPlus from "components/SVGs/BigBlackPlus";

interface IStatisticsButton {
  navigation: INavigation;
  route: IRoute;
}

const StatisticsButton: FunctionComponent<IStatisticsButton> = ({ navigation, route }) => {
  function onPressHandler(): void {
    //alert(JSON.stringify(route.params));
    navigation.push("CardStatistics", {
      cardId: route.params.id,
    });
  }

  return (
    <TouchableOpacity onPress={onPressHandler} activeOpacity={AppConstants.ActiveOpacity}>
      <LinearGradient
        style={[styles.statisticsButton, styles.shadow]}
        end={{ x: 0.9, y: 0.2 }}
        colors={["#CCF0FA", "#E5E5E5"]}
      >
        <Text style={styles.header}>Статистика</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statisticsButton: {
    height: (Dimensions.get("window").width / 2 - 38) / 2 - 7,
    width: Dimensions.get("window").width / 2 - 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
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

export default StatisticsButton;
