import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import App from "next/app";
import Head from "next/head";
import { fetchAPI } from "../lib/api";
import { createContext } from "react";
import { getStrapiMedia } from "../lib/media";
import { ImmortalThemeProvider } from "../lib/theme";
import AuthProviderWalletWrapper from "../components/Providers/AuthProviderWalletWrapper";

export type ExtendedAppProps = AppProps & {
  emotionCache: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Store Strapi Global object in context
export const GlobalContext = createContext<Record<any, any>>({});

const MyApp = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { global } = pageProps;
  return (
    <AuthProviderWalletWrapper>
      <GlobalContext.Provider value={global}>
        <CacheProvider value={emotionCache}>
          <Head>
            <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} />
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ImmortalThemeProvider>
            <Component {...pageProps} />
          </ImmortalThemeProvider>
        </CacheProvider>
      </GlobalContext.Provider>
    </AuthProviderWalletWrapper>
  );
};

MyApp.getInitialProps = async (ctx: any) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const global = await fetchAPI("/global?populate=*");
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
