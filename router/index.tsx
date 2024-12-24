import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootTab from "./RootTab";
import TicketInfoScreen from "../screens/Ticket/TicketInfoScreen";
import BookingStack from "./BookingStack";
import { RootStackParamList } from "../types/stackParamList";
import NewsScreen from "../screens/Home/NewsScreen";
import ChooseDate from "../screens/Booking/ChooseDate";
import WebViewScreen from "../screens/WebViewScreen";
import AccountStack from "./AccountStack";
import LoginStack from "./LoginStack";
import ChooseLocationScreen from "../screens/Booking/ChooseLocation";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Naivgation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RootTab" component={RootTab} />
        <Stack.Screen name="TicketInfo" component={TicketInfoScreen} />
        <Stack.Screen
          name="ChooseDate"
          component={ChooseDate}
          options={{
            animation: "ios_from_right",
          }}
        />
        <Stack.Screen
          name="BookingStack"
          component={BookingStack}
          options={{
            animation: "ios_from_right",
          }}
        />
        <Stack.Screen
          name="News"
          component={NewsScreen}
          options={{
            animation: "ios_from_right",
          }}
        />
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{
            animation: "ios_from_right",
          }}
        />
        <Stack.Screen
          name="AccountStack"
          component={AccountStack}
          options={{
            animation: "ios_from_right",
          }}
        />
        <Stack.Screen
          name="LoginStack"
          component={LoginStack}
          options={{
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="ChooseLocation" component={ChooseLocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Naivgation;
