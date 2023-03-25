import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppConstants from "styles/constants";
import Plus from "components/SVGs/Plus";

interface IAddCard {
  navigation: INavigation;
}

const AddCard: FunctionComponent<IAddCard> = ({ navigation }) => {
  function onAddCardPressHandler(): void {
    navigation.push("AddCard");
  }

  return (
    <TouchableOpacity onPress={onAddCardPressHandler} activeOpacity={AppConstants.ActiveOpacity}>
      <View style={styles.addCard}>
        <Plus />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addCard: {
    height: 60,
    width: 60,
    marginTop: 55,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292727",
    borderRadius: 35,
  },
});

export default AddCard;
