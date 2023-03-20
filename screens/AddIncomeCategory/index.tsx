import React, { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import Database from "sql";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import TheLayout from "layouts";
import returnConfigurationData from "libs/config";
import IncomeType from "components/Custom/IncomeType";
import TopPanel from "components/UI/TopPanel";
import Label from "components/UI/Label";
import Input from "components/UI/Input";
import Button from "components/UI/Button";

const IncomeCategoryScreen: FunctionComponent<IScreen> = ({ navigation, route }) => {
  const [category, setCategory] = useState<string>("");

  function onCreateIncomeCategoryPressHandler(): void {
    //alert(JSON.stringify(route.params));
    navigation.push("Income", {
      cardId: route.params.cardId,
    });
  }

  function validateData(): boolean {
    if (category) {
      return true;
    }
    return false;
  }

  return (
    <TheLayout>
      <TopPanel withBack navigation={navigation} backPathname="Income" backParams={{ cardId: route.params.cardId }} />
      <View style={styles.body}>
        <Label>Создание категории дохода</Label>
        <View style={styles.headerInput}>
          <Input
            state={category}
            setState={setCategory}
            placeholder="Введите наименование категории"
            keyboardType="default"
          />
        </View>
        <View style={styles.actionButton}>
          <Button onPressHandler={onCreateIncomeCategoryPressHandler} isValidate={validateData()}>
            Добавить категорию
          </Button>
        </View>
      </View>
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 39,
    paddingBottom: 39,
  },
  headerInput: {
    marginTop: 15,
  },
  headerType: {
    marginTop: 25,
  },
  bodyTypes: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    marginTop: 92,
  },
  headerComment: {
    marginTop: 15,
  },
  bodyComment: {
    marginTop: 15,
  },
});

export default IncomeCategoryScreen;
