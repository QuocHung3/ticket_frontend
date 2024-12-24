import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Switch,
} from "react-native";
import React, { useState, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";
import Modal from "../../components/common/Modal";

const APP_VERSION = "1.0.0";
const LANGUAGE = ["English", "Tiếng Việt"];

const SettingScreen = () => {
  const [language, setLanguage] = useState("Tiếng Việt");
  const [isOpen, setIsOpen] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const [isNotification, setIsNotification] = useState(true);

  const toggleAccordion = () => {
    const finalValue = isOpen ? 0 : LANGUAGE.length * 50;
    setIsOpen(!isOpen);

    Animated.timing(animationHeight, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] =
    useState(false);

  const handleCloseDeleteAccountModal = () => {
    setIsDeleteAccountModalVisible(false);
  };

  const handleDeleteAccount = () => {
    setIsDeleteAccountModalVisible(false);
    console.log("Delete account");
  };

  return (
    <View style={styles.container}>
      <Header title="Cài đặt" />
      <View>
        {/* Notification Setting */}
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="notifications" size={24} color="#333" />
          <Text style={styles.menuText}>Thông báo</Text>
          <Switch
            trackColor={{ false: APP_COLORS.black, true: APP_COLORS.primary }}
            thumbColor={APP_COLORS.white}
            value={isNotification}
            onValueChange={() => setIsNotification(!isNotification)}
          />
        </TouchableOpacity>

        {/* Language Setting */}
        <View>
          <TouchableOpacity style={styles.menuItem} onPress={toggleAccordion}>
            <MaterialIcons name="language" size={24} color="#333" />
            <Text style={styles.menuText}>Ngôn ngữ</Text>
            <Text style={styles.selectedValue}>{language}</Text>
            <MaterialIcons
              name={isOpen ? "expand-less" : "expand-more"}
              size={24}
              color="#333"
              style={styles.arrow}
            />
          </TouchableOpacity>

          <Animated.View
            style={[styles.languageContainer, { height: animationHeight }]}
          >
            {LANGUAGE.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.languageOption}
                onPress={() => {
                  setLanguage(lang);
                  toggleAccordion();
                }}
              >
                <Text
                  style={[
                    styles.languageText,
                    language === lang && styles.selectedLanguage,
                  ]}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>

        {/* Version Info */}
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="info" size={24} color="#333" />
          <Text style={styles.menuText}>Phiên bản </Text>
          <Text style={styles.appVersion}>{APP_VERSION}</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity
          style={[styles.menuItem]}
          onPress={() => setIsDeleteAccountModalVisible(true)}
        >
          <MaterialIcons name="delete" size={24} color="#FF3B30" />
          <Text style={styles.deleteText}>Xóa tài khoản</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Account Modal */}
      <Modal
        visible={isDeleteAccountModalVisible}
        onClose={handleCloseDeleteAccountModal}
        title="Xóa tài khoản"
        subTitle="Bạn có chắc chắn muốn xóa tài khoản không?"
        onPress={handleDeleteAccount}
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
  },
  selectedValue: {
    fontSize: 16,
    marginRight: 8,
    color: APP_COLORS.primary,
  },
  arrow: {
    marginLeft: "auto",
  },

  deleteText: {
    fontSize: 16,
    marginLeft: 16,
    color: "#FF3B30",
  },
  languageContainer: {
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  languageOption: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  languageText: {
    fontSize: 16,
  },
  selectedLanguage: {
    color: APP_COLORS.primary,
    fontWeight: "bold",
  },
  appVersion: {
    fontSize: 16,
    color: APP_COLORS.primary,
    marginRight: 8,
  },
});
