import React from 'react';

import { Link } from 'react-router-dom';

import imgLogo from '../../assets/logo_financeiro.svg';

import { logout } from '../../services/auth';

import './styles.css';

export default function Header(){

    return(
        <header className="header-home">
        <img src={imgLogo} alt="Logotipo"/>
        <div className="user-options">
            <Link to="/auth" onClick={logout} className="link-logout"> Sair </Link>
        </div>
    </header>
    )
}