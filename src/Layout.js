import {Routes, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManagerUser from './components/Admin/Content/ManagerUser';
import Dashboard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import App from './App';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';

const NotFound = () => {
    return(
        <div className='container alert alert-danger'>
            404.Not found data with your current URL
        </div>
    )
}
const Layout = (props) => {
    return(
        <>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="users" element={<ListQuiz/>}/>
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz/>}/>
                <Route path="/admin" element={<Admin/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="manager-users" element={<ManagerUser/>}/>
                    <Route path="manager-quizzes" element={<ManageQuiz/>}/>
                    <Route path="manager-questions" element={<Questions/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path="*" element={<NotFound/>}/>
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