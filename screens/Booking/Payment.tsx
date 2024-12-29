import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  ViewStyle,
} from "react-native";
import React, { useEffect, useRef, useState ,useContext} from "react";
import { DataContext } from "../../App";
import Header from "../../components/common/Header";
import BookingStep from "./components/BookingStep";
import APP_COLORS from "../../constants/color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TicketCard from "./components/TicketCard";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import axios from "axios";
import Toast from "react-native-toast-message";

const bankInfo = {
  bank: "VIETINBANK",
  accountHolder: "TUAN TRUNG",
  accountNumber: "111V90677380",
  amount: "300.000đ",
};


const Payment = () => {
  const navigation = useNavigation<navigation<"BookingStack">>();
  const animationHeight = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);
  const {data,setData} = useContext(DataContext);

  useEffect(() => {
    console.log(data);
  },[])
  

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
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const handlePayment = async () => {
    try {
      const rcode =  generateRandomCode(6);

      const dataVe = {
        id_nguoiDung: data["id_nguoidung"],
        id_chuyenXe: data["idChuyen"],
        trangThaiVe: "Đã đặt",
        soGhe: data["viTriCho"],
        gioKH: data["ngayKhoiHanh"],
        viTriCho: data["viTriCho"],
        hinhThuc: "Chuyển khoản", 
        soTien: data["giaVe"],
        trangThaiThanhToan: "Đã thanh toán",
        noiDi: data["noiDi"],
        noiDen: data["noiDen"],
        diemDon: data["diemDon"],
        diemTra: data["diemTra"],
        sdt: data["sdt"],
        ghiChu: data["ghiChu"],
        code: rcode,
        id_xe: data["idXe"],
        email: data["email"],
        soXe: data["soXe"]
      }

      await axios.post('http://192.168.31.45:9999/api/addTicket',dataVe)
      .then(response => {
        if(response && response.data) {
          if(response.status !== 200) {
            Toast.show({
              type: 'error',
              text1: "Có lỗi sảy ra, thử lại!"
            });
            return;
          } else {
            Toast.show({
              type: 'success',
              text1: "Đặt vé thành công!"
            });
          }
        }
      })
      .catch(error => {
        console.log(error)
          Toast.show({
              type: 'error',
              text1: "Có lỗi!"
            });
            return;
      });
    } catch (error) {
      console.log(error)
      Toast.show({
          type: 'error',
          text1: "Có lỗi!"
        });
        return;
    }
    
    navigation.navigate("VerifyPayment");
  }

  return (
    <View style={styles.container}>
      <Header title="Thanh toán" />
      <ScrollView>
        <View style={styles.content}>
          <BookingStep currentStep={4} />

          {/* Payment Timer */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Thời gian thanh toán còn lại:</Text>
            <Text style={styles.timer}>
              {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </Text>
          </View>

          {/* Payment Instructions */}
          <Text style={styles.sectionTitle}>Hướng dẫn thanh toán</Text>
          <Text style={styles.instructionText}>
            Bạn vui lòng chuyển khoản số tiền {data['giaVe']}đ theo hướng dẫn
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
                  <Text style={styles.bankValue}>{bankInfo.accountNumber}</Text>
                  <TouchableOpacity>
                    <Text style={styles.copyButtonText}>Sao chép</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bankInfoColumn}>
                <Text style={styles.bankLabel}>Tổng tiền</Text>
                <View style={styles.bankValueContainer}>
                  <Text style={styles.bankValue}>{data['giaVe']}</Text>
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

          <TicketCard />

          {/* Discount Code Section */}
          <View style={styles.discountSection}>
            <Text style={styles.discountTitle}>Bạn có mã giảm giá?</Text>
            <View style={styles.discountInputContainer}>
              <TextInput
                style={styles.discountInput}
                placeholder="Nhập mã giảm giá"
              />
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Total Amount */}
          <View style={styles.totalSection}>
            <Text style={styles.totalTitle}>Số tiền cần thanh toán</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Giá vé</Text>
              <Text style={styles.priceAmount}>{data["giaVe"]}đ</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng tiền</Text>
              <Text style={styles.totalAmount}>{data["giaVe"]}đ</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.payedButton}
          onPress={handlePayment}
        >
          <Text style={styles.payedButtonText}>Tôi đã chuyển khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentLatterButton} onPress={() => {}}>
          <Text style={styles.paymentLatterButtonText}>Chuyển khoản sau</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  content: {
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
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
    flexDirection: "column",
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  paymentLatterButton: {
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
  },
  payedButton: {
    backgroundColor: APP_COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  paymentLatterButtonText: {
    color: APP_COLORS.primary,
    fontWeight: "500",
    textDecorationLine: "underline",
    textDecorationColor: APP_COLORS.primary,
    fontSize: 16,
  },
  payedButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
});
