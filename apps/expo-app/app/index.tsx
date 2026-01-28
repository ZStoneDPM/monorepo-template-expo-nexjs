import { useRef, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import type { NativeSyntheticEvent, NativeEvent } from "react-native";
import Constants from "expo-constants";
import { buildInjectScript } from "@/lib/bridge";

const WEBVIEW_URL =
  process.env.EXPO_PUBLIC_WEBVIEW_URL ||
  Constants.expoConfig?.extra?.webViewUrl ||
  "https://your-next-app.vercel.app";

export default function WebViewScreen() {
  const webViewRef = useRef<WebView>(null);

  const handleMessage = useCallback(
    (event: NativeSyntheticEvent<{ data: string }>) => {
      const { data } = event.nativeEvent;
      try {
        const msg = JSON.parse(data) as { type: string; payload?: unknown };
        if (__DEV__) {
          console.log("[Bridge from web]", msg.type, msg.payload);
        }
        if (msg.type === "HELLO") {
          // Example: send a reply back to the web app
          const script = buildInjectScript({
            type: "HELLO_REPLY",
            payload: { from: "react-native", ts: Date.now() },
          });
          webViewRef.current?.injectJavaScript(script);
        }
      } catch {
        if (__DEV__) console.warn("[Bridge] Invalid JSON from web:", data);
      }
    },
    [],
  );

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: WEBVIEW_URL }}
        originWhitelist={["https://*"]}
        onMessage={handleMessage}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight ?? 0,
  },
  webview: {
    flex: 1,
  },
});
