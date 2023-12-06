import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';

import ResponsiveAppBar from 'src/components/ResponsiveAppBar';

export const AppContext = React.createContext();

// Thresholds in pixels for detecting large screen
const WIDTH_TRESHOLD = 940;
const HEIGT_TRESHOLD = 900;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [largeScreen, setLargeScreen] = useState({ width: true, height: true });

  // ----------------------------------------
  // Set listeners for screen change
  // ----------------------------------------
  React.useEffect(() => {
    // Set initial
    setLargeScreen({
      width: window.matchMedia(`(min-width: ${WIDTH_TRESHOLD}px)`).matches,
      height: window.matchMedia(`(min-height: ${HEIGT_TRESHOLD}px)`).matches
    });

    // Handlers
    const handleWidthResize = e => {
      setLargeScreen(prev => ({
        ...prev,
        width: e.matches
      }))
    };

    const handleHeigthResize = e => {
      setLargeScreen(prev => ({
        ...prev,
        height: e.matches
      }))
    };

    // Set listeners
    window
      .matchMedia(`(min-width: ${WIDTH_TRESHOLD}px)`)
      .addEventListener('change', handleWidthResize);

    window
      .matchMedia(`(min-height: ${HEIGT_TRESHOLD}px)`)
      .addEventListener('change', handleHeigthResize);

    // Cleanup
    return () => {
      window.removeEventListener('change', handleWidthResize);
      window.removeEventListener('change', handleHeigthResize);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Brasileirão 2023</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppContext.Provider value={{
          largeScreen,
        }}>
          <div>
            <ResponsiveAppBar />
            <Component {...pageProps} />
          </div>
        </AppContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};