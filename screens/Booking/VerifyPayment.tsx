import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../../App";
import Header from "../../components/common/Header";
import BookingStep from "./components/BookingStep";
import APP_COLORS from "../../constants/color";
import TicketCard from "./components/TicketCard";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";


const VerifyPayment = () => {
  const {data,setData} = useContext(DataContext);

  const handleBackHome =() => {
    setData({id_nguoidung:data["id_nguoidung"],noiDi:data["noiDi"],noiDen:data["noiDen"],ngayKhoiHanh: data["ngayKhoiHanh"]})

    navigation.navigate("Home")
  }

  const navigation = useNavigation<navigation<"BookingStack">>();
  return (
    <View style={styles.container}>
      <Header title="Đặt vé thành công" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Thanh toán: {!data["trangThaiThanhToan"] ? "Đã thanh toán" :"Thanh toán khi lên xe"} </Text>
          <TicketCard type={data["ngayVe"] ? "roundtrip": ""}/> 
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.paymentLatterButton}
          onPress={handleBackHome}
        >
          <Text style={styles.paymentLatterButtonText}>Về trang chủ</Text>
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
