import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import tinycolor from "tinycolor2";
import APP_COLORS from "../../../constants/color";

const CurrentNoti = ({data}) => {

  return (
    <TouchableOpacity
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <View>
            <Text style={styles.label}>Tiêu đề</Text>
            <Text style={styles.timeText}>{data.TieuDe}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.rightSection}>
            <View style={styles.statusContainer}>
                <Text style={styles.label}>Nội dung</Text>
                <Text style={styles.normalText}>{data.NoiDung}</Text>
            </View>
          <View>
            <Text style={styles.label}>Ngày</Text>
            <Text style={styles.normalText}>{data.Ngay}</Text>
          </View>
          <View>
            <Text style={styles.label}>Giờ</Text>
            <Text style={styles.normalText}>{data.Gio}</Text>
          </View>
          
        </View>
      </View>
      <View style={styles.cancelContainer}>
        <Text style={styles.cancelText}>Xem chi tiết</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tinycolor(APP_COLORS.primary).lighten(35).toString(),
    borderRadius: 32,
    elevation: 4,
    marginVertical: 20
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
    fontSize: 20,
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

export default CurrentNoti;
