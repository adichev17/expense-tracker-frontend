import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppConstants from "styles/constants";
import Plus from "components/SVGs/Plus";

interface IAddExpenseCategory {
  navigation: INavigation;
  route: IRoute;
}

const AddExpenseCategory: FunctionComponent<IAddExpenseCategory> = ({ navigation, route }) => {
  function onAddExpenseCategoryPressHandler(): void {
    //alert(JSON.stringify(route.params));
    navigation.push("AddExpenseCategory", {
      cardId: route.params.cardId,
    });
  }

  return (
    <TouchableOpacity onPress={onAddExpenseCategoryPressHandler} activeOpacity={AppConstants.ActiveOpacity}>
      <View style={styles.addExpenseCategory}>
        <Plus />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addExpenseCategory: {
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F202F",
    borderRadius: 60,
    marginTop: 35,
    marginLeft: 15,
    marginRight: 35,
  },
});

export default AddExpenseCategory;
