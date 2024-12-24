import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tinycolor from "tinycolor2";
import ContactBottomSheet from "./components/ContactBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Modal from "../../components/common/Modal";

const HEADER_HEIGHT = 180;

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  borderRadius?: {
    topLeft?: number;
    topRight?: number;
    bottomLeft?: number;
    bottomRight?: number;
  };
  onPress?: () => void;
};

const MenuItem = ({ icon, title, borderRadius, onPress }: MenuItemProps) => (
  <TouchableOpacity
    style={[
      styles.menuItem,
      borderRadius && {
        borderTopLeftRadius: borderRadius.topLeft,
        borderTopRightRadius: borderRadius.topRight,
        borderBottomLeftRadius: borderRadius.bottomLeft,
        borderBottomRightRadius: borderRadius.bottomRight,
      },
    ]}
    onPress={onPress}
  >
    <View style={styles.menuItemContent}>
      {icon}
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    {title !== "Đăng xuất" && (
      <Ionicons name="chevron-forward" size={24} color="black" />
    )}
  </TouchableOpacity>
);

const AccountScreen = () => {
  const navigation = useNavigation<navigation<"AccountStack">>();

  const [isLogin, setIsLogin] = React.useState(true);

  const [isLogoutModalVisible, setIsLogoutModalVisible] = React.useState(false);

  const handleOpenLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalVisible(false);
  };

  const handleLogout = () => {
    setIsLogoutModalVisible(false);
    setIsLogin(false);
  };

  const menuItems = [
    {
      icon: (
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={APP_COLORS.primary}
        />
      ),
      title: "Giới thiệu nhà xe",
      borderRadius: {
        topLeft: 16,
        topRight: 16,
        bottomLeft: 16,
        bottomRight: 16,
      },
      standalone: true,
      onPress: () =>
        navigation.navigate("WebViewScreen", {
          url: "https://xetuantrung.com",
          title: "Giới thiệu nhà xe",
        }),
    },
    {
      icon: (
        <FontAwesome5 name="building" size={24} color={APP_COLORS.primary} />
      ),
      title: "Văn phòng nhà xe",
      standalone: true,
      borderRadius: {
        topLeft: 16,
        topRight: 16,
        bottomLeft: 16,
        bottomRight: 16,
      },
      onPress: () =>
        navigation.navigate("AccountStack", { screen: "GarageOffice" }),
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="ticket-percent-outline"
          size={24}
          color={APP_COLORS.primary}
        />
      ),
      title: "Ưu đãi",
      borderRadius: { topLeft: 16, topRight: 16 },
      onPress: () =>
        navigation.navigate("AccountStack", {
          screen: "Coupon",
        }),
    },
    {
      icon: <AntDesign name="setting" size={24} color={APP_COLORS.primary} />,
      title: "Cài đặt",
      borderRadius: { topLeft: isLogin ? 0 : 16, topRight: isLogin ? 0 : 16 },
      onPress: () =>
        navigation.navigate("AccountStack", {
          screen: "Setting",
        }),
    },
    {
      icon: (
        <AntDesign
          name="questioncircleo"
          size={24}
          color={APP_COLORS.primary}
        />
      ),
      title: "Hỗ trợ",
      onPress: () => navigation.navigate("AccountStack", { screen: "Support" }),
    },
    {
      icon: (
        <Ionicons
          name="mail-unread-outline"
          size={24}
          color={APP_COLORS.primary}
        />
      ),
      title: "Góp ý",
      borderRadius: {
        bottomLeft: isLogin ? 0 : 16,
        bottomRight: isLogin ? 0 : 16,
      },
      onPress: () =>
        navigation.navigate("AccountStack", {
          screen: "Feedback",
        }),
    },
    {
      icon: (
        <MaterialIcons name="logout" size={24} color={APP_COLORS.primary} />
      ),
      title: "Đăng xuất",
      borderRadius: { bottomLeft: 16, bottomRight: 16 },
      onPress: handleOpenLogoutModal,
    },
  ];
  const contactBottomSheetRef = React.useRef<BottomSheetModal>(null);

  const handleOpenContactBottomSheet = () => {
    contactBottomSheetRef.current?.present();
  };
  const handleCloseContactBottomSheet = () => {
    contactBottomSheetRef.current?.dismiss();
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          height: HEADER_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: APP_COLORS.primary,
          flexDirection: "row",
          paddingBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "space-between",
            paddingHorizontal: 24,
          }}
        >
          {!isLogin && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LoginStack", {
                  screen: "EnterPhoneNumber",
                })
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: APP_COLORS.white,
                }}
              >
                Bạn chưa đăng nhập
                <Ionicons
                  name="log-in-outline"
                  size={24}
                  color={APP_COLORS.white}
                />
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: APP_COLORS.white,
                }}
              >
                Đăng nhập ngay
              </Text>
            </TouchableOpacity>
          )}
          {isLogin && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AccountStack", {
                  screen: "EditProfile",
                })
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: APP_COLORS.white,
                }}
              >
                Admin <Feather name="edit" size={20} color={APP_COLORS.white} />
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  color: APP_COLORS.white,
                }}
              >
                0909090909
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: APP_COLORS.gray,
            }}
          >
            <MaterialCommunityIcons
              name="account"
              size={40}
              color={APP_COLORS.white}
            />
          </View>
        </View>
      </View>
      {/* Menu items */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {menuItems
          .filter(
            (item) =>
              (isLogin ? true : !item.title.includes("Đăng xuất")) &&
              (isLogin ? true : !item.title.includes("Ưu đãi"))
          )
          .map((item, index) => (
            <React.Fragment key={item.title}>
              <MenuItem
                icon={item.icon}
                title={item.title}
                borderRadius={item.borderRadius}
                onPress={item.onPress}
              />
              {!item.standalone &&
                index <
                  menuItems.filter(
                    (item) =>
                      (isLogin ? true : !item.title.includes("Đăng xuất")) &&
                      (isLogin ? true : !item.title.includes("Ưu đãi"))
                  ).length -
                    1 && <View style={styles.divider} />}
              {item.standalone && <View style={styles.spacing} />}
            </React.Fragment>
          ))}

        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Xe khách Tuấn Trung</Text>
          <Text style={styles.contactTitle}>Hệ thống văn phòng</Text>
          <View>
            <Text style={styles.contactTitle}>Thông tin liên hệ</Text>
            <View style={styles.contactItem}>
              <View style={styles.contactItemContent}>
                <View>
                  <MaterialIcons
                    name="local-phone"
                    size={18}
                    color={tinycolor(APP_COLORS.lightGray)
                      .darken(10)
                      .toHexString()}
                  />
                </View>
                <Text style={styles.contactText}>
                  Tổng đài đặt vé: 0909090909
                </Text>
              </View>

              <View style={styles.contactItemContent}>
                <View>
                  <MaterialIcons
                    name="email"
                    size={18}
                    color={tinycolor(APP_COLORS.lightGray)
                      .darken(10)
                      .toHexString()}
                  />
                </View>
                <Text style={styles.contactText}>Email: admin@gmail.com</Text>
              </View>
              <View style={styles.contactItemContent}>
                <View>
                  <AntDesign
                    name="earth"
                    size={18}
                    color={tinycolor(APP_COLORS.lightGray)
                      .darken(10)
                      .toHexString()}
                  />
                </View>
                <Text style={styles.contactText}>
                  Website: https://xetuantrung.com
                </Text>
              </View>
              <View style={styles.contactItemContent}>
                <View>
                  <AntDesign
                    name="facebook-square"
                    size={18}
                    color={tinycolor(APP_COLORS.lightGray)
                      .darken(10)
                      .toHexString()}
                  />
                </View>
                <Text style={styles.contactText}>
                  Facebook: https://xetuantrung.com
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contactButtonContainer}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleOpenContactBottomSheet}
          >
            <Text style={styles.contactButtonText}>Liên hệ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Contact bottom sheet */}
      <ContactBottomSheet
        ref={contactBottomSheetRef}
        onClose={handleCloseContactBottomSheet}
      />

      {/*logout Modal */}
      <Modal
        visible={isLogoutModalVisible}
        onClose={handleCloseLogoutModal}
        title="Đăng xuất"
        subTitle="Bạn có chắc chắn muốn đăng xuất không?"
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },

  scrollView: {
    backgroundColor: APP_COLORS.white,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    marginTop: -40,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    zIndex: 999,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: APP_COLORS.gray,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: APP_COLORS.lightGray,
  },
  spacing: {
    height: 16,
  },
  contactInfo: {
    padding: 16,
  },
  contactItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginLeft: 12,
  },
  contactItem: {
    gap: 4,
  },
  contactTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  contactButton: {
    // padding: 8,
  },
  contactButtonText: {
    fontSize: 16,
    color: APP_COLORS.primary,
    textAlign: "center",
  },
  contactText: {
    color: tinycolor(APP_COLORS.lightGray).darken(10).toHexString(),
  },
  contactButtonContainer: {
    paddingBottom: 200,
  },
});

export default AccountScreen;
