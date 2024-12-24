import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  TextStyle,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import APP_COLORS from "../../constants/color";
import Header from "../../components/common/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FeedBackBottomSheet from "./components/FeedBackBottomSheet";
const FeedBackScreen = () => {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <Header title="Góp ý" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Chia sẻ góp ý của bạn với chúng tôi</Text>
        <Text style={styles.description}>
          Xe khách Tuấn Trung luôn ghi nhận mọi ý kiến đóng góp và liên tục cải
          tiến để phục vụ bạn tốt hơn
        </Text>

        <View>
          <Text style={styles.optionTitle}>Bạn muốn</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={option(selectedOption === 1)}
              onPress={() => setSelectedOption(1)}
            >
              <Text style={optionText(selectedOption === 1)}>Góp ý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={option(selectedOption === 2)}
              onPress={() => setSelectedOption(2)}
            >
              <Text style={optionText(selectedOption === 2)}>Báo lỗi</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.textInputTitle}>Vấn đề bạn gặp phải là gì?</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={handleOpenBottomSheet}
          >
            <TextInput
              style={styles.input}
              value="Trải nghiệm đặt vé"
              editable={false}
              focusable={false}
            />
            <Ionicons name="chevron-down" size={24} color={APP_COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.textInputTitle}>Mô tả chi tiết</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Nhập mô tả chi tiết" />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gửi góp ý</Text>
        </TouchableOpacity>
      </View>

      <FeedBackBottomSheet
        ref={bottomSheetRef}
        onClose={() => bottomSheetRef.current?.dismiss()}
      />
    </View>
  );
};

export default FeedBackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  textInputTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detailContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    paddingHorizontal: 14,
    marginVertical: 16,
  },
  button: {
    backgroundColor: APP_COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: APP_COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const option = (active: boolean): ViewStyle => ({
  backgroundColor: active ? APP_COLORS.primary : APP_COLORS.white,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: APP_COLORS.primary,
});

const optionText = (active: boolean): TextStyle => ({
  color: active ? APP_COLORS.white : APP_COLORS.primary,
});
