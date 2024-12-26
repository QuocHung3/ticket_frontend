import React, { useState, createContext } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Naivgation from "./router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ToastProvider } from 'react-native-toast-notifications';
import Toast from 'react-native-toast-message';

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
      <ToastProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Naivgation />
            <Toast />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ToastProvider>
    </DataContext.Provider>

    
  );
}
