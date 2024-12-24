import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/stackParamList";
import AccountScreen from "../screens/Account/AccountScreen";
import GarageOfficeScreen from "../screens/Account/GarageOfficeScreen";
import SupportScreen from "../screens/Account/SupportScreen";
import SettingScreen from "../screens/Account/SettingScreen";
import FeedBackScreen from "../screens/Account/FeedBackScreen";
import EditProfileScreen from "../screens/Account/EditProfileScreen";
import CouponScreen from "../screens/Account/CouponScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="GarageOffice" component={GarageOfficeScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="Feedback" component={FeedBackScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Coupon" component={CouponScreen} />
    </Stack.Navigator>
  );
};

export default AccountStack;
