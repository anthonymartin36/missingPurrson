//import type { AppProps } from "next/app";
import Script from "next/script";
import { useState } from "react";

export default function App({ Component, pageProps }: any) {
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  return (
    <>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=MY_KEY&amp;libraries=places"
        onLoad={() => setGoogleApiLoaded(true)}
      ></Script>
      {googleApiLoaded && <Component {...pageProps} />}
    </>
  );
}