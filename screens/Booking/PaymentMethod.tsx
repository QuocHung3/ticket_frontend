import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import BookingStep from "./components/BookingStep";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import APP_COLORS from "../../constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
const PaymentOption = () => {
  const navigation = useNavigation<navigation<"BookingStack">>();
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Chọn hình thức thanh toán" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <BookingStep currentStep={4} />

        {/* Payment Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>Thời gian thanh toán còn lại: </Text>
          <Text style={styles.timerCount}>
            {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </Text>
        </View>

        {/* Safe Payment Section */}

        {/* Bank Transfer Option */}
        <TouchableOpacity style={styles.paymentOption}>
          <View style={styles.safePayment}>
            <Text style={styles.safeText}>An toàn & tiện lợi </Text>
            <Ionicons name="shield-checkmark" size={14} color="white" />
          </View>
          <View style={styles.optionContent}>
            <View style={styles.leftContent}>
              <MaterialIcons
                name="check-circle"
                size={24}
                color={APP_COLORS.blue}
              />
              <View>
                <Text style={styles.optionTitle}>
                  Chuyển khoản liên ngân hàng / ví điện tử
                </Text>
                <Text style={styles.optionDesc}>
                  Không cần nhập thông tin chuyển khoản, vừa nhanh chóng vừa chủ
                  động
                </Text>
              </View>
            </View>
            <View style={styles.qrIcon}>
              <MaterialIcons
                name="qr-code-scanner"
                size={36}
                color={APP_COLORS.blue}
              />
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.supportText}>
          Hỗ trợ nhiều ví điện tử cùng hơn 42 ngân hàng
        </Text>
      </ScrollView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Đóng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("Payment")}
        >
          <Text style={styles.continueText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  timerContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timerText: {
    fontSize: 16,
    color: APP_COLORS.blue,
  },
  timerCount: {
    color: "#ff4444",
    fontWeight: "bold",
  },
  safePayment: {
    backgroundColor: APP_COLORS.primary,
    marginBottom: 16,
    position: "absolute",
    top: 0,
    left: 0,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  safeText: {
    color: "white",
    fontWeight: "500",
  },
  paymentOption: {
    backgroundColor: APP_COLORS.aliceBlue,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginTop: 16,
  },
  leftContent: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
    alignItems: "center",
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: APP_COLORS.blue,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: APP_COLORS.blue,
  },
  optionDesc: {
    fontSize: 14,
    color: "#666",
  },
  qrIcon: {
    marginLeft: 12,
  },
  supportText: {
    fontSize: 15,
    color: APP_COLORS.blue,
    marginBottom: 24,
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  continueButton: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  cancelText: {
    color: "#666",
    fontWeight: "500",
  },
  continueText: {
    color: "white",
    fontWeight: "500",
  },
});
