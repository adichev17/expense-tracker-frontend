import React, { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";
import Database from "sql";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import TheLayout from "layouts";
import TopPanel from "components/UI/TopPanel";
import Label from "components/UI/Label";
import { ResponsivePie } from "@nivo/pie";
import CardStatisticsPie from "components/Custom/CardStatisticsPie";

const CardStatisticsScreen: FunctionComponent<IScreen> = ({ navigation, route }) => {
  const [category, setCategory] = useState<string>("");

  function onCreateExpenseCategoryPressHandler(): void {
    //alert(JSON.stringify(route.params));
    navigation.push("Expense", {
      cardId: route.params.cardId,
    });
  }

  const testData = [
    {
      id: "haskell",
      label: "haskell",
      value: 569,
      color: "hsl(77, 70%, 50%)",
    },
    {
      id: "javascript",
      label: "javascript",
      value: 595,
      color: "hsl(272, 70%, 50%)",
    },
    {
      id: "java",
      label: "java",
      value: 453,
      color: "hsl(188, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 302,
      color: "hsl(19, 70%, 50%)",
    },
    {
      id: "make",
      label: "make",
      value: 166,
      color: "hsl(74, 70%, 50%)",
    },
  ];

  return (
    <TheLayout>
      <TopPanel withBack navigation={navigation} backPathname="Card" backParams={{ id: route.params.cardId }} />
      <View style={styles.body}>
        <Label>Расходы</Label>
        <CardStatisticsPie data={testData} />
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

export default CardStatisticsScreen;
