/**
 * react-native-webview injects this on the window when running inside the Expo/RN WebView.
 */
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (data: string) => void;
    };
  }
}

export {};
