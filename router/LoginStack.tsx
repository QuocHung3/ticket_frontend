import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/stackParamList";

import EnterPhoneNumberScreen from "../screens/Login/EnterPhoneNumberScreen";
import VerifyOTPScreen from "../screens/Login/VerifyOTPScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="EnterPhoneNumber"
        component={EnterPhoneNumberScreen}
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="VerifyOTP"
        component={VerifyOTPScreen}
        options={{
          animation: "ios_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
