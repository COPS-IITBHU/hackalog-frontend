import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/font.css"
import "../styles/style.css"
import "../styles/misc.css"
import "react-toastify/dist/ReactToastify.css"

import { ThemeProvider, StyleReset } from "atomize"
import { Provider as StyletronProvider } from "styletron-react"
import { styletron, debug } from "../context/styletron"
import Head from "next/head"

import { AuthProvider } from "../context/auth"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { ToastContainer } from "react-toastify"
import { AppProps } from "next/dist/next-server/lib/router/router"

const theme = {
    fontFamily: {
        primary: "madetommy-regular, Raleway, serif",
    },
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <StyletronProvider
                value={styletron}
                debug={debug}
                debugAfterHydration
            >
                <ThemeProvider theme={theme}>
                    <StyleReset />
                    <AuthProvider>
                        <Header />
                        <div
                            style={{ paddingTop: "88px", minHeight: "100vh" }}
                            className="d-flex flex-column justify-content-between"
                        >
                            <Component {...pageProps} />
                            <ToastContainer />
                            <Footer />
                        </div>
                    </AuthProvider>
                </ThemeProvider>
            </StyletronProvider>
        </>
    )
}

export default MyApp
