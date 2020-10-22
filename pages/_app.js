import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/font.css'
import '../css/style.css'

import Head from 'next/head'

import { AuthProvider } from '../context/auth'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  )
}

export default MyApp
