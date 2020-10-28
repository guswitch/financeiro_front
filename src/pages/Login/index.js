import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/logo_financeiro.svg';
import { login } from '../../services/auth';

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './styles.css';

export default function Login() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    async function handleSubmit(e){
        e.preventDefault();
        
        try {
            const response = await api.post('/session',{email: email,password: password});
            console.log(response.data);
            login(response.data.token);
            setRedirect(true);
            
        } catch(err) {
            toast.error('Email or password wrong', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error('Usuario ou senha incorretos');
        }

    }

    if(redirect)
    return <Redirect to='/home'/>

    return(
        <>
            <div className="app">
                <div className="container"> 
                <img src={logo} alt="logotipo" className="img-logo"/>
{/* 
                    <h1 className="title-page"> Login </h1>
                    <hr className="line-title"/> */}

                    <form onSubmit={(e)=>handleSubmit(e)} className="form-container">

                       <label>  Email </label><br/>
                        <input type="email" 
                            placeholder="Type your email..."
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-field"
                            required
                        />

                        <br/>

                        <label> Password </label><br/>

                        <input type="password" 
                        placeholder="Type your senha..."
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-field"
                        required
                        />

                        <br/>

                        <button type="submit" className="form-submit">Login</button>

                    </form>

                <br/>

                <div className="row">
                    <div className="col">
                        <Link to="/forgetpassword" className="alternative-links"> Recover my password  </Link> 
                    </div>
                    <div className="col">
                        <Link to="/signup" className="alternative-links">  Sign Up </Link>
                    </div>
                </div>

                </div>
                <br/>

            </div>
                
            
            
            <ToastContainer/>

        </>
    );
}