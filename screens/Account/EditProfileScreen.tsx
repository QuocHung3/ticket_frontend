import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native";
import tinycolor from "tinycolor2";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import dayjs from "dayjs";
const EditProfileScreen = () => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const handleOpenDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "date",
      display: "spinner",
      onChange: (_, selectedDate) => {
        setDateOfBirth(selectedDate);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Thông tin tài khoản" />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons
              name="account"
              size={40}
              color={APP_COLORS.white}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Admin</Text>
            <Text style={styles.infoPhone}>0909090909</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Số điện thoại</Text>
            <TextInput
              style={[styles.infoInput, { color: APP_COLORS.lightGray }]}
              value="0909090909"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Họ và tên</Text>
            <TextInput style={[styles.infoInput]} value="Admin" />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Email</Text>
            <TextInput style={[styles.infoInput]} value="admin@gmail.com" />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Ngày sinh</Text>
            <TouchableOpacity
              onPress={handleOpenDatePicker}
              style={styles.datePickerContainer}
            >
              <TextInput
                style={styles.datePickerInput}
                value={dayjs(dateOfBirth).format("DD/MM/YYYY")}
                editable={false}
                selectTextOnFocus={false}
              />
              <AntDesign name="calendar" size={24} color={APP_COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.gray,
    width: 80,
    height: 80,
    borderRadius: 16,
    margin: "auto",
  },
  infoContainer: {
    marginTop: 16,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoPhone: {
    fontSize: 14,
    color: APP_COLORS.lightGray,
    textAlign: "center",
    marginTop: 4,
  },
  infoTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: tinycolor(APP_COLORS.lightGray).darken(20).toRgbString(),
  },
  infoInput: {
    borderWidth: 1,
    borderColor: APP_COLORS.gray,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  infoItem: {
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: APP_COLORS.primary,
    padding: 16,
    margin: 16,
    borderRadius: 16,
  },
  saveButtonText: {
    color: APP_COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: APP_COLORS.gray,
    borderRadius: 8,
    padding: 8,
  },
  datePickerInput: {
    flex: 1,
  },
});
