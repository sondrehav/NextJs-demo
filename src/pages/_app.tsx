import {AppProps} from 'next/app';
import 'style/style.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
  </>
}
export default MyApp
