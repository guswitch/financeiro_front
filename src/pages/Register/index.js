import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';

import logo from '../../assets/logo_financeiro.svg';

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import '../Login/styles.css';

export default function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [userRegistered, setUserRegistered] = useState(false)

    async function HandleSubmit(e) {
        e.preventDefault()

        if(password !== passwordAgain){   
            toast.error('Passwords are not the same', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            return console.error('As senhas são diferentes, corrija e tente novamente')
        }
         

        try {
            const response = await api.post('/Register',{email,password})
            console.log(response.data)
            setUserRegistered(true);
        } catch(err) {
            toast.error('User already exists', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    if(userRegistered)
    return <Redirect to='/home'/>

    return(
        <>
        <div className="container">
            <img src={logo} alt="logotipo" className="img-logo"/>
            {/* <h1 className="title-page"> Register </h1>
                <hr className="line-title"/> */}
                <form onSubmit={e=>HandleSubmit(e)} className="form-container">

                    <label> Email </label><br/>
                    <input type="email" 
                        placeholder="Type your email..."
                        onChange={e => setEmail(e.target.value)}
                        className="form-field"
                        required/> <br/>
                    
                    <label> Password </label><br/>
                    <input type="password" 
                        placeholder="Type your password..."
                        onChange={e => setPassword(e.target.value)}
                        className="form-field"
                        required/><br/>
                    
                    <label> Repeat Password </label><br/>
                    <input type="password" 
                        placeholder="Repeat your password..."
                        onChange={e => setPasswordAgain(e.target.value)}
                        className="form-field"
                        required/>
                    
                    <br/>
                    <input type="submit" value="Register" className="form-submit"/>
                </form>
                <br/>
                <Link to="/" className="link-back-login"> Back to login </Link> 
        </div>

        <ToastContainer/>

        </>
    )
}