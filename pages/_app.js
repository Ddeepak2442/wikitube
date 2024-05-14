import './globals.css'
import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <>
        <Component {...pageProps} />
        <Analytics />
      </>
    </SessionProvider>
  );
}