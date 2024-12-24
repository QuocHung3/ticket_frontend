import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import APP_COLORS from "../../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/stackParamList";
const HomeImg = require("../../../assets/app_img/home_img.jpg");

const CARD_WIDTH = 260;
interface Props {
  width?: number;
}

const NewCard = ({ width = CARD_WIDTH }: Props) => {
  const navigation = useNavigation<navigation<"News">>();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.card, { width }]}
      onPress={() =>
        navigation.navigate("WebViewScreen", {
          url: "https://xetuantrung.com/kinh-nghiem-du-lich-sai-gon-vui-choi-tha-ga-noi-thanh-pho-khong-ngu",
          title: "Tin tức",
        })
      }
    >
      <Image
        resizeMode="cover"
        source={HomeImg}
        style={[styles.image, { width, height: (width * 3) / 4 }]}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Kinh nghiệm du lịch Sài Gòn, vui chơi "thả ga" nơi thành phố không ngủ
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    borderRadius: 16,
    backgroundColor: APP_COLORS.white,
  },
  image: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default NewCard;
