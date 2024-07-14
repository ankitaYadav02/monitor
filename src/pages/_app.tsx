import "../global.css";
import { AppProps } from "next/app";
import { useEffect } from "react";

enum THEME_OPTION {
  LIGHT = "light",
  DARK = "dark",
}
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const currentTime = new Date().getHours();
    const isDaytime = currentTime >= 6 && currentTime < 18;

    document.documentElement.setAttribute(
      "data-theme",
      isDaytime ? THEME_OPTION.LIGHT : THEME_OPTION.DARK
    );

    const intervalId = setInterval(() => {
      const newTime = new Date().getHours();
      const newIsDaytime = newTime >= 6 && newTime < 18;

      if ((isDaytime && !newIsDaytime) || (!isDaytime && newIsDaytime)) {
        document.documentElement.setAttribute(
          "data-theme",
          newIsDaytime ? THEME_OPTION.LIGHT : THEME_OPTION.DARK
        );
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
