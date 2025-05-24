import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { makeStore } from '@/lib/store/store';

import "@/styles/globals.css";

const store = makeStore();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();


  return (
    <Provider store={store}>
      <HeroUIProvider navigate={router.push}>
          <div className="main">
            <Component {...pageProps} />
          </div>
      </HeroUIProvider>
    </Provider>
  );
}
