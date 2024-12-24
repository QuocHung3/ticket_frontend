import { StyleSheet, Text, View } from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import Header from "../../components/common/Header";
import { FontAwesome5 } from "@expo/vector-icons";
const GarageOfficeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Văn phòng nhà xe" />
      <View style={styles.content}>
        <Text style={styles.title}>
          Danh sách văn phòng đặt vé và gửi/ nhận hàng hoá
        </Text>
        <Text style={styles.description}>Lộ trình Sài Gòn ⇄ Đắk Lắk</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.content}>
        <View style={styles.listItem}>
          <Text style={styles.listItemTitle}>Sài Gòn</Text>
          <Text style={styles.listItemDescription}>Bến xe Miền Đông</Text>

          <View style={styles.listItemAddress}>
            <FontAwesome5
              name="map-marker-alt"
              size={24}
              color={APP_COLORS.primary}
            />
            <Text style={styles.listItemAddressText}>
              292 Đinh Bộ Lĩnh, Phường 26
            </Text>
          </View>
          <View style={styles.listItemPhone}>
            <FontAwesome5
              name="phone-alt"
              size={24}
              color={APP_COLORS.primary}
            />
            <Text style={styles.listItemPhoneText}>0909090909</Text>
          </View>
          <View style={styles.listItemPhone}>
            <FontAwesome5
              name="phone-alt"
              size={24}
              color={APP_COLORS.primary}
            />
            <Text style={styles.listItemPhoneText}>0909090909</Text>
          </View>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemTitle}>Đắk Lắk</Text>
          <Text style={styles.listItemDescription}>Bến M'ĐRẮK (ĐẮK LẮK)</Text>

          <View style={styles.listItemAddress}>
            <FontAwesome5
              name="map-marker-alt"
              size={24}
              color={APP_COLORS.primary}
            />
            <Text style={styles.listItemAddressText}>Bến M'ĐRẮK (ĐẮK LẮK)</Text>
          </View>
          <View style={styles.listItemPhone}>
            <FontAwesome5
              name="phone-alt"
              size={24}
              color={APP_COLORS.primary}
            />
            <Text style={styles.listItemPhoneText}>0909090909</Text>
          </View>
          <View style={styles.listItemPhone}>
            <FontAwesome5
              name="phone-alt"
              size={24}
              color={APP_COLORS.primary}
            />
            <Text style={styles.listItemPhoneText}>0909090909</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GarageOfficeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  content: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 24,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: APP_COLORS.gray,
    marginHorizontal: 16,
    marginTop: 16,
  },
  listItem: {
    padding: 10,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: APP_COLORS.primary,
  },
  listItemDescription: {
    fontSize: 18,
    color: APP_COLORS.black,
    marginLeft: 18,
    marginTop: 8,
  },
  listItemAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
    padding: 16,
    marginHorizontal: 16,
  },
  listItemAddressText: {
    fontSize: 16,
    marginLeft: 8,
  },
  listItemPhone: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
    padding: 16,
  },
  listItemPhoneText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
