import {Routes, Route } from 'react-router-dom';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManagerUser from './components/Admin/Content/ManagerUser';
import Dashboard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import App from './App';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';

const Layout = (props) => {
    return(
        <>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="users" element={<User/>}/>
                </Route>
                <Route path="/admin" element={<Admin/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="manager-users" element={<ManagerUser/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Layout;