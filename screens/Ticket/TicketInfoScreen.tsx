import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../ticket_frontend/types/stackParamList";
import Modal from "../../components/common/Modal";
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';

const TicketInfoScreen = ({route}) => {
  const [visibleCancel,setVisibleCancel] = useState(false);
  const data = route.params;
  const navigation = useNavigation<navigation<"RootTab">>();

  console.log(data)
  
  const ticket = {
    code: data.code,
    name: 'Nguyen Van A',
    phone: data.SDT,
    trip: `${data.noiDi} - ${data.noiDen}`,
    seat: data.ViTriCho,
    departure: data["GioKhoiHanh"]?.substring(0,10),
    time: data["GioKhoiHanh"]?.substring(11,19),
  };

  const generateAndSharePDF = async () => {
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                font-size: 14px;
                line-height: 1.6;
              }
              h1 {
                text-align: center;
                color: #333;
              }
              .info {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #555;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #888;
              }
            </style>
          </head>
          <body>
            <h1>Nhà Xe Tuấn Trung</h1>
            <div class="info">
              <p><span class="label">Mã vé:</span> ${ticket.code}</p>
              <p><span class="label">Tên khách hàng:</span> ${ticket.name}</p>
              <p><span class="label">Số điện thoại:</span> ${ticket.phone}</p>
              <p><span class="label">Chuyến:</span> ${ticket.trip}</p>
              <p><span class="label">Ghế:</span> ${ticket.seat}</p>
              <p><span class="label">Ngày khởi hành:</span> ${ticket.departure}</p>
              <p><span class="label">Giờ khởi hành:</span> ${ticket.time}</p>
            </div>
            <div class="footer">
              &copy; 2025 Nhà Xe Tuấn Trung | Số 1, Đường ABC, Thành phố XYZ
            </div>
          </body>
        </html>
      `;

      // Tạo file PDF
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    // Tạo đường dẫn mới với tên file custom
    const newFileName = `${FileSystem.documentDirectory}ve-xe-khach-${Date.now()}.pdf`;

    // Di chuyển file để đổi tên
    await FileSystem.moveAsync({
      from: uri,
      to: newFileName,
    });

    // Chia sẻ file PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(newFileName);
    } else {
      alert('Không thể chia sẻ file');
    }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tạo hoặc chia sẻ file PDF');
      console.error(error);
    }
  };

  const handleCancel = () => {
    try {
      let cho = data.ViTriCho;
      if(cho.length > 5) cho = data.ViTriCho.split(" ");
      else cho = [data.ViTriCho]
 
      axios.post('http://192.168.31.45:9999/api/cancelTicket',
      {trangThaiVe: "Đã huỷ",ID_Ve:data.ID_Ve,viTriCho:cho,id_chuyenXe:data.ID_Xe})
      .then(response => {
        if(response && response.data) {
          if(response.status !== 200) {
            Toast.show({
              type: 'error',
              text1: "Đã sảy ra lỗi!"
            });
            return;
          } else {
            Toast.show({
              type: 'success',
              text1: "Huỷ vé thành công!"
            });
            
            navigation.navigate("RootTab");
          }
        }
      })
      .catch(error => {
          console.log(error)
          Toast.show({
              type: 'error',
              text1: "Lỗi huỷ vé!"
            });
            return;
      });
    } catch (error) {
      console.log(error);
    }  
  }

  return (
    <View style={styles.container}>
      <Header title="Thông tin vé" />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin chuyến</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Mã vé</Text>
            <Text style={styles.valueCode}>{data.code}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tuyến</Text>
            <Text style={styles.value}>{data.noiDi} - {data.noiDen}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Chuyến</Text>
            <Text style={styles.value}>{data.ID_ChuyenXe}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Số vé</Text>
            <Text style={styles.value}>{data.SoGhe}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tổng tiền</Text>
            <Text style={styles.value}>{data.SoTien} đ</Text>
          </View>
        </View>

        {/* Điểm đón */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Điểm đón</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>{data.DiemDon}</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Đón lúc</Text>
              <Text style={styles.value}>{data.GioKhoiHanh}</Text>
            </View>
          </View>
        </View>

        {/* Điểm trả */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Điểm trả</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>{data.DiemTra}</Text>
          </View>
        </View>

        {/* Thông tin hành khách */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin hành khách</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Số điện thoại</Text>
            <Text style={styles.value}>{data.SDT}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}></Text>
          </View>
        </View>

        {/* Thông tin giao dịch */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin giao dịch</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Hình thức thanh toán</Text>
            <Text style={styles.value}>Chuyển khoản</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tổng tiền</Text>
            <Text style={styles.value}>{data.SoTien} đ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Trạng thái</Text>
            <Text style={[styles.value, styles.unpaid]}>{data.TrangThaiThanhToan}</Text>
          </View>
          <TouchableOpacity onPress={generateAndSharePDF}>
            <View style={styles.buttonX}><Text style={styles.buttonContent}>Xuất Vé</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisibleCancel(true)}>
            <View style={styles.button}><Text style={styles.buttonContent}>Huỷ Vé</Text></View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={visibleCancel}
        onClose={() => setVisibleCancel(false)}
        title="Bạn có chắc muốn huỷ"
        subTitle={`Hotline: 0905 417 417 để được hỗ hướng dẫn.
Thời gian hủy vé:
Từ 0h đến 12h trước giờ khởi hành: 100% giá trị vé.
Trước 12 tiếng trước giờ khởi hành: 5% giá trị vé.
Lưu ý: Chính sách trên không áp dụng cho các dịp Lễ, Tết.`}
        onPress={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  button: {
    backgroundColor: APP_COLORS.black,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    
  },
  buttonX: {
    backgroundColor: APP_COLORS.blue,
    height: 50,
    borderRadius: 16,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    textAlign:'center',
    color: APP_COLORS.white
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 200,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",

    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,

    opacity: 0.8,
  },
  value: {
    fontSize: 16,

    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  valueCode: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  unpaid: {
    color: "#ff9800",
  },
  locationInfo: {
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,

    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 16,

    opacity: 0.8,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3e50',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketInfoScreen;
