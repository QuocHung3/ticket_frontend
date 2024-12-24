import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useContext, useEffect} from "react";
import { DataContext } from "../../App";
import Header from "../../components/common/Header";
import BookingStep from "./components/BookingStep";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import APP_COLORS from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";

const BookingInfomation = () => {
  const navigation = useNavigation<navigation<"BookingStack">>();
  const {data,setData} = useContext(DataContext);

  useEffect(() => {
    console.log(data);
  })

  return (
    <View style={styles.container}>
      <Header title="Thông tin đặt chỗ" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <BookingStep currentStep={3} />

          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Icon name="account" size={24} color={APP_COLORS.blue} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Họ và tên</Text>
                <TextInput style={styles.input} value={"Admin"} />
              </View>
            </View>

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Icon name="phone" size={24} color={APP_COLORS.blue} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                  style={styles.input}
                  value={"03942342383"}
                  keyboardType="phone-pad"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Icon name="email" size={24} color={APP_COLORS.blue} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập email"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Note Input */}
            <View style={styles.inputGroup}>
              <Icon name="text" size={24} color={APP_COLORS.blue} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Ghi chú</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập ghi chú"
                  multiline
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.continueButtonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            navigation.navigate("PaymentMethod");
          }}
        >
          <Text style={styles.continueText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingInfomation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formContainer: {
    marginTop: 20,
    gap: 16,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    color: "#000",
    padding: 0,
  },
  continueButton: {
    backgroundColor: APP_COLORS.primary,
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  continueButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
