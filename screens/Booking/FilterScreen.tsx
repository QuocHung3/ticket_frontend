import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
const FilterScreen = () => {
  const navigation = useNavigation<navigation<"BookingStack">>();

  const [seat, setSeat] = useState(0);

  const handleSeat = (type: "add" | "remove") => {
    if (type === "add") {
      setSeat(seat + 1);
    } else {
      if (seat >= 1) {
        setSeat(seat - 1);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Bộ lọc" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.filterContainer}>
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Điểm đón</Text>
            <TouchableOpacity
              style={styles.filterItemRight}
              onPress={() =>
                navigation.navigate("PickUpDropOffFilter", { type: "pickup" })
              }
            >
              <Text style={styles.filterItemRightText}>Tất cả</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={APP_COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Điểm trả</Text>
            <TouchableOpacity
              style={styles.filterItemRight}
              onPress={() =>
                navigation.navigate("PickUpDropOffFilter", { type: "dropoff" })
              }
            >
              <Text style={styles.filterItemRightText}>Tất cả</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={APP_COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Giá vé</Text>
            <Text style={styles.filterItemText}>0đ - 2.000.0000đ</Text>
          </View>
          <View style={styles.filterContainer}>
            <MultiSlider
              selectedStyle={{
                backgroundColor: APP_COLORS.primary,
              }}
              markerStyle={{
                backgroundColor: APP_COLORS.primary,
                height: 20,
                width: 20,
              }}
              containerStyle={styles.slider}
              sliderLength={Dimensions.get("window").width - 48}
              min={0}
              max={2000000}
              step={10000}
              values={[0, 2000000]}
            />
          </View>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Đánh giá</Text>
            <Text style={styles.filterItemText}>0 sao - 5 sao</Text>
          </View>
          <View style={styles.filterContainer}>
            <MultiSlider
              selectedStyle={{
                backgroundColor: APP_COLORS.primary,
              }}
              markerStyle={{
                backgroundColor: APP_COLORS.primary,
                height: 20,
                width: 20,
              }}
              sliderLength={Dimensions.get("window").width - 48}
              containerStyle={styles.slider}
              min={0}
              max={5}
              step={1}
              values={[0, 5]}
            />
          </View>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.filterItem}>
            <Text style={styles.filterItemTitle}>Tiêu chi phổ biến</Text>
          </View>
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Chuyến xác nhận tức thì</Text>
            <Switch style={styles.switch} />
          </View>
          <View style={styles.line} />
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Chuyến giảm giá</Text>
            <Switch style={styles.switch} />
          </View>
          <View style={styles.line} />
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Chọn chỗ online</Text>
            <Switch style={styles.switch} />
          </View>
          <View style={styles.line} />
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Xe VIP Limousine</Text>
            <Switch style={styles.switch} />
          </View>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.filterItem}>
            <Text style={styles.filterItemTitle}>Loại ghế / Giường</Text>
          </View>
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Ghế ngồi</Text>
            <Checkbox />
          </View>
          <View style={styles.line} />
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Giường nằm</Text>
            <Checkbox />
          </View>
          <View style={styles.line} />
          <View style={styles.filterItem}>
            <Text style={styles.filterItemText}>Giường nằm đôi</Text>
            <Checkbox />
          </View>
        </View>
        <View style={styles.filterContainer}>
          <View style={styles.filterItem}>
            <Text style={styles.filterItemTitle}>Số ghế trống</Text>
            <View style={styles.inputWrapper}>
              {seat >= 1 ? (
                <TouchableOpacity
                  style={styles.inputButton}
                  onPress={() => handleSeat("remove")}
                >
                  <Ionicons name="remove" size={20} color={APP_COLORS.black} />
                </TouchableOpacity>
              ) : (
                <View style={{ width: 24 }} />
              )}
              <Text style={styles.filterItemText}>{seat}</Text>
              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => handleSeat("add")}
              >
                <Ionicons name="add" size={20} color={APP_COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.removeFilterButton}>
          <Text style={styles.removeFilterButtonText}>Xoá lọc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FindTrip")}
        >
          <Text style={styles.buttonText}>Xem kết quả</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.gray,
  },
  filterContainer: {
    backgroundColor: APP_COLORS.white,
    justifyContent: "center",
    marginBottom: 8,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  filterItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: APP_COLORS.black,
  },
  filterItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterItemRightText: {
    fontSize: 16,
    fontWeight: "500",
    color: APP_COLORS.primary,
  },
  line: {
    height: 1,
    backgroundColor: APP_COLORS.gray,
  },
  filterItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: APP_COLORS.black,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderWidth: 1,
    borderColor: APP_COLORS.gray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "space-between",
    width: "50%",
  },
  sliderContainer: {
    paddingHorizontal: 16,
  },
  inputButton: {
    borderWidth: 1.5,
    borderColor: APP_COLORS.black,
    borderRadius: 999,
  },
  switch: {
    width: 40,
    height: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: APP_COLORS.white,
    paddingVertical: 16,
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 8,
    backgroundColor: APP_COLORS.primary,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: APP_COLORS.white,
    textAlign: "center",
  },
  removeFilterButton: {
    padding: 8,
    backgroundColor: APP_COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
  },
  removeFilterButtonText: {
    fontSize: 16,
    color: APP_COLORS.primary,
  },
  slider: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  sliderTrack: {
    color: APP_COLORS.primary,
  },
});
