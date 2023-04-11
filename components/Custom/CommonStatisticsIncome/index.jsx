// import React in our code
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

// import all the components we are going to use
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

const ExpensesTestData = [
  { date: "03/04", amount: 100 },
  { date: "05/04", amount: 210 },
  { date: "06/04", amount: 370 },
  { date: "07/04", amount: 420 },
  { date: "08/04", amount: 500 },
];

const chartTheme = {
  axis: {
    style: {
      tickLabels: {
        // this changed the color of my numbers to white
        fill: "white",
        fontSize: 15,
        padding: 15,
        fontWeight: 100,
      },
      grid: {
        stroke: "gray", //CHANGE COLOR OF X-AXIS GRID LINES
        strokeDasharray: "1",
      },
    },
  },
};

const CommonStatisticsIncomeLine = () => {
  function renderDiagramPie() {
    return (
      <View>
        <VictoryChart theme={chartTheme} minDomain={{ y: 100 }}>
          <VictoryLine animate x="date" y="amount" style={{ data: { stroke: "white" } }} data={ExpensesTestData} />
        </VictoryChart>
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {renderDiagramPie()}
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
export default CommonStatisticsIncomeLine;
