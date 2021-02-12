import Axios from "axios";
import { AppProps } from "next/app";
import "../styles/tailwind.css";
import Navbar from "../components/navbar";
import { Fragment } from "react";
import {useRouter} from 'next/router';



Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true; // this always sends cookie on client side

function App({ Component, pageProps }: AppProps) {
  const {pathname} = useRouter();
  const authRoutes = ['/register', 'login']
  const authRouter = authRoutes.includes(pathname)
  return (
    <Fragment>
      {!authRouter && <Navbar />}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default App;
