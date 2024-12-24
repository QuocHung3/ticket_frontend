import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/stackParamList";
import FindTrip from "../screens/Booking/FindTrip";
import SelectSeats from "../screens/Booking/SelectSeats";
import FilterScreen from "../screens/Booking/FilterScreen";
import PickUpDropOffFilter from "../screens/Booking/PickUpDropOffFilter";
import ChoosePickUpDropOff from "../screens/Booking/ChoosePickUpDropOff";
import BookingInfomation from "../screens/Booking/BookingInfomation";
import Payment from "../screens/Booking/Payment";
import PaymentMethod from "../screens/Booking/PaymentMethod";
import VerifyPayment from "../screens/Booking/VerifyPayment";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BookingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindTrip" component={FindTrip} />
      <Stack.Screen name="SelectSeat" component={SelectSeats} />
      <Stack.Screen name="Filter" component={FilterScreen} />
      <Stack.Screen
        name="PickUpDropOffFilter"
        component={PickUpDropOffFilter}
      />
      <Stack.Screen
        name="ChoosePickUpDropOff"
        component={ChoosePickUpDropOff}
      />
      <Stack.Screen name="BookingInfomation" component={BookingInfomation} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="VerifyPayment" component={VerifyPayment} />
    </Stack.Navigator>
  );
};

export default BookingStack;
