import '../styles/globals.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
