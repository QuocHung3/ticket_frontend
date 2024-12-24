import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import APP_COLORS from "../../../constants/color";
import tinycolor from "tinycolor2";

interface BookingStepProps {
  currentStep: number;
}
const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const BookingStep = ({ currentStep }: BookingStepProps) => {
  const step = (step: number): ViewStyle => ({
    width: 24,
    height: 24,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
    backgroundColor: step <= currentStep ? APP_COLORS.primary : "transparent",
  });

  const iconColor = (step: number): string =>
    step <= currentStep ? APP_COLORS.white : APP_COLORS.primary;

  return (
    <View style={styles.container}>
      <View style={step(1)}>
        <MaterialIcons name="event-seat" size={18} color={iconColor(1)} />
      </View>
      <HorizontalLine />
      <View style={step(2)}>
        <FontAwesome6
          name="arrow-right-arrow-left"
          size={14}
          style={{ transform: [{ rotate: "90deg" }] }}
          color={iconColor(2)}
        />
      </View>
      <HorizontalLine />
      <View style={step(3)}>
        <FontAwesome name="user-circle-o" size={16} color={iconColor(3)} />
      </View>
      <HorizontalLine />
      <View style={step(4)}>
        <MaterialIcons name="credit-card" size={18} color={iconColor(4)} />
      </View>
    </View>
  );
};

export default BookingStep;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
    marginVertical: 10,
  },
  line: {
    backgroundColor: tinycolor(APP_COLORS.primary).lighten(30).toString(),
    height: 1.5,
    width: 24,
  },
});
