import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import NewCard from "./components/NewCard";

const HEADER_HEIGHT = 80;
const GAP = 16;
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const NewsScreen = () => {
  const navigation = useNavigation<navigation<"News">>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Entypo name="chevron-left" size={24} color={APP_COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tin tức</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <NewCard width={SCREEN_WIDTH - 32} />
        <View style={styles.cardGrid}>
          <NewCard width={(SCREEN_WIDTH - 32 - GAP) / 2} />
          <NewCard width={(SCREEN_WIDTH - 32 - GAP) / 2} />
          <NewCard width={(SCREEN_WIDTH - 32 - GAP) / 2} />
          <NewCard width={(SCREEN_WIDTH - 32 - GAP) / 2} />
          <NewCard width={(SCREEN_WIDTH - 32 - GAP) / 2} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: APP_COLORS.primary,
    flexDirection: "row",
    paddingBottom: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    bottom: 16,
  },
  headerTitle: {
    color: APP_COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
  },
});

export default NewsScreen;
