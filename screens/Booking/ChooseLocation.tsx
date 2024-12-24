import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import APP_COLORS from "../../constants/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { navigation, RootStackParamList } from "../../types/stackParamList";

import LOCATION_DATA from "../../constants/location";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const ChooseLocationScreen = () => {
  const navigation = useNavigation<navigation<"ChooseLocation">>();
  const {
    params: { type },
  } = useRoute<RouteProp<RootStackParamList, "ChooseLocation">>();

  const [selectedProvince, setSelectedProvince] = useState<
    (typeof LOCATION_DATA)[0] | null
  >(LOCATION_DATA[0]);

  const [selectedTab, setSelectedTab] = useState<"province" | "district">(
    "province"
  );

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <Image
        resizeMode="cover"
        source={require("../../assets/app_img/home_img.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Chọn nơi bạn muốn {type === "origin" ? "đi" : "đến"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <AntDesign name="close" size={24} color={APP_COLORS.primary} />
      </TouchableOpacity>
      <View style={styles.locationContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            placeholder="Tìm Tỉnh / Thành, Quận / Huyện"
            style={styles.searchInput}
            cursorColor={APP_COLORS.primary}
          />
        </View>
        <View style={styles.tabContainer}>
          <View style={styles.tabBar}>
            <TouchableOpacity
              onPress={() => setSelectedTab("province")}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    selectedTab === "province"
                      ? APP_COLORS.white
                      : APP_COLORS.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedTab === "province"
                        ? APP_COLORS.black
                        : APP_COLORS.white,
                  },
                ]}
              >
                Tỉnh Thành
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab("district")}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    selectedTab === "district"
                      ? APP_COLORS.white
                      : APP_COLORS.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedTab === "district"
                        ? APP_COLORS.black
                        : APP_COLORS.white,
                  },
                ]}
              >
                Quận Huyện
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.locationListContainer}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={styles.provinceList}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {LOCATION_DATA.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  style={[
                    styles.provinceItem,
                    {
                      backgroundColor:
                        selectedProvince?.id === location.id
                          ? APP_COLORS.aliceBlue
                          : APP_COLORS.white,
                    },
                  ]}
                  onPress={() => setSelectedProvince(location)}
                >
                  <Text
                    style={[
                      styles.provinceText,
                      {
                        fontWeight:
                          selectedProvince?.id === location.id
                            ? "bold"
                            : "normal",
                        color:
                          selectedProvince?.id === location.id
                            ? APP_COLORS.blue
                            : APP_COLORS.black,
                      },
                    ]}
                  >
                    {location.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.districtList}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedProvince?.district.map((district, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.districtItem}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.districtText}>{district}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  overlay: {
    height: (SCREEN_WIDTH * 3) / 4,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.4)",
    zIndex: 2,
    top: 0,
    width: SCREEN_WIDTH,
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH * 3) / 4,
    zIndex: 1,
  },
  headerContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    flex: 1,
    height: (SCREEN_WIDTH * 3) / 4 - SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: APP_COLORS.white,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  closeButton: {
    position: "absolute",
    top: SCREEN_WIDTH * 0.4,
    left: 16,
    backgroundColor: APP_COLORS.aliceBlue,
    zIndex: 3,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  locationContainer: {
    marginTop: -SCREEN_WIDTH * 0.3,
    zIndex: 2,
    backgroundColor: APP_COLORS.primary,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
  },
  searchInputContainer: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 24,
  },
  searchInput: {
    fontSize: 16,
    fontWeight: "600",
  },
  locationListContainer: {
    flex: 1,
  },
  tabContainer: {
    marginTop: 48,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 32,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  provinceList: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: APP_COLORS.gray,
  },
  provinceItem: {
    paddingVertical: 24,
    paddingHorizontal: 8,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    marginRight: 4,
  },
  provinceText: {
    fontSize: 16,
  },
  districtList: {
    flex: 1,
  },
  districtItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: APP_COLORS.gray,
    marginHorizontal: 4,
  },
  districtText: {
    fontSize: 16,
  },
});

export default ChooseLocationScreen;
