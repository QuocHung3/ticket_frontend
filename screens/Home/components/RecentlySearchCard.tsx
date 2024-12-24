import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import APP_COLORS from "../../../constants/color";

const RecentlySearchCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="circle" size={12} color={APP_COLORS.primary} />
        <View style={styles.verticalLine} />
        <Feather name="map-pin" size={12} color={APP_COLORS.primary} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.flex}>
            <Text numberOfLines={1} style={styles.cityText}>
              Buôn Ma Thuột
            </Text>
          </View>
          <View>
            <Feather name="arrow-right-circle" size={20} color="black" />
          </View>
        </View>

        <Text numberOfLines={1} style={styles.destinationText}>
          Hồ Chí Minh
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Chủ nhật, 17/11/2024</Text>
        </View>
      </View>
    </View>
  );
};

export default RecentlySearchCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: APP_COLORS.white,
    elevation: 4,
    borderRadius: 16,
    padding: 16,
    width: 220,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
  },
  verticalLine: {
    flex: 0.2,
    width: 1,
    backgroundColor: APP_COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flex: {
    flex: 1,
  },
  cityText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  destinationText: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 8,
  },
  dateContainer: {
    marginTop: 8,
  },
  dateText: {
    color: APP_COLORS.lightGray,
  },
});
