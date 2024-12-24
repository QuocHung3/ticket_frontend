import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TicketScreen from "../screens/Ticket/TicketScreen";
import APP_COLORS from "../constants/color";
import AccountScreen from "../screens/Account/AccountScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RootStackParamList } from "../types/stackParamList";
import HomeScreen from "../screens/Home/HomeScreen";
const Tab = createBottomTabNavigator<RootStackParamList>();
const RootTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#fff",
          borderRadius: 16,
          position: "absolute",
          bottom: 16,
          left: 12,
          right: 12,
          elevation: 8,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {},
        tabBarLabelStyle: {
          fontSize: 12,
          position: "relative",
          top: -8,
        },
        tabBarActiveTintColor: APP_COLORS.primary,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name="home-outline"
                size={24}
                color={props.color}
              />
            );
          },
          tabBarLabel: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name="ticket-outline"
                size={24}
                color={props.color}
              />
            );
          },
          tabBarLabel: "Vé của tôi",
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name={"bell-outline"}
                size={24}
                color={props.color}
              />
            );
          },
          tabBarLabel: "Thông báo",
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color={props.color}
              />
            );
          },
          tabBarLabel: "Tài khoản",
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTab;
