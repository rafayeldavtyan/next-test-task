import '../styles/globals.css';
import { ThemeProvider as CustomThemeProvider } from "../context/ThemeContext";

export default function App({ Component, pageProps }) {
    return (
        <CustomThemeProvider>
            <Component {...pageProps} />
        </CustomThemeProvider>
    );
}
