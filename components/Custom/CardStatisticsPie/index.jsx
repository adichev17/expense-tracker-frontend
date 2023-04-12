// import React in our code
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

// import all the components we are going to use
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button } from "react-native";
import { VictoryPie } from "victory-native";

const CardStatisticsPie = ({ data }) => {
  const [dataStatistics, setDataStatistics] = useState();
  const [startDate, setStartDate] = useState(new Date(2023, 1, 1));
  const [endDate, setEndDate] = useState(new Date(2023, 4, 1));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [commonAmountExpense, setCommonAmountExpense] = useState(0);

  const colorDataSet = ["green", "green"];

  useEffect(() => {
    var generatedData = generateDataStatistics(data);
    setDataStatistics(generatedData);
  }, []);

  useEffect(() => {
    setCommonAmountExpense(0);
    var generatedData = generateDataStatistics(data);
    setDataStatistics(generatedData);
  }, [startDate]);

  const generateDataStatistics = vardata => {
    var expenseStatistics = [];
    var expenseTestData = Object.assign({}, vardata);
    expenseTestData.transactions = expenseTestData.transactions.filter(
      t => t.category.actionTypeId === 1 && new Date(t.date) > startDate
    );
    //alert(JSON.stringify(expenseTestData.transactions));
    const statistics = expenseTestData.transactions.map(item => {
      var index = expenseStatistics.findIndex(x => x.categoryId === item.category.id);
      var commonaAmount = expenseTestData.transactions
        .map(ca => ca.amount)
        .reduce((accumulator, current) => accumulator + current, 0);
      setCommonAmountExpense(commonaAmount);
      if (index !== -1) {
        expenseStatistics[index].amount += item.amount;
        expenseStatistics[index].percent = Math.round((expenseStatistics[index].amount / commonaAmount) * 100);
        expenseStatistics[index].percentString =
          ((expenseStatistics[index].amount / commonaAmount) * 100).toFixed(0).toString() + "%";
      } else {
        const model = {};
        model.amount = item.amount;
        model.categoryId = item.category.id;
        model.colorId = item.category.colorId;
        model.categoryName = item.category.categoryName;
        model.percent = Math.round((item.amount / commonaAmount) * 100);
        model.percentString = ((item.amount / commonaAmount) * 100).toFixed(0).toString() + "%";
        expenseStatistics.push(model);
      }
    });
    return expenseStatistics;
  };

  const onChangeStart = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setShow(false);
    setStartDate(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setShow(false);
    setEndDate(currentDate);
  };

  const showMode = currentMode => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  function renderDiagramPie(dataStatistics) {
    if (dataStatistics) {
      const renderData = dataStatistics.map(item => {
        return {
          x: item.percentString,
          y: item.percent,
        };
      });
      return (
        <View>
          <VictoryPie
            data={renderData}
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

          <View style={{ position: "absolute", top: "41%", left: "40%" }}>
            <Text style={{ fontSize: 30, lineHeight: 36, textAlign: "center", color: "white" }}>
              {renderData.length}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 22, textAlign: "center", color: "white" }}>Категории</Text>
          </View>
        </View>
      );
    }
  }

  function renderExpenseSummary(dataStatistics) {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 40,
          borderRadius: 13,
          paddingHorizontal: 20,
          backgroundColor: "#2F2D2D",
          color: "white",
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginRight: 40 }}>
          <View style={{ backgroundColor: colorDataSet[item.colorId], width: 15, height: 15 }}></View>
          <Text style={{ marginLeft: 6, color: "#C4B1AE", fontSize: 16, lineHeight: 21 }}>{item.categoryName}</Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: "center" }}>
          <Text style={{ color: "#C4B1AE", fontSize: 16, lineHeight: 22 }}>
            {item.amount} ₽ - {item.percentString}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: 15 }}>
        <FlatList data={dataStatistics} renderItem={renderItem} keyExtractor={item => item.categoryId} />
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <DateTimePicker
          themeVariant="dark"
          locale="ru"
          maximumDate={endDate}
          testID="dateTimeStart"
          value={startDate}
          mode={mode}
          is24Hour={true}
          onChange={onChangeStart}
        />
        <DateTimePicker
          themeVariant="dark"
          locale="ru"
          testID="dateTimeEnd"
          value={endDate}
          mode={mode}
          is24Hour={true}
          onChange={onChangeEnd}
        />
      </View>
      {renderDiagramPie(dataStatistics)}
      <View>
        <Text style={{ fontSize: 18, lineHeight: 22, textAlign: "center", color: "white" }}>
          Сумма расходов: {commonAmountExpense} ₽
        </Text>
      </View>
      <View style={{ position: "absolute", top: "42%", left: "42%" }}></View>
      <ScrollView horizontal={true} contentContainerStyle={{ paddingBottom: 60 }}>
        <View>{renderExpenseSummary(dataStatistics)}</View>
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
