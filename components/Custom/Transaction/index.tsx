import React, { FunctionComponent } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppConstants from "styles/constants";
import returnConfigurationData from "libs/config";
import toPriceFormat from "libs/toPriceFormat";
import toDateFormat from "libs/toDateFormat";

interface ITransactionC {
  navigation: INavigation;
  data?: ITransaction;
}

const Transaction: FunctionComponent<ITransactionC> = ({ navigation, data = {} }) => {
  function goToTransaction() {
    navigation.push("Transaction", { id: data.id });
  }
  return (
    <TouchableOpacity activeOpacity={AppConstants.ActiveOpacity} onPress={goToTransaction}>
      <View style={styles.transaction}>
        <View style={styles.transactionInfo}>
          <View style={styles.transactionType}>
            <Image
              source={{
                uri: data.category?.imageUri,
              }}
              style={styles.transactionImage}
            />
          </View>
          <View style={styles.transactionInfoText}>
            <Text style={styles.transactionInfoHeader}>{data.category?.categoryName}</Text>
            <Text style={styles.transactionInfoDate}>{toDateFormat(data.date || "")}</Text>
          </View>
        </View>
        <Text style={styles.transactionText}>
          {data.category?.actionTypeId === 2 ? "+ " : "- "}
          {toPriceFormat(data.amount || 0)} ₽
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  transaction: {
    backgroundColor: "#2F2D2D",
    height: 75,
    width: "100%",
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 12,
  },
  transactionInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionInfoText: {
    marginTop: -3,
    marginLeft: 10,
  },
  transactionType: {
    borderRadius: 80,
    width: 47,
    height: 47,
    backgroundColor: "#161622",
    alignItems: "center",
    justifyContent: "center",
  },
  transactionInfoHeader: {
    fontFamily: AppConstants.FontExtra,
    color: "#E2E2E2",
  },
  transactionInfoDate: {
    fontFamily: AppConstants.FontRegular,
    fontSize: 11,
    color: "#9E9E9E",
    marginTop: 4,
  },
  transactionImage: {
    width: 24,
    height: 24,
  },
  transactionText: {
    fontFamily: AppConstants.FontExtra,
    color: "#E2E2E2",
    fontSize: 12,
  },
});

export default Transaction;
