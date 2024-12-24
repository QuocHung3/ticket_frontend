import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
const SupportScreen = () => {
  const navigation = useNavigation<navigation<"AccountStack">>();
  return (
    <View style={styles.container}>
      <Header title="Hỗ trợ" />
      <View style={styles.content}>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemContent}>
            <Text
              style={styles.listItemText}
              onPress={() => {
                navigation.navigate("WebViewScreen", {
                  url: "https://xetuantrung.com/chinh-sach-huy-ve",
                  title: "Chi tiết",
                });
              }}
            >
              Chính sách đổi trả/hủy vé
            </Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => {
            navigation.navigate("WebViewScreen", {
              url: "https://xetuantrung.com/quy-che",
              title: "Chi tiết",
            });
          }}
        >
          <View style={styles.listItemContent}>
            <Text style={styles.listItemText}>
              Chính sách vận chuyển hàng hoá
            </Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => {
            navigation.navigate("WebViewScreen", {
              url: "https://xetuantrung.com/chinh-sach-bao-mat-thong-tin",
              title: "Chi tiết",
            });
          }}
        >
          <View style={styles.listItemContent}>
            <Text style={styles.listItemText}>
              Chính sách bảo mật thông tin
            </Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => {
            navigation.navigate("WebViewScreen", {
              url: "https://xetuantrung.com/chinh-sach-thanh-toan",
              title: "Chi tiết",
            });
          }}
        >
          <View style={styles.listItemContent}>
            <Text style={styles.listItemText}>Chính sách thanh toán</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listItem: {
    justifyContent: "center",
    flexDirection: "column",
  },
  divider: {
    height: 1,
    backgroundColor: APP_COLORS.gray,
  },
  listItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
