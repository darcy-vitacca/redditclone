import Axios from "axios";
import { AppProps } from "next/app";
import "../styles/tailwind.css";
import "../styles/icons.css";
import Navbar from "../components/navbar";
import {useRouter} from 'next/router';
import { AuthProvider} from '../context/auth'


Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true; // this always sends cookie on client side

function App({ Component, pageProps }: AppProps) {
  const {pathname} = useRouter();
  const authRoutes = ['/register', '/login']
  const authRouter = authRoutes.includes(pathname)
  return (
    <AuthProvider>
      {!authRouter && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
