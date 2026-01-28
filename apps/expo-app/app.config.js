export default ({ config }) => {
  const webViewUrl =
    process.env.EXPO_PUBLIC_WEBVIEW_URL || "https://your-next-app.vercel.app";
  return {
    ...config,
    extra: {
      ...config?.extra,
      webViewUrl,
    },
  };
};
