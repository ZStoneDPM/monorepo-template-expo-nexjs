import { useRef, useCallback, type ComponentType, type RefObject } from "react";
import { StyleSheet, View } from "react-native";
import WebViewBase, {
  type WebViewMessageEvent,
  type WebViewProps,
} from "react-native-webview";
import Constants from "expo-constants";
import { buildInjectScript } from "@/lib/bridge";

// react-native-webview class component types resolve to `never` under React 19 + TS 6.
type WebViewInstance = InstanceType<typeof WebViewBase>;
const WebView = WebViewBase as unknown as ComponentType<
  WebViewProps & { ref?: RefObject<WebViewInstance | null> }
>;

const WEBVIEW_URL =
  process.env.EXPO_PUBLIC_WEBVIEW_URL ||
  Constants.expoConfig?.extra?.webViewUrl ||
  "https://your-next-app.vercel.app";

export default function WebViewScreen() {
  const webViewRef = useRef<WebViewInstance>(null);

  const handleMessage = useCallback((event: WebViewMessageEvent): void => {
    const { data } = event.nativeEvent;
    try {
      const msg = JSON.parse(data) as { type: string; payload?: unknown };
      if (__DEV__) {
        console.log("[Bridge from web]", msg.type, msg.payload);
      }
      if (msg.type === "HELLO") {
        const script = buildInjectScript({
          type: "HELLO_REPLY",
          payload: { from: "react-native", ts: Date.now() },
        });
        webViewRef.current?.injectJavaScript(script);
      }
    } catch {
      if (__DEV__) console.warn("[Bridge] Invalid JSON from web:", data);
    }
  }, []);

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
