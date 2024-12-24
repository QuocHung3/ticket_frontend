import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";
import tinycolor from "tinycolor2";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TAB_ITEMS = ["Khả dụng", "Hết hạn"];

const CouponScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [inputCoupon, setInputCoupon] = useState("");
  return (
    <View style={styles.container}>
      <Header title="Ưu đãi" />
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          {TAB_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={tabItem(index === tabIndex)}
              onPress={() => setTabIndex(index)}
            >
              <Text style={tabItemText(index === tabIndex)}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <View style={styles.inputIcon}>
              <MaterialCommunityIcons
                name="ticket-percent-outline"
                size={24}
                color={APP_COLORS.black}
              />
            </View>
            <TextInput
              cursorColor={APP_COLORS.primary}
              placeholder="Nhập mã Giảm giá"
              placeholderTextColor={APP_COLORS.lightGray}
              style={styles.inputText}
              value={inputCoupon}
              onChangeText={(text) => setInputCoupon(text)}
            />
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.couponContainer}>
          <Text style={styles.couponTitle}>Bạn chưa có Coupon nào</Text>
        </View>
      </View>
    </View>
  );
};

export default CouponScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EEEEEE",
    width: "100%",
    paddingHorizontal: 8,
    borderRadius: 16,
    paddingVertical: 8,
    gap: 8,
    marginTop: 16,
  },
  inputContainer: {
    marginTop: 16,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: APP_COLORS.gray,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 56,
    flex: 1,
  },
  inputText: {
    flex: 1,
    width: "100%",
    fontSize: 18,
  },
  inputIcon: {
    padding: 4,
  },
  applyButton: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 4,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: APP_COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  couponContainer: {
    marginTop: 16,
  },
  couponTitle: {
    fontSize: 18,
    textAlign: "center",
  },
});

const tabItem = (active: boolean): ViewStyle => ({
  padding: 16,
  borderRadius: 16,
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: active
    ? tinycolor(APP_COLORS.primary).lighten(35).toString()
    : "transparent",
});

const tabItemText = (active: boolean): TextStyle => ({
  color: active ? APP_COLORS.primary : APP_COLORS.black,
  fontWeight: active ? "bold" : "normal",
  fontSize: 16,
});
