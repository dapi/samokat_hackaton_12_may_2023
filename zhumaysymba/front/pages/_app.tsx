import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import { store } from "../services/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
