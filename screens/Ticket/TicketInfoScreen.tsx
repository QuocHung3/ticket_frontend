import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";

const TicketInfoScreen = () => {
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
            <Text style={styles.label}>Tuyến</Text>
            <Text style={styles.value}>Đồng Nai - Sài Gòn - Đắk Lắk (SH)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Chuyến</Text>
            <Text style={styles.value}>06:15PM 27/12/2024</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Số vé</Text>
            <Text style={styles.value}>1</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tổng tiền</Text>
            <Text style={styles.value}>350.000 đ</Text>
          </View>
        </View>

        {/* Điểm đón */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Điểm đón</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>KDL Suối Tiên</Text>
            <Text style={styles.locationAddress}>120 Xa lộ Hà Nội</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Đón lúc</Text>
              <Text style={styles.value}>18:15 27/12/2024</Text>
            </View>
          </View>
        </View>

        {/* Điểm trả */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Điểm trả</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>Ngã 3 Buôn Cốp</Text>
            <Text style={styles.locationAddress}>
              QL14, Hòa Phú, Tp. Buôn Ma Thuột, Đắk Lắk, Việt Nam
            </Text>
          </View>
        </View>

        {/* Thông tin hành khách */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin hành khách</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Họ và tên</Text>
            <Text style={styles.value}>Hải</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Số điện thoại</Text>
            <Text style={styles.value}>0971343543</Text>
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
            <Text style={styles.value}>350.000 đ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Trạng thái</Text>
            <Text style={[styles.value, styles.unpaid]}>Chưa thanh toán</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
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
