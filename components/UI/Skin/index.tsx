import { LinearGradient } from "expo-linear-gradient";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";

interface ISkin {
  id: number;
  state: number;
  colors: string[];
  setState: any;
}

const Skin: FunctionComponent<ISkin> = ({ id, state, colors = [], setState = () => {} }) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setState(id);
        }}
      >
        <LinearGradient style={[styles.skin, state === id && styles.withShadow]} colors={colors}></LinearGradient>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  skin: {
    height: 195,
    backgroundColor: "green",
    width: Dimensions.get("window").width / 5 - 21,
    borderRadius: 20,
    opacity: 0.7,
  },
  withShadow: {
    opacity: 1,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24.78,
    elevation: 22,
  },
});

export default Skin;