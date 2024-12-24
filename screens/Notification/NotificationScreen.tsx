import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
const HEADER_HEIGHT = 100;

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Thông báo</Text>
          <TouchableOpacity style={styles.checkButton}>
            <Ionicons name="checkmark-done-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <View style={styles.inputIcon}>
              <AntDesign
                name="search1"
                size={24}
                color={APP_COLORS.lightGray}
              />
            </View>
            <TextInput
              cursorColor={APP_COLORS.primary}
              placeholder="Nhập từ khoá"
              placeholderTextColor={APP_COLORS.lightGray}
              style={styles.inputText}
            />
          </View>
        </View>
        <View style={styles.emptyStateContainer}>
          <Image
            source={require("../../assets/app_img/warning.png")}
            style={styles.warningImage}
          />
          <View style={styles.emptyStateContent}>
            <Text style={styles.emptyStateText}>Không có thông báo nào</Text>
            <TouchableOpacity>
              <Text style={styles.updateText}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary,
    justifyContent: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerTitle: {
    color: APP_COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  checkButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.white,
    borderRadius: 999,
    position: "absolute",
    right: 32,
  },
  inputText: {
    flex: 1,
    width: "100%",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  content: {
    marginTop: -20,
    zIndex: 2,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: APP_COLORS.white,
    flex: 1,
  },

  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  warningImage: {
    width: 150,
    height: 150,
  },
  emptyStateContent: {
    alignItems: "center",
    gap: 16,
    marginTop: 32,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  updateText: {
    color: APP_COLORS.primary,
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    flex: 1,
  },
  inputIcon: {
    padding: 4,
  },
});

export default NotificationScreen;
