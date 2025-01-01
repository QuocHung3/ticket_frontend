import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState,useContext,useEffect } from "react";
import { DataContext } from "../../App";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native";
import tinycolor from "tinycolor2";
import axios from "axios";
import Toast from "react-native-toast-message";


const EditProfileScreen = () => {
  const {data,setData} = useContext(DataContext);
  const [user, setUser] = React.useState(true);
  const [sdt, setSDT] = React.useState("");
  const [ten, setTen] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [matkhau, setMatKhau] = React.useState("");



  useEffect(() => {
    try {
      axios.post('http://192.168.194.157:9999/api/getUser',{idUser:data["id_nguoidung"]})
      .then(response => {
        if(response && response.data) {
          setUser(response.data.data[0]);
          setSDT(response.data.data[0].SDT)
          setTen(response.data.data[0].Ten)
          setEmail(response.data.data[0].Email)
          setMatKhau(response.data.data[0].MatKhau)
        }
      })
      .catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.log(error)
    }
  },[])

  const handleUpdate = async () => {
    try {
      if(!ten || !sdt || !email || !matkhau) {
        Toast.show({
          type: 'error',
          text1: "Không được để trống!"
        });
      }

      const id = user["ID_NguoiDung"];
      const userData = {
        email,
        sdt,
        ten,
        matkhau
      };

      const response = await fetch(`http://192.168.194.157:9999/api/updateUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating user:", errorData.message);
        Toast.show({
          type: 'error',
          text1: "Lỗi, thử lại!"
        });
      }
  
      const result = await response.json();
      console.log("User updated successfully:", result);
      Toast.show({
        type: 'success',
        text1: "Cập nhật thành công!"
      });
    } catch (error) {
      console.error("Error calling API:", error);
      return { success: false, message: "API call failed" };
    }
  }

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
            <Text style={styles.infoText}>{user["Ten"]}</Text>
            <Text style={styles.infoPhone}>{user["SDT"]}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Số điện thoại</Text>
            <TextInput
              style={[styles.infoInput]}
              value={sdt}
              onChangeText={text => setSDT(text)}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Họ và tên</Text>
            <TextInput style={[styles.infoInput]} value={ten} onChangeText={text => setTen(text)}/>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Email</Text>
            <TextInput style={[styles.infoInput]} value={email} onChangeText={text => setEmail(text)} />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Mật khẩu</Text>
            <TextInput style={[styles.infoInput]} value={matkhau} onChangeText={text => setMatKhau(text)} />
          </View>
          
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText} >Cập nhật</Text>
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
