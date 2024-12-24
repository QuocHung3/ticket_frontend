import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import APP_COLORS from "../../constants/color";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function VerifyOTPScreen() {
  const navigation = useNavigation<navigation<"AccountStack">>();

  const [phoneNumber, setPhoneNumber] = useState("");

  const [otp, setOtp] = useState<string[]>([]);

  const inputRefs = useRef<TextInput[]>([]);

  const onChangeText = (index: number, text: string) => {
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = text.slice(0, 1);
      return newOtp;
    });
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleVerify = () => {
    navigation.navigate("Account");
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

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
            Vui lòng nhập mã bảo mật gồm 6 chữ số mà chúng tôi vừa gửi cho bạn
            vào số (+8409090909)
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={(ref) => {
              if (ref) {
                inputRefs.current[0] = ref;
              }
            }}
            cursorColor={APP_COLORS.primary}
            value={otp[0]}
            onChangeText={(text) => onChangeText(0, text)}
            style={styles.otpInput}
            keyboardType="numeric"
            placeholderTextColor={APP_COLORS.lightGray}
          />
          <TextInput
            ref={(ref) => {
              if (ref) {
                inputRefs.current[1] = ref;
              }
            }}
            value={otp[1]}
            cursorColor={APP_COLORS.primary}
            onChangeText={(text) => onChangeText(1, text)}
            style={styles.otpInput}
            keyboardType="numeric"
            placeholderTextColor={APP_COLORS.lightGray}
          />
          <TextInput
            ref={(ref) => {
              if (ref) {
                inputRefs.current[2] = ref;
              }
            }}
            cursorColor={APP_COLORS.primary}
            value={otp[2]}
            onChangeText={(text) => onChangeText(2, text)}
            style={styles.otpInput}
            keyboardType="numeric"
            placeholderTextColor={APP_COLORS.lightGray}
          />
          <TextInput
            ref={(ref) => {
              if (ref) {
                inputRefs.current[3] = ref;
              }
            }}
            value={otp[3]}
            cursorColor={APP_COLORS.primary}
            onChangeText={(text) => onChangeText(3, text)}
            style={styles.otpInput}
            keyboardType="numeric"
            placeholderTextColor={APP_COLORS.lightGray}
          />
          <TextInput
            ref={(ref) => {
              if (ref) {
                inputRefs.current[4] = ref;
              }
            }}
            value={otp[4]}
            cursorColor={APP_COLORS.primary}
            onChangeText={(text) => onChangeText(4, text)}
            style={styles.otpInput}
            keyboardType="numeric"
            placeholderTextColor={APP_COLORS.lightGray}
          />
          <TextInput
            ref={(ref) => {
              if (ref) {
                inputRefs.current[5] = ref;
              }
            }}
            value={otp[5]}
            cursorColor={APP_COLORS.primary}
            onChangeText={(text) => onChangeText(5, text)}
            style={styles.otpInput}
            keyboardType="numeric"
            placeholderTextColor={APP_COLORS.lightGray}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Xác thực</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.termsAndConditionsContainer}>
            <Text style={styles.termsAndConditions}>Gửi lại</Text>
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
