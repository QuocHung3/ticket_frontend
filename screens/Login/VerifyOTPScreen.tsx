import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import APP_COLORS from "../../constants/color";
import { useEffect, useRef, useState ,useContext} from "react";
import { DataContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import Toast from "react-native-toast-message";


export default function VerifyOTPScreen() {
  const navigation = useNavigation<navigation<"AccountStack">>();
  const [authText,setAuthText] = useState("");
  const [confirm,setConfirm] = useState(false);
  const [phone,setPhone] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [passwordTest,setPasswordTest] = useState("");
  const [loading, setLoading] = useState(false);

  const {data,setData} = useContext(DataContext);

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(?:\+?\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
    return regex.test(phoneNumber);
  };
  
  const handleVerify = async () => {
    setLoading(true);
    if(!authText) {
      Toast.show({
        type: "info",
        text1: "Vui lòng nhập mã xác nhận!"
      })
      setLoading(false);
      return;
    }

    if(!data["email"]) {
      Toast.show({
        type: "error",
        text1: "Có lỗi, vui lòng thử lại!"
      })
      setLoading(false);
      return;
    }
    try {
      await axios.post('http://192.168.194.157:9999/api/verify-code',{email:data["email"],code: authText})
      .then(response => {
        if(response && response.data) {
          if(!response.data.success) {
            Toast.show({
              type: 'error',
              text1: "Mã không đúng!"
            });
            setLoading(false);
            return;
          } else {
            console.log("Xác thực mã thành công");
            setConfirm(true);
            setLoading(false);
          }
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  const handleAuthSuccess = async () => {
    setLoading(true)
    if (!validatePhoneNumber(phone)) {
      Toast.show({
        type: 'error',
        text1: "Số điện thoại không hợp lệ!"
      });
      setLoading(false);
      return;
    }

    if(!password || !passwordTest || !phone ||!name ) {
      Toast.show({
        type: 'error',
        text1: "Nhập tất cả thông tin để đăng kí!"
      });
      setLoading(false);
      return;
    }

    if(password !== passwordTest) {
      Toast.show({
        type: 'error',
        text1: "Mật khẩu không giống nhau!"
      });
      setLoading(false);
      return;
    }

    //  api đăng kí tài khoản
    try {
      await axios.post('http://192.168.194.157:9999/api/addUser',{email:data["email"],matkhau: password,sdt:phone,ten:name})
      .then(response => {
        if(response && response.data) {
          if(response.status !== 200) {
            Toast.show({
              type: 'error',
              text1: "Có lỗi, thử lại!"
            });
            setLoading(false);
            return;
          } else {
            Toast.show({
              type: 'success',
              text1: "Tạo tài khoản thành công!"
            });
            setLoading(false);
            navigation.navigate("EnterPhoneNumber");
          }
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={APP_COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Xác thực số điện thoại</Text>
          <Text style={styles.description}>
            Nhập mã xác thực gồm 6 kí tự mà chúng tôi vừa gửi qua Email cho bạn
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {!confirm ? 
            <TextInput 
              placeholder="Nhập mã xác thực"
              value={authText}
              onChangeText={(text) => setAuthText(text)}
            />
          : 
            <View>
              <TextInput 
              placeholder="Nhập tên..."
              value={name}
              onChangeText={(text) => setName(text)}
              /> 
              <Text>Số điện thoại và mật khẩu dùng trong những lần đăng nhập</Text>
              <TextInput 
              placeholder="Nhập số điện thoại..."
              value={phone}
              onChangeText={(text) => setPhone(text)}
              /> 
              <TextInput 
              placeholder="Mật khẩu"
              value={password}
              onChangeText={(text) => setPassword(text)}
              /> 
              <TextInput 
              placeholder="Nhập lại mật khẩu"
              value={passwordTest}
              onChangeText={(text) => setPasswordTest(text)}
              /> 
            </View>
          }
        </View>

        {!confirm ?
        <View>
          <View style={styles.buttonContainer}>
            {loading ? 
              <TouchableOpacity style={styles.button}>
                <View><ActivityIndicator /></View>
              </TouchableOpacity>
            :
              <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>Xác thực</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.termsAndConditionsContainer}>
              <Text style={styles.termsAndConditions}>Gửi lại</Text>
            </TouchableOpacity>
          </View>
        </View>
        : 
        <View style={styles.buttonContainer}>
          {loading ? 
              <TouchableOpacity style={styles.button}>
                <View><ActivityIndicator /></View>
              </TouchableOpacity>
            :
              <TouchableOpacity style={styles.button} onPress={handleAuthSuccess}>
              <Text style={styles.buttonText}>Xác Nhận</Text>
            </TouchableOpacity>
            }
        </View>
        }
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    borderRadius: 16,
    fontSize: 16,
    flex: 1,
    textAlign: "center",
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
