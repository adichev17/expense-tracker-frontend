import React, { FunctionComponent } from "react";
import { TouchableOpacity, StyleSheet, Dimensions, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import AppConstants from "styles/constants";

interface ISkin {
  id: number;
  state: number;
  color: string;
  setState: any;
}

const Skin: FunctionComponent<ISkin> = ({ id, state, color, setState = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={AppConstants.ActiveOpacity}
      onPress={() => {
        setState(id);
      }}
    >
      <Animatable.View transition="opacity" style={state === id ? {} : { opacity: 0.5 }}>
        <View style={{ backgroundColor: color, padding: 10, height: 50, width: 50, borderRadius: 30 }}>
          <Text></Text>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  skin: {
    height: 80,
    width: 80,
    padding: 10,
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
