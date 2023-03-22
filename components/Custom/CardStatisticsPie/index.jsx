// import React in our code
import React from "react";

// import all the components we are going to use
import { SafeAreaView, Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { VictoryPie } from "victory-native";

const CardStatisticsPie = ({ data }) => {
  const [categories, setCategories] = React.useState();
  // alert(JSON.stringify(data));
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <VictoryPie
        data={[
          { x: "Cats", y: 30 },
          { x: "Dogs", y: 30 },
          { x: "Birds", y: 30 },
        ]}
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
