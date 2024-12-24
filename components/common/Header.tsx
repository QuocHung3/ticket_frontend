import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const HEADER_HEIGHT = 80;

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={20}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Entypo name="chevron-left" size={24} color={APP_COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
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
});
