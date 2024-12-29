import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import APP_COLORS from "../../constants/color";
import { useState,useContext, useEffect } from "react";
import { DataContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import Toast from 'react-native-toast-message'
import axios from "axios";

export default function EnterPhoneNumberScreen() {
  const navigation = useNavigation<navigation<"LoginStack">>();
  const [toggle,setToggle] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  

  const {data,setData} = useContext(DataContext);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleContinue = async () => {
    setLoading(true);
    if(!email) {
      Toast.show({
        type: "info",
        text1: "Vui lòng nhập email!"
      })
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: "Email không đúng hoặc không tồn tại!"
      });
      setLoading(false);
      return;
    }
    
    try {
      await axios.post('http://192.168.31.45:9999/api/send-verification',{email})
      .then(response => {
        if(response && response.data) {
          setLoading(false);
          if(!response.data.success) {
            Toast.show({
              type: 'error',
              text1: "Email không đúng hoặc không tồn tại!"
            });
            setLoading(false);
            return;
          }

          setData({...data,email});
          setLoading(false);
          navigation.navigate("VerifyOTP");
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: "Email không đúng hoặc không tồn tại!"
        });
        setLoading(false);
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: "Email không đúng hoặc không tồn tại!"
      });
      setLoading(false);
    }
  };


  const handleLogin = async () => {
    if(!password || !phoneNumber ) {
        Toast.show({
            type: 'error',
            text1: "Nhập tất cả thông tin để đăng nhập!"
        });
      return;
    }

    try {
      setLoading(true);
        await axios.post('http://192.168.31.45:9999/api/loginUser',{sdt: phoneNumber,matkhau: password})
        .then(response => {
          if(response && response.data) {
            if(response.status !== 200) {
              setLoading(false);
              Toast.show({
                type: 'error',
                text1: "Tài khoản hoặc mật khẩu không đúng!"
              });
              return;
            } else {
                setData({...data,id_nguoidung: response.data.data.ID_NguoiDung})
                navigation.navigate("RootTab");
                setLoading(false);
            }
          }
        })
        .catch(error => {
            Toast.show({
                type: 'error',
                text1: "Tài khoản hoặc mật khẩu không đúng!"
              });
              return;
        });
      } catch (error) {
        Toast.show({
            type: 'error',
            text1: "Tài khoản hoặc mật khẩu không đúng!"
          });
          return;
      }
      
  }


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Thông tin đăng {toggle ? "nhập" :"kí"} nhập của bạn!</Text>
          <Text style={styles.description}>
            Nhập tên đăng nhập là số điện thoại của bạn và mật khẩu.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {toggle ?
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setPhoneNumber(text)}
                placeholder="Nhập số điện thoại"
                placeholderTextColor={APP_COLORS.lightGray}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={APP_COLORS.lightGray}
              />
            </View>
            :
            <View>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Nhập Email để đăng kí"
                placeholderTextColor={APP_COLORS.lightGray}
              />
            </View>
          }
        <View>
          <Text>Nếu bạn chưa có tài khoản</Text>
          <TouchableOpacity onPress={()=>setToggle(!toggle)}><Text >ĐĂNG {toggle ? "NHẬP" :"KÍ"}</Text></TouchableOpacity>
        </View>
        </View>
        
        {toggle ?
        <View style={styles.buttonContainer}>
          {loading ?
              <TouchableOpacity style={styles.button} >
                <ActivityIndicator />
              </TouchableOpacity>
            :
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
            }
        </View>
        :
          <View style={styles.buttonContainer}>
            {loading ?
              <TouchableOpacity style={styles.button} >
              <ActivityIndicator />
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>
            }
          </View>
        }
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.termsAndConditionsContainer}
            onPress={() =>
              navigation.navigate("WebViewScreen", {
                title: "Điều khoản và điều kiện",
                url: "https://xetuantrung.com/",
              })
            }
          >
            <Text style={styles.termsAndConditions}>
              Điều khoản và điều kiện
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
  },
  content: {
    flex: 1,
    marginTop: 48,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: APP_COLORS.white,
    paddingHorizontal: 16,
  },
  header: {
    marginVertical: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: APP_COLORS.black,
  },
  description: {
    fontSize: 15,
    color: APP_COLORS.lightGray,
    marginTop: 8,
  },
  titleContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    marginVertical: 5,
    borderColor: APP_COLORS.lightGray,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: APP_COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLORS.white,
    textAlign: "center",
  },
  termsAndConditions: {
    fontSize: 16,
    color: APP_COLORS.primary,
    textAlign: "center",
  },
  termsAndConditionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
