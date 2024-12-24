import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import tinycolor from "tinycolor2";
import APP_COLORS from "../../../constants/color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/stackParamList";

const CancelTicket = () => {
  const navigation = useNavigation<navigation<"TicketInfo">>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("TicketInfo")}
    >
      <View style={styles.upperContainer}>
        <View style={styles.leftSection}>
          <View>
            <Text style={styles.label}>Khởi hành</Text>
            <Text style={styles.timeText}>20:00</Text>
          </View>
          <View>
            <Text style={styles.label}>Chủ nhật</Text>
            <Text style={styles.normalText}>17/11/2024</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.label}>Trạng thái</Text>
            <Text style={styles.normalText}>Chưa thanh toán</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.rightSection}>
          <View>
            <Text style={styles.label}>Biển số xe</Text>
            <Text style={styles.timeText}>51G-741.94</Text>
          </View>
          <View>
            <Text style={styles.label}>Ghế</Text>
            <Text style={styles.normalText}>C1T</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.label}>Lộ trình</Text>
            <Text style={styles.normalText}>Buôn Ma Thuột - Hồ Chí Minh</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <MaterialIcons name="call" size={24} color="black" />
            <Text style={styles.buttonText}>Gọi tài xế</Text>
          </View>
        </TouchableOpacity>
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
  upperContainer: {
    backgroundColor: tinycolor(APP_COLORS.primary).darken(5).toString(),
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
  buttonContainer: {
    padding: 16,
  },
  button: {
    backgroundColor: APP_COLORS.white,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 8,
  },
});

export default CancelTicket;
