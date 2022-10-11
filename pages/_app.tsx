import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as SupabaseProvider } from "react-supabase";
import { supabase } from "../utils/supabaseClient";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { useToggle } from "@mantine/hooks";
import PageLayout from "../components/PageLayout";
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()

  const [colorScheme, toggleColorScheme] = useToggle([
    "dark",
    "light",
  ] as const);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: colorScheme }}
      >
        <SupabaseProvider value={supabase}>
          <UserProvider supabaseClient={supabaseClient}>
          <QueryClientProvider client={queryClient}>
            <PageLayout>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </PageLayout>
          </QueryClientProvider>
          </UserProvider>
        </SupabaseProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
