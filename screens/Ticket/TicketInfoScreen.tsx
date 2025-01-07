import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../ticket_frontend/types/stackParamList";
import Modal from "../../components/common/Modal";

const TicketInfoScreen = ({route}) => {
  const [visibleCancel,setVisibleCancel] = useState(false);
  const data = route.params;
  const navigation = useNavigation<navigation<"RootTab">>();
  


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
    backgroundColor: APP_COLORS.blue,
    height: 50,
    borderRadius: 16,
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
});

export default TicketInfoScreen;
