import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppConstants from "styles/constants";
import Plus from "components/SVGs/Plus";

interface IAddIncomeCategory {
  navigation: INavigation;
  route: IRoute;
}

const AddIncomeCategory: FunctionComponent<IAddIncomeCategory> = ({ navigation, route }) => {
  function onAddCardPressHandler(): void {
    //alert(JSON.stringify(route.params));
    navigation.push("AddIncomeCategory", {
      cardId: route.params.cardId,
    });
  }

  return (
    <TouchableOpacity onPress={onAddCardPressHandler} activeOpacity={AppConstants.ActiveOpacity}>
      <View style={styles.addIncomeCategory}>
        <Plus />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addIncomeCategory: {
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F202F",
    borderRadius: 60,
    marginTop: 35,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default AddIncomeCategory;
