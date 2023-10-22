
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd';
import '../public/css/styles.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import { Provider } from '../context';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import Head from 'next/head'; // Import the Head component from 'next/head'

function MyApp({Component, pageProps}) {

    const router = useRouter(); // Initialize the router object
    const isHomePage = router.pathname === '/';



    return(
        <Provider> 

            <Head>        
                <link rel="icon" href="/favicon.jpg" />        
            </Head> 

            <ToastContainer />
            <Navbar/> 
            {isHomePage && <Header />}
            <Component {...pageProps}/> 
            <Footer/>
        </Provider> 
    )
}

export default MyApp