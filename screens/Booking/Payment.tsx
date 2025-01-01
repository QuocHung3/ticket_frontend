import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState ,useContext} from "react";
import { DataContext } from "../../App";
import Header from "../../components/common/Header";
import BookingStep from "./components/BookingStep";
import APP_COLORS from "../../constants/color";
import TicketCard from "./components/TicketCard";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useStripe } from '@stripe/stripe-react-native';

const Payment = () => {
  const navigation = useNavigation<navigation<"BookingStack">>();
  const [loading, setLoading] = useState(false);
  const {data,setData} = useContext(DataContext);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState(null);
  
    const fetchPaymentSheetParams = async () => {
      try {
        const response = await fetch('http://192.168.194.157:9999/api/payment-sheet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({
            giaVe: data["giaVe"], 
          }),
        });
        const { paymentIntent } = await response.json();
        setClientSecret(paymentIntent);
      } catch (error) {
        console.error('Error fetching payment sheet parameters:', error);
        Alert.alert('Lỗi', 'Không thể lấy thông số bảng thanh toán.');
      }
    };
  
    const initializePaymentSheet = async () => {
      if (!clientSecret) return;
  
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'QuocHung',
      });
  
      if (error) {
        console.error('Lỗi không thể tạo bảng thanh toán:', error);
        Alert.alert('Lỗi!', error.message);
      }

      await openPaymentSheet();
    };
  
    const openPaymentSheet = async () => {
      const { error } = await presentPaymentSheet();
  
      if (error) {
        Alert.alert('Lỗi!', "Lỗi thanh toán");
      } else {
        Alert.alert('Thành công', 'Thanh toán hoàn tất!');
      }

      await handlePayment("Đã thanh toán");
    };
  
    useEffect(() => {
      fetchPaymentSheetParams();
    }, []);

  useEffect(() => {
    console.log(data);
  },[])
  
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

  const handlePayLater = async () => {
    setData({...data, trangThaiThanhToan: "Chưa thanh toán"})

    await handlePayment("Chưa thanh toán");
    navigation.navigate("VerifyPayment");
  }

  const handlePayment = async (trangThai) => {
    setLoading(true);
    try {
      const rcode =  generateRandomCode(6);

      const dataVe = {
        id_nguoiDung: data["id_nguoidung"],
        id_chuyenXe: data["idChuyen"],
        id_chuyenXeV: data["idChuyenV"],
        trangThaiVe: "Đã đặt",
        soGhe: data["viTriCho"],
        soGheV: data["viTriChoV"],
        gioKH: data["ngayKhoiHanh"],
        gioKHV: data["ngayVe"],
        viTriCho: data["viTriCho"],
        viTriChoV: data["viTriChoV"],
        hinhThuc: trangThai === "Chưa thanh toán" ? "Thanh toán khi lên xe" : "Chuyển khoản", 
        soTien: data["giaVe"],
        soTienV: data["giaVeV"],
        trangThaiThanhToan: trangThai,
        noiDi: data["noiDi"],
        noiDen: data["noiDen"],
        diemDon: data["diemDon"],
        diemDonV: data["diemDonV"],
        diemTra: data["diemTra"],
        diemTraV: data["diemTraV"],
        sdt: data["sdt"],
        ghiChu: data["ghiChu"],
        code: rcode,
        id_xe: data["idXe"],
        id_xeV: data["idXeV"],
        email: data["email"],
        soXe: data["soXe"],
        soXeV: data["soXeV"],
        donTai: data["donTai"],
        donTaiV: data["donTaiV"],
        traTaiV: data["traTaiV"]
      }

      await axios.post('http://192.168.194.157:9999/api/addTicket',dataVe)
      .then(response => {
        if(response && response.data) {
          if(response.status !== 200) {
            setLoading(false);
            Toast.show({
              type: 'error',
              text1: "Có lỗi sảy ra, thử lại!"
            });
            return;
          } else {
            setLoading(false);
            Toast.show({
              type: 'success',
              text1: "Đặt vé thành công!"
            });
            navigation.navigate("VerifyPayment");
          }
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        Toast.show({
            type: 'error',
            text1: "Có lỗi!"
          });
          return;
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
          type: 'error',
          text1: "Có lỗi!"
        });
        return;
    }
    
    
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

          <TicketCard type={""} />
          {data["ngayVe"] && <TicketCard type={"roundtrip"} />}
          

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
        {loading ? 
        <TouchableOpacity
          style={styles.payedButton}
        >
          <Text style={styles.payedButtonText}><ActivityIndicator /></Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.payedButton}
          onPress={initializePaymentSheet}
        >
          <Text style={styles.payedButtonText}>Thanh toán bằng Stripe</Text>
        </TouchableOpacity>
        }
        <TouchableOpacity style={styles.paymentLatterButton} onPress={handlePayLater}>
          <Text style={styles.paymentLatterButtonText}>Thanh toán khi lên xe</Text>
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
