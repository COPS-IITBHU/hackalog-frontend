import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/Header/Header'
import '../css/font.css'
import '../css/style.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
