import '../styles.css';
import '../styles/globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-0L8LSTFYY1" />
    </>
  );
}
