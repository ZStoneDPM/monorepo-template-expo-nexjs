"use client";

import { useState, useCallback } from "react";
import {
  isInWebView,
  sendToReactNative,
  useBridgeFromRN,
} from "@/hooks/useBridge";

export default function Home() {
  const [lastFromRN, setLastFromRN] = useState<string>("—");
  const inWebView = isInWebView();

  useBridgeFromRN(
    useCallback((payload: unknown) => {
      setLastFromRN(
        typeof payload === "string" ? payload : JSON.stringify(payload),
      );
    }, []),
  );

  const handleSendHello = () => {
    sendToReactNative({
      type: "HELLO",
      payload: { from: "web", ts: Date.now() },
    });
  };

  return (
    <main style={{ maxWidth: 600 }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Next.js Web (WebView)</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        This app is deployed to an external URL and loaded in the Expo
        app&apos;s WebView.
      </p>

      {inWebView ? (
        <section style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
            Bridge (WebView)
          </h2>
          <p style={{ marginBottom: "0.5rem" }}>
            Last message received from React Native:{" "}
            <strong>{lastFromRN}</strong>
          </p>
          <button
            type="button"
            onClick={handleSendHello}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Send HELLO to React Native
          </button>
        </section>
      ) : (
        <p style={{ color: "#888", marginBottom: "1.5rem" }}>
          Not running inside WebView. Bridge actions are available only when
          loaded in the Expo app.
        </p>
      )}

      <p style={{ fontSize: "0.875rem", color: "#666" }}>
        Deploy this app (e.g. Vercel), set EXPO_PUBLIC_WEBVIEW_URL to that URL,
        and run the Expo app to test the bridge.
      </p>
    </main>
  );
}
