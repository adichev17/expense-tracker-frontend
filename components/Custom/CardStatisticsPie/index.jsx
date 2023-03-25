// import React in our code
import React from "react";

// import all the components we are going to use
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { VictoryPie } from "victory-native";

const CardStatisticsPie = ({ data }) => {
  const victoryPieData = data.map(item => {
    return {
      x: item.percentString,
      y: item.percent,
    };
  });

  function renderExpenseSummary(data) {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 40,
          borderRadius: 13,
          paddingHorizontal: 20,
          backgroundColor: "#858786",
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginRight: 40 }}>
          <Text style={{ marginLeft: 6, color: "#C4B1AE", fontSize: 16, lineHeight: 21 }}>{item.categoryName}</Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: "center" }}>
          <Text style={{ color: "#C4B1AE", fontSize: 16, lineHeight: 22 }}>
            {item.amount} Р - {item.percentString}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: 15 }}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.categoryId} />
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <VictoryPie
        data={victoryPieData}
        style={{
          labels: { fill: "white", fontSize: 16, lineHeight: 22 },
          parent: {
            ...styles.shadow,
          },
        }}
        innerRadius={70}
        width={370}
        height={370}
        labelRadius={({ innerRadius }) => (370 * 0.4 + innerRadius) / 2.5}
        colorScale={["#006400", "#708090", "#9370DB", "cyan", "navy", "black"]}
      />

      <View style={{ position: "absolute", top: "42%", left: "42%" }}></View>
      <ScrollView horizontal={true} contentContainerStyle={{ paddingBottom: 60 }}>
        <View>{renderExpenseSummary(data)}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
export default CardStatisticsPie;
