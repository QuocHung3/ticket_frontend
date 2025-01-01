import React, { useState, createContext } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Naivgation from "./router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ToastProvider } from 'react-native-toast-notifications';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';

export const DataContext = createContext({
  data: {
    ngayKhoiHanh: new Date().toLocaleDateString()
  },
  setData: (newD) => newD
});

export default function App() {
  const [data, setData] = useState();


  return (
    <DataContext.Provider value={{data, setData}}>
      <StripeProvider
        publishableKey="pk_test_51QcQOUJBpWVJbeYZEzHcQuRISBIYaROseKmGXdTgymYc1FPxexPwn0ZXMI1MpCyHqswcVo56B2kchQ79iFni7DrJ00uX46RSVj" // Thay bằng Publishable Key từ Stripe
      >
      <ToastProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Naivgation />
            <Toast />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ToastProvider>
      </StripeProvider>
    </DataContext.Provider>

    
  );
}
