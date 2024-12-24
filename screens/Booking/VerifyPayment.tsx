import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/common/Header";
import BookingStep from "./components/BookingStep";
import APP_COLORS from "../../constants/color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TicketCard from "./components/TicketCard";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
const VerifyPayment = () => {
  const bankInfo = {
    bank: "VIETINBANK",
    accountHolder: "TUAN TRUNG",
    accountNumber: "111V90677380",
    amount: "300.000đ",
  };

  const ticketInfo = {
    time: "17:45",
    date: "Thứ 6 22/11/2024",
    busType: "C5T",
    vehicleType: "Limousine 34 giường",
    from: "Sài Gòn",
    to: "Đắk Lắk (MT)",
    price: "300.000đ",
  };
  const animationHeight = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    const finalValue = isOpen ? 0 : 350;
    setIsOpen(!isOpen);

    Animated.timing(animationHeight, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const bankDetailsStyle = (isOpen: boolean): ViewStyle => ({
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: isOpen ? 1 : 0,
    borderColor: APP_COLORS.primary,
  });

  const navigation = useNavigation<navigation<"BookingStack">>();
  return (
    <View style={styles.container}>
      <Header title="Đang xác minh thanh toán" />
      <BookingStep currentStep={4} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <TicketCard />

          <View
            style={{
              backgroundColor: "#ffffff",
              paddingHorizontal: 16,
              borderRadius: 16,
              paddingVertical: 16,
            }}
          >
            <View style={styles.noteWrapper}>
              <View style={styles.noteContainer}>
                <Ionicons name="information-circle" size={24} color="gray" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.noteSub}>
                    Nếu giao dịch không thành công, vé sẽ huỷ sau 10:49
                  </Text>
                  <Text style={styles.noteSub}>
                    Nếu giao dịch chưa được xác minh trong 5 phút sau khi chuyển
                    khoản, vui lòng liên hệ 190012423 để được xử lý kịp thời
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginVertical: 16,
              }}
            >
              <Text style={{ fontSize: 16 }}>
                Hệ thống đang tiến hành xác minh giao dịch chuyển khoản, vui
                lòng làm theo Hướng đãn thanh toán bên dưới để hoàn tất thanh
                toán.
              </Text>
            </View>
            {/* Payment Instructions */}
            <Text style={styles.sectionTitle}>Hướng dẫn thanh toán</Text>
            <Text style={styles.instructionText}>
              Bạn vui lòng chuyển khoản số tiền {bankInfo.amount} theo hướng dẫn
              dưới đây
            </Text>

            {/* QR Payment Section */}
            <View style={styles.qrSection}>
              <Text style={styles.paymentMethod}>Thanh toán bằng mã QR</Text>
              <View style={styles.qrContainer}>
                <Image
                  source={require("../../assets/app_img/qr-code.png")}
                  style={styles.qrImage}
                />
                <TouchableOpacity style={styles.saveButton}>
                  <MaterialIcons
                    name="download"
                    size={24}
                    color={APP_COLORS.white}
                  />
                  <Text style={styles.saveButtonText}>Lưu ảnh</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bank Account Details */}
            <View style={styles.bankDetailsHeader}>
              <Text style={styles.bankDetailsTitle}>Không thể quét mã QR?</Text>
              <TouchableOpacity
                style={styles.bankDetailsToggle}
                onPress={toggleAccordion}
              >
                <Text style={styles.bankDetailsToggle}>
                  {isOpen ? "Thu gọn" : "Tự nhập thông tin"}
                </Text>
              </TouchableOpacity>
            </View>
            <Animated.View style={{ height: animationHeight }}>
              <View style={bankDetailsStyle(isOpen)}>
                <View style={styles.bankInfoRow}>
                  <Text style={styles.bankLabel}>Ngân hàng</Text>
                  <Text style={styles.bankValue}>{bankInfo.bank}</Text>
                </View>
                <View style={styles.bankInfoRow}>
                  <Text style={styles.bankLabel}>Chủ tài khoản</Text>
                  <Text style={styles.bankValue}>{bankInfo.accountHolder}</Text>
                </View>
                <View style={styles.bankInfoColumn}>
                  <Text style={styles.bankLabel}>Số tài khoản</Text>
                  <View style={styles.bankValueContainer}>
                    <Text style={styles.bankValue}>
                      {bankInfo.accountNumber}
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.copyButtonText}>Sao chép</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.bankInfoColumn}>
                  <Text style={styles.bankLabel}>Tổng tiền</Text>
                  <View style={styles.bankValueContainer}>
                    <Text style={styles.bankValue}>{bankInfo.amount}</Text>
                    <TouchableOpacity>
                      <Text style={styles.copyButtonText}>Sao chép</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.bankInfoRow}>
                  <Text style={styles.bankLabel}>Nội dung</Text>
                  <Text style={styles.bankValue}>Không bắt buộc</Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.paymentLatterButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.paymentLatterButtonText}>Về trang chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payedButton}
          onPress={() =>
            navigation.navigate("BookingStack", { screen: "FindTrip" })
          }
        >
          <Text style={styles.payedButtonText}>Đặt chuyến về</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    justifyContent: "space-between",
  },
  timerLabel: {
    fontSize: 16,
  },
  timer: {
    fontSize: 16,
    color: "#ff4444",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 16,
  },
  qrSection: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  qrContainer: {
    alignItems: "center",
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: APP_COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  saveButtonText: {
    color: "#fff",
  },
  bankLogos: {
    marginTop: 16,
  },

  bankInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bankLabel: {
    fontSize: 16,
    color: "#666",
  },
  bankValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  copyButtonText: {
    color: APP_COLORS.primary,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  ticketInfo: {
    backgroundColor: APP_COLORS.primary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  ticketTime: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  ticketDate: {
    fontSize: 14,
    color: "#fff",
  },
  busType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "right",
  },
  vehicleType: {
    fontSize: 14,
    color: "#fff",
    textAlign: "right",
  },
  routeInfo: {
    borderTopWidth: 1,
    borderTopColor: "#fff",
    paddingTop: 16,
  },
  routeText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  discountSection: {
    marginBottom: 16,
  },
  discountTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  discountInputContainer: {
    flexDirection: "row",
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: APP_COLORS.primary,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 4,
  },
  applyButtonText: {
    color: "#fff",
  },
  totalSection: {
    marginBottom: 16,
    marginTop: 24,
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLORS.primary,
  },
  priceAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceLabel: {
    fontSize: 16,
    color: APP_COLORS.black,
  },
  bankInfoColumn: {
    flexDirection: "column",
    marginVertical: 4,
  },
  bankValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    backgroundColor: APP_COLORS.white,
    paddingVertical: 16,
    borderRadius: 4,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  bankDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    flex: 1,
  },
  bankDetailsToggle: {
    color: APP_COLORS.primary,
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "right",
  },
  bankDetailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  paymentLatterButton: {
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
  },
  payedButton: {
    backgroundColor: APP_COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  paymentLatterButtonText: {
    color: APP_COLORS.primary,
    fontWeight: "500",
    textDecorationColor: APP_COLORS.primary,
    fontSize: 16,
  },
  payedButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  noteWrapper: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
  },
  noteContainer: {
    flexDirection: "row",
    gap: 8,
  },
  noteSub: {
    fontSize: 16,
    color: "#666",
  },
});
