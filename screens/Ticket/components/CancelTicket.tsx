import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import tinycolor from "tinycolor2";
import APP_COLORS from "../../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/stackParamList";

const CancelTicket = ({data}) => {
  const navigation = useNavigation<navigation<"TicketInfo">>();

  const date = data.GioKhoiHanh.substring(0, 10);
  const time = data.GioKhoiHanh.substring(12, 16);
  return (
    <TouchableOpacity
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <View>
            <Text style={styles.label}>Khởi hành</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View>
            <Text style={styles.label}>Chủ nhật</Text>
            <Text style={styles.normalText}>{date}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.label}>Trạng thái</Text>
            <Text style={styles.normalText}>{data.TrangThaiThanhToan}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.rightSection}>
          <View>
            <Text style={styles.label}>Biển số xe</Text>
            <Text style={styles.plateText}>{data.SoXe}</Text>
          </View>
          <View>
            <Text style={styles.label}>Ghế</Text>
            <Text style={styles.normalText}>{data.ViTriCho}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.label}>Lộ trình</Text>
            <Text style={styles.normalText}>{data.noiDi} - {data.noiDen}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cancelContainer}>
        <Text style={styles.cancelText}>Đã huỷ</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tinycolor(APP_COLORS.primary).lighten(35).toString(),
    borderRadius: 32,
    elevation: 4,
  },
  contentContainer: {
    backgroundColor: APP_COLORS.white,
    flexDirection: "row",
    borderRadius: 32,
    padding: 16,
  },
  leftSection: {
    flex: 0.5,
  },
  rightSection: {
    flex: 1,
  },
  label: {
    color: APP_COLORS.lightGray,
    fontSize: 16,
  },
  timeText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  plateText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  normalText: {
    fontSize: 16,
  },
  statusContainer: {
    marginTop: 8,
  },
  divider: {
    height: "100%",
    width: 1,
    backgroundColor: APP_COLORS.lightGray,
    marginHorizontal: 8,
  },
  cancelContainer: {
    padding: 16,
  },
  cancelText: {
    color: "red",
  },
});

export default CancelTicket;
