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

  const handleSendHello = (): void => {
    sendToReactNative({
      type: "HELLO",
      payload: { from: "web", ts: Date.now() },
    });
  };

  return (
    <main className="max-w-xl">
      <h1 className="mb-2 text-2xl font-semibold">Next.js Web (WebView)</h1>
      <p className="mb-6 text-on-surface-muted">
        This app is deployed to an external URL and loaded in the Expo
        app&apos;s WebView.
      </p>

      {inWebView ? (
        <section className="mb-6">
          <h2 className="mb-2 text-base font-medium">Bridge (WebView)</h2>
          <p className="mb-2">
            Last message received from React Native:{" "}
            <strong>{lastFromRN}</strong>
          </p>
          <button
            type="button"
            onClick={handleSendHello}
            className="cursor-pointer rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Send HELLO to React Native
          </button>
        </section>
      ) : (
        <p className="mb-6 text-on-surface-subtle">
          Not running inside WebView. Bridge actions are available only when
          loaded in the Expo app.
        </p>
      )}

      <p className="text-sm text-on-surface-muted">
        Deploy this app (e.g. Vercel), set EXPO_PUBLIC_WEBVIEW_URL to that URL,
        and run the Expo app to test the bridge.
      </p>
    </main>
  );
}
