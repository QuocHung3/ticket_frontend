import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TicketScreen from "../screens/Ticket/TicketScreen";
import TicketInfoScreen from "../screens/Ticket/TicketInfoScreen";

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Ticket" component={TicketScreen} />
      <Stack.Screen name="TicketInfo" component={TicketInfoScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
