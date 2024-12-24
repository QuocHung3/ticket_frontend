import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import APP_COLORS from "../../constants/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
export default function EnterPhoneNumberScreen() {
  const navigation = useNavigation<navigation<"LoginStack">>();

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    navigation.navigate("VerifyOTP");
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={24} color={APP_COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Số điện thoại của bạn!</Text>
          <Text style={styles.description}>
            Mã bảo mật gồm 6 chữ số sẽ đc gửi qua SMS để xác minh số điện thoại
            di động của bạn.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại"
            placeholderTextColor={APP_COLORS.lightGray}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
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
