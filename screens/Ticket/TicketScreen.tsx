import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import tinycolor from "tinycolor2";
import CurrentTicket from "./components/CurrentTicket";
import CancelTicket from "./components/CancelTicket";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");

const HEADER_HEIGHT = 120;

const TAB_ITEMS = ["Hiện tại", "Đã đi", "Đã huỷ"] as const;

const TicketScreen = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleChangeTab = (index: number) => {
    setSelectedTab(index);
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
  };

  const renderTabContent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <View style={styles.ticketContainer}>
            <CurrentTicket />
            <CurrentTicket />
            <CurrentTicket />
          </View>
        );
      case 1:
        return (
          <View style={styles.emptyStateContainer}>
            <Image
              source={require("../../assets/app_img/split.png")}
              style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateText}>
              Bạn chưa có hành trình nào sắp tới
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.ticketContainer}>
            <CancelTicket />
            <CancelTicket />
            <CancelTicket />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chuyến của tôi</Text>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.tabContainer}>
          {TAB_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeTab(index)}
              style={[
                styles.tabButton,
                index === selectedTab && styles.activeTabButton,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  index === selectedTab && styles.activeTabText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        style={styles.horizontalScroll}
        pagingEnabled
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          const index = Math.round(x / SCREEN_WIDTH);
          handleChangeTab(index);
        }}
      >
        {TAB_ITEMS.map((_, index) => (
          <ScrollView
            key={index}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={styles.verticalScroll}
          >
            {renderTabContent(index)}
          </ScrollView>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary,
  },
  headerText: {
    color: APP_COLORS.white,
    fontSize: 18,
    marginBottom: 32,
    fontWeight: "bold",
  },
  contentWrapper: {
    marginTop: -20,
    zIndex: 2,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: APP_COLORS.white,
  },
  tabContainer: {
    backgroundColor: tinycolor(APP_COLORS.primary).lighten(35).toString(),
    height: 50,
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 8,
  },
  tabButton: {
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  tabText: {
    fontSize: 14,
    color: APP_COLORS.black,
  },
  horizontalScroll: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  verticalScroll: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    flex: 1,
    paddingTop: 16,
  },
  ticketContainer: {
    gap: 16,
    paddingBottom: 100,
  },
  emptyStateContainer: {
    gap: 16,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "center",
    minHeight: SCREEN_HEIGHT - HEADER_HEIGHT,
  },
  emptyStateImage: {
    width: 75,
    height: 75,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
  },
  activeTabButton: {
    backgroundColor: APP_COLORS.white,
  },
  activeTabText: {
    color: APP_COLORS.primary,
  },
});

export default TicketScreen;
