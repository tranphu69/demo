import './Login.scss';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import {toast} from 'react-toastify';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() => {
        //validate

        //submit apis
        let res = await postLogin(email, password);
        if(res && +res.EC === 0){
            toast.success(res.EM);
          }
          if(res && +res.EC !== 0){
            toast.error(res.EM);
          }
    }

    return(
        <div className='login-container'>
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Khoa Hoc
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email: </label>
                    <input type='text' className='form-control' value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div> 
                <div className='form-group'>
                    <label>Password: </label>
                    <input type='password' className='form-control' value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div> 
                <span className='forgot-password'>Forgot password?</span>
                <div>
                    <button className='btn-submit' onClick={() => handleLogin()}>Log in to Khoa Hoc</button>
                </div>
                <div className='text-center'> 
                    <span className='back' onClick={() => {navigate('/')}}> &#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;