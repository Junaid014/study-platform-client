import { Outlet } from "react-router";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const AuthLayout = () => {
    return (
        <div>
            <header className=''>
               <Navbar/>
            </header>
            <main className=''>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default AuthLayout;