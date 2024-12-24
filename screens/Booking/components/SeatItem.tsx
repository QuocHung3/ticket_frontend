import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import APP_COLORS from "../../../constants/color";
import { Dimensions } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

let ROW_SEAT = 3; // 2 or 3

const WIDTH_ITEM =
  ROW_SEAT === 2
    ? Dimensions.get("window").width / 5
    : Dimensions.get("window").width / 8;

const HEIGHT_ITEM = WIDTH_ITEM * 1.5;

interface SeatItemProps {
  isSelected?: boolean;
  onPress?: () => void;
  isSold?: boolean;
  seatName?: string;
}

const SeatItem = ({ isSelected, onPress, isSold, seatName }: SeatItemProps) => {
  const container = (): ViewStyle => ({
    backgroundColor: isSold
      ? "#e0e0e0"
      : isSelected
      ? "pink"
      : APP_COLORS.white,
    borderRadius: 8,
    width: WIDTH_ITEM,
    height: HEIGHT_ITEM,
    borderWidth: 4,
    borderColor: isSold ? APP_COLORS.white : "red",
    justifyContent: "space-between",
  });

  const seatFooter = (): ViewStyle => ({
    flexDirection: "row",
    height: 20,
    borderRadius: 8,
    backgroundColor: isSold
      ? "transparent"
      : isSelected
      ? "pink"
      : "transparent",
    marginHorizontal: 4,
    borderWidth: 4,
    borderColor: isSold ? "white" : "red",
    marginBottom: 4,
  });

  return (
    <TouchableOpacity style={container()} onPress={onPress} disabled={isSold}>
      {!isSold && <Text style={styles.seatName}>{seatName}</Text>}
      {isSold && (
        <AntDesign
          name="close"
          size={ROW_SEAT === 2 ? 32 : 24}
          color={APP_COLORS.white}
          style={styles.soldIcon}
        />
      )}
      <View style={seatFooter()}></View>
    </TouchableOpacity>
  );
};

export default SeatItem;

const styles = StyleSheet.create({
  seatName: {
    fontSize: 12,
    textAlign: "center",
    marginTop: "auto",
    marginBottom: ROW_SEAT === 2 ? 8 : 4,
    color: "red",
  },
  soldIcon: {
    textAlign: "center",
    marginTop: ROW_SEAT === 2 ? 16 : 8,
  },
});
