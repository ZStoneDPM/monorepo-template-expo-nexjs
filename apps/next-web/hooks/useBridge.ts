"use client";

import { useEffect, useCallback } from "react";
import type { BridgeMessage } from "bridge-types";

const RN_MESSAGE_EVENT = "rn-message";

/**
 * Returns true when the app is running inside the React Native WebView
 * (react-native-webview injects window.ReactNativeWebView).
 */
export function isInWebView(): boolean {
  if (typeof window === "undefined") return false;
  return window.ReactNativeWebView != null;
}

/**
 * Send a message from the web app to React Native.
 * Only works when running inside the WebView (isInWebView() is true).
 */
export function sendToReactNative(message: BridgeMessage): void {
  if (typeof window === "undefined" || !window.ReactNativeWebView) return;
  window.ReactNativeWebView.postMessage(JSON.stringify(message));
}

/**
 * Hook to listen for messages from React Native.
 * RN sends via injectJavaScript dispatching a CustomEvent('rn-message', { detail: payload }).
 * Only registers the listener when running inside the WebView.
 */
export function useBridgeFromRN(onMessage: (payload: unknown) => void): void {
  useEffect(() => {
    if (!isInWebView()) return;
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== undefined) {
        onMessage(customEvent.detail);
      }
    };
    window.addEventListener(RN_MESSAGE_EVENT, handler);
    return () => window.removeEventListener(RN_MESSAGE_EVENT, handler);
  }, [onMessage]);
}
