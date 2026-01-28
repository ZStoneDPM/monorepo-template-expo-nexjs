/**
 * Shared bridge message types for RN <-> WebView communication.
 * Used by apps/expo-app and apps/next-web.
 */

export type BridgeMessage = {
  type: string;
  payload?: Record<string, unknown>;
};

/** Example message types (extend as needed). */
export type BridgeMessageType = "HELLO" | "HELLO_REPLY" | "NAVIGATE";
