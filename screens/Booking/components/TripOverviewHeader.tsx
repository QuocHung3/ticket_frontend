import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import APP_COLORS from "../../../constants/color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface TripOverviewHeaderProps {
  onPress: () => void;
}

const TripOverviewHeader = ({ onPress }: TripOverviewHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerIndicator} />
      <Pressable
        style={({ pressed }) =>
          pressed ? styles.buttonPressed : styles.button
        }
        onPress={onPress}
      >
        <View style={styles.buttonContent}>
          <FontAwesome6
            name="arrow-right-arrow-left"
            size={16}
            color={APP_COLORS.blue}
          />
          <Text style={styles.text}>Lộ trình</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed ? styles.buttonPressed : styles.button
        }
      >
        <View style={styles.buttonContent}>
          <MaterialCommunityIcons
            name="shape"
            size={16}
            color={APP_COLORS.blue}
          />
          <Text style={styles.text}>Tiện ích</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed ? styles.buttonPressed : styles.button
        }
      >
        <View style={styles.buttonContent}>
          <Ionicons name="image" size={16} color={APP_COLORS.blue} />
          <Text style={styles.text}>Hình ảnh</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed ? styles.buttonPressed : styles.button
        }
      >
        <View style={styles.buttonContent}>
          <AntDesign name="like2" size={16} color={APP_COLORS.blue} />
          <Text style={styles.text}>Đánh giá</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed ? styles.buttonPressed : styles.button
        }
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="menu-book" size={16} color={APP_COLORS.blue} />
          <Text style={styles.text}>Chính sách</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default TripOverviewHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 75,
    backgroundColor: APP_COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    position: "absolute",
    top: 4,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  button: {
    backgroundColor: APP_COLORS.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: APP_COLORS.blue,
    fontSize: 12,
  },
  buttonPressed: {
    opacity: 0.5,
    backgroundColor: APP_COLORS.blue,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 4,
    paddingVertical: 10,
  },
});
