
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Extra/Loading';
import useAuth from '../hooks/useAuth';

const PrivetRoute = ({children}) => {
    const{user,loading}=useAuth();
    const location=useLocation();
    
    if(loading){
        return <Loading></Loading>
    }
    if(user && user.email){
        return children
    }
    return <Navigate state={location.pathname} to="/auth/login" ></Navigate>
};

export default PrivetRoute;