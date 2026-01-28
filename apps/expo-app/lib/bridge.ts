/**
 * Bridge helpers for sending messages from React Native to the web app
 * inside the WebView. The web app listens for CustomEvent('rn-message', { detail }).
 */

import type { BridgeMessage } from "bridge-types";

export type { BridgeMessage };

/**
 * Builds JavaScript to dispatch a CustomEvent('rn-message', { detail: payload })
 * so the web app can receive it via window.addEventListener('rn-message', handler).
 * Uses encodeURIComponent to safely pass JSON into the injected script.
 */
export function buildInjectScript(payload: BridgeMessage): string {
  const json = JSON.stringify(payload);
  const encoded = encodeURIComponent(json);
  return `(function(){try{var d=JSON.parse(decodeURIComponent("${encoded}"));window.dispatchEvent(new CustomEvent("rn-message",{detail:d}));}catch(e){}})();`;
}
