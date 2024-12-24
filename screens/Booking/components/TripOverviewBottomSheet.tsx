import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import APP_COLORS from "../../../constants/color";
import { ScrollView } from "react-native-gesture-handler";
import TripOverviewHeader from "./TripOverviewHeader";
import { Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

const TripOverviewBottomSheet = forwardRef(
  (_, ref: React.ForwardedRef<BottomSheetModal>) => {
    const snapPoints = useMemo(() => ["85%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    const [selectedTab, setSelectedTab] = useState<"pickup" | "dropoff">(
      "pickup"
    );

    return (
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={ref}
        backdropComponent={renderBackdrop}
        enableHandlePanningGesture={false}
        handleComponent={() => <TripOverviewHeader onPress={() => {}} />}
      >
        <BottomSheetView style={styles.contentContainer}>
          <ScrollView>
            <View style={{ height: 2000 }}>
              {/* Info */}
              <View style={styles.infoContainer}>
                <View style={styles.info}>
                  <View>
                    <Text style={styles.infoTitle}>Loại xe</Text>
                    <Text style={styles.infoText}>Limousine 22 giường</Text>
                  </View>
                  <View style={styles.infoSeparator} />
                  <View>
                    <Text style={styles.infoTitle}>Giá vé</Text>
                    <Text style={styles.infoPrice}>350.000 đ - 450.000 đ</Text>
                  </View>
                </View>
                <Image
                  source={require("../../../assets/app_img/car.png")}
                  style={styles.carImage}
                />
              </View>

              {/* Route */}
              <View style={styles.routeWrapper}>
                <Text style={styles.routeTitle}>Lộ trình</Text>
                <View style={styles.routeContainer}>
                  <View style={styles.tabContainer}>
                    <TouchableOpacity
                      style={[
                        styles.tabItem,
                        selectedTab === "pickup" && styles.activeTab,
                      ]}
                      onPress={() => setSelectedTab("pickup")}
                    >
                      <Text style={[styles.tabText]}>Điểm đón</Text>
                      <View style={tabLine(selectedTab === "pickup")} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.tabItem,
                        selectedTab === "dropoff" && styles.activeTab,
                      ]}
                      onPress={() => setSelectedTab("dropoff")}
                    >
                      <Text style={[styles.tabText]}>Điểm trả</Text>
                      <View style={tabLine(selectedTab === "dropoff")} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.listContainer}>
                    {selectedTab === "pickup" ? (
                      <>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <View style={styles.listItem} key={index}>
                            <Text style={styles.time}>13:00</Text>
                            <View>
                              <Text style={styles.location}>Bến xe Đà Lạt</Text>
                              <Text style={styles.locationSub}>
                                123 Kinh Dương Vương
                              </Text>
                            </View>
                          </View>
                        ))}
                      </>
                    ) : (
                      <>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <View style={styles.listItem} key={index}>
                            <Text style={styles.time}>13:00</Text>
                            <View>
                              <Text style={styles.location}>Bến xe Đà Lạt</Text>
                              <Text style={styles.locationSub}>
                                123 Kinh Dương Vương
                              </Text>
                            </View>
                          </View>
                        ))}
                      </>
                    )}

                    <View style={styles.horizontalLine}>
                      <View style={styles.circle}>
                        <Ionicons
                          name="chevron-up-outline"
                          size={12}
                          color={APP_COLORS.white}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* utilities */}
              <View style={styles.utilitiesWrapper}>
                <Text style={styles.routeTitle}>Tiện ích</Text>
                <ScrollView
                  contentContainerStyle={{
                    gap: 8,
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.utilitiesList}
                >
                  <View>
                    <View style={styles.utilitiesItem}>
                      <Ionicons name="hammer-sharp" size={36} color="gold" />
                    </View>
                    <Text style={styles.utilitiesItemTitle}>Búa phá kính</Text>
                  </View>
                  <View>
                    <View style={styles.utilitiesItem}>
                      <FontAwesome6
                        name="mattress-pillow"
                        size={36}
                        color="gold"
                      />
                    </View>
                    <Text style={styles.utilitiesItemTitle}>Gối nằm</Text>
                  </View>
                  <View>
                    <View style={styles.utilitiesItem}>
                      <FontAwesome6
                        name="bottle-water"
                        size={36}
                        color="gold"
                      />
                    </View>
                    <Text style={styles.utilitiesItemTitle}>Nước</Text>
                  </View>
                  <View>
                    <View style={styles.utilitiesItem}>
                      <MaterialIcons name="tv" size={36} color="gold" />
                    </View>
                    <Text style={styles.utilitiesItemTitle}>Tivi</Text>
                  </View>
                  <View>
                    <View style={styles.utilitiesItem}>
                      <MaterialIcons name="wifi" size={36} color="gold" />
                    </View>
                    <Text style={styles.utilitiesItemTitle}>Wifi</Text>
                  </View>
                  <View>
                    <View style={styles.utilitiesItem}>
                      <MaterialCommunityIcons
                        name="power-plug-outline"
                        size={36}
                        color="gold"
                      />
                    </View>
                    <Text style={styles.utilitiesItemTitle}>
                      Sạc điện thoại
                    </Text>
                  </View>
                  <View>
                    <View style={styles.utilitiesItem}>
                      <MaterialCommunityIcons
                        name="speaker"
                        size={36}
                        color="gold"
                      />
                    </View>
                    <Text style={styles.utilitiesItemTitle}>Loa bluetooth</Text>
                  </View>
                  <View>
                    <View style={styles.utilitiesItem}>
                      <FontAwesome name="snowflake-o" size={36} color="gold" />
                    </View>
                    <Text style={styles.utilitiesItemTitle}>Điều hòa</Text>
                  </View>
                </ScrollView>
              </View>

              {/* Image */}
              <View style={styles.utilitiesWrapper}>
                <Text style={styles.routeTitle}>Hình ảnh</Text>
                <ScrollView
                  style={styles.imageList}
                  contentContainerStyle={{
                    gap: 8,
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      source={require("../../../assets/app_img/home_img.jpg")}
                      style={styles.image}
                    />
                  ))}
                </ScrollView>
              </View>

              {/* Rate */}
              <View style={styles.routeWrapper}>
                <Text style={styles.routeTitle}>Đánh giá</Text>
                <View style={styles.rateContainer}>
                  <View style={styles.rateItem}>
                    <Ionicons name="star" size={24} color="gold" />
                    <Text style={styles.rateItemTitle}>4.5</Text>
                    <Text style={styles.rateItemSub}>• 873 Đánh giá</Text>
                  </View>

                  <View style={styles.rateBarList}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.rateBarItem}>
                        <Text>Thái độ nhân viên</Text>
                        <View style={styles.rateBar}>
                          <View style={styles.rateBarFill} />
                        </View>
                      </View>
                      <View style={styles.rateBarItem}>
                        <Text>Chất lượng dịch vụ</Text>
                        <View style={styles.rateBar}>
                          <View style={styles.rateBarFill} />
                        </View>
                      </View>
                      <View style={styles.rateBarItem}>
                        <Text>An toàn</Text>
                        <View style={styles.rateBar}>
                          <View style={styles.rateBarFill} />
                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 1 }}>
                      <View style={styles.rateBarItem}>
                        <Text>Thông tin đầy đủ</Text>
                        <View style={styles.rateBar}>
                          <View style={styles.rateBarFill} />
                        </View>
                      </View>
                      <View style={styles.rateBarItem}>
                        <Text>Thông tin chính xác</Text>
                        <View style={styles.rateBar}>
                          <View style={styles.rateBarFill} />
                        </View>
                      </View>
                      <View style={styles.rateBarItem}>
                        <Text>Tiện nghi và thoải mái</Text>
                        <View style={styles.rateBar}>
                          <View style={styles.rateBarFill} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* policy */}
              <View style={styles.routeWrapper}>
                <Text style={styles.routeTitle}>Chính sách</Text>
                <View style={styles.policyContainer}>
                  <View style={styles.policyItem}>
                    <Text style={styles.policyItemTitle}>Thời gian huỷ</Text>
                    <Text style={styles.policyItemTitle}>Phí huỷ</Text>
                  </View>
                  <View style={[styles.policyItem, { marginTop: 8 }]}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: 50 }}>
                        <Text>Trước</Text>
                      </View>

                      <Text style={styles.policyItemSub}>14:45 22/11/2024</Text>
                    </View>
                    <Text style={styles.policyItemTitle}>10%</Text>
                  </View>
                  <View style={styles.policyItem}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: 50 }}>
                        <Text>Sau</Text>
                      </View>
                      <Text style={styles.policyItemSub}>14:45 22/11/2024</Text>
                    </View>
                    <Text style={styles.policyItemTitle}>100%</Text>
                  </View>
                </View>
              </View>

              {/* note */}
              <View style={styles.routeWrapper}>
                <View style={styles.noteContainer}>
                  <Ionicons name="information-circle" size={24} color="gray" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.noteText}>Ghi chú</Text>
                    <Text style={styles.noteSub}>
                      Phí huỷ sẽ được tính trên giá gốc, không giảm trừ khuyễn
                      mãi hoặc giảm giá; đồng thời không vượt quá số tiền quý
                      khách đã thanh toán.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.padding} />
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 10,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  padding: {
    paddingBottom: 24,
  },
  info: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    color: APP_COLORS.blue,
  },
  carImage: {
    width: width * 0.3,
    height: width * 0.3,
    objectFit: "contain",
  },
  infoContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
    backgroundColor: APP_COLORS.aliceBlue,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  infoSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  infoText: {
    fontSize: 16,
  },
  infoPrice: {
    fontSize: 16,
  },
  routeContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tabItem: {
    backgroundColor: APP_COLORS.white,
    flex: 1,
  },
  tabText: {
    fontSize: 18,
    color: APP_COLORS.primary,
    textAlign: "center",
  },
  activeTab: {},

  listContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  listItem: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 16,
  },
  time: {
    fontSize: 16,
  },
  location: {
    fontSize: 18,
  },
  routeWrapper: {
    marginTop: 16,
  },
  utilitiesWrapper: {
    marginTop: 24,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  locationSub: {
    color: APP_COLORS.lightGray,
    fontSize: 16,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: APP_COLORS.gray,
    marginHorizontal: width * 0.1,
    marginVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: APP_COLORS.blue,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  utilitiesItem: {
    width: 80,
    height: 80,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  utilitiesList: {
    marginLeft: 16,
    marginTop: 4,
  },
  utilitiesItemTitle: {
    fontSize: 14,
    textAlign: "center",
    width: 80,
    color: APP_COLORS.lightGray,
  },
  image: {
    width: width * 0.5,
    height: (width * 0.5 * 3) / 4,
    objectFit: "cover",
    borderRadius: 16,
  },
  imageList: {
    marginLeft: 16,
    marginTop: 4,
  },
  rateContainer: {
    marginHorizontal: 16,
  },
  rateItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  rateItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rateItemSub: {
    fontSize: 14,
    color: "#808080",
  },
  rateBarItem: {
    gap: 4,
    marginBottom: 16,
  },
  rateBar: {
    height: 8,
    backgroundColor: APP_COLORS.gray,
    borderRadius: 999,
  },
  rateBarList: {
    marginTop: 24,
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  rateBarFill: {
    height: "100%",
    backgroundColor: APP_COLORS.lightGray,
    borderRadius: 4,
    width: "60%",
  },
  policyContainer: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: APP_COLORS.gray,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  policyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  policyItemSub: {
    fontSize: 16,
  },
  policyItemTitle: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  noteContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 16,
  },
  noteText: {
    fontSize: 16,
  },
  noteSub: {
    fontSize: 15,
  },
});
const tabLine = (active: boolean): ViewStyle => ({
  width: "100%",
  height: 3,
  backgroundColor: active ? APP_COLORS.primary : APP_COLORS.gray,
  marginVertical: 8,
});
export default TripOverviewBottomSheet;
