import { View, Text, StyleSheet } from "react-native";
import React from "react";
import APP_COLORS from "../../../constants/color";
import tinycolor from "tinycolor2";

const TicketCard = () => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.notch, styles.leftNotch]} />

      <View style={[styles.notch, styles.rightNotch]} />

      <View style={styles.container}>
        <View style={styles.upperSection}>
          <View>
            <Text style={styles.label}>Khởi hành</Text>
            <Text style={styles.time}>17:45</Text>
            <Text style={styles.label}>Thứ 7</Text>
            <Text style={styles.date}>23/11/2024</Text>
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.label}>Ghế</Text>
            <Text style={styles.seat}>B4T</Text>
            <Text style={styles.label}>Loại xe</Text>
            <Text style={styles.busType}>Limousine 34 giường</Text>
          </View>
        </View>

        <View style={styles.dashedLine} />

        <View style={styles.lowerSection}>
          <View>
            <Text style={styles.location}>Sài Gòn</Text>
            <Text style={styles.priceLabel}>Giá vé</Text>
          </View>
          <View style={styles.rightAlign}>
            <Text style={styles.location}>Đắk Lắk (MT)</Text>
            <Text style={styles.price}>300.000đ</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
    position: "relative",
  },
  container: {
    backgroundColor: tinycolor(APP_COLORS.primary).darken(5).toHexString(),
    borderRadius: 20,
    padding: 20,
  },
  notch: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 999,
    zIndex: 1,
    bottom: 96,
  },
  leftNotch: {
    left: -12,
  },
  rightNotch: {
    right: -12,
  },
  upperSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  divider: {
    width: 1,
    backgroundColor: APP_COLORS.lightGray,
    marginHorizontal: 15,
  },
  dashedLine: {
    height: 1,
    backgroundColor: APP_COLORS.lightGray,
    marginVertical: 32,
  },
  label: {
    color: APP_COLORS.lightGray,
    opacity: 0.8,
    fontSize: 14,
    marginTop: 5,
  },
  time: {
    color: APP_COLORS.black,
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    color: APP_COLORS.black,
    fontSize: 16,
  },
  seat: {
    color: APP_COLORS.black,
    fontSize: 24,
    fontWeight: "bold",
  },
  busType: {
    color: APP_COLORS.black,
    fontSize: 16,
  },
  lowerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: {
    color: APP_COLORS.black,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    color: APP_COLORS.black,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  rightAlign: {
    alignItems: "flex-end",
  },
  priceLabel: {
    color: APP_COLORS.black,
    fontSize: 14,
    marginTop: 5,
  },
});

export default TicketCard;
