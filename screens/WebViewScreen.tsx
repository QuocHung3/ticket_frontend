import React from "react";
import { WebView } from "react-native-webview";
import Header from "../components/common/Header";
import { View, StyleSheet } from "react-native";
import APP_COLORS from "../constants/color";
import { useRoute } from "@react-navigation/native";
import { route } from "../types/stackParamList";

export default function WebViewScreen() {
  const route = useRoute<route<"WebViewScreen">>();
  return (
    <View style={styles.container}>
      <Header title={route.params.title} />
      <View style={styles.webViewContainer}>
        <WebView style={styles.webView} source={{ uri: route.params.url }} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
});
