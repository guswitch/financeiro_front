import React from 'react';

import img from '../../assets/Under construction-bro.svg';

import './styles.css';
import Header from '../../components/Header';
import AccountsPayable from '../../components/AccountsPayable';
import AccountsReceivable from '../../components/AccountsReceivable';


export default function Home() {

    return (
        <>
            <Header />
            
                <AccountsPayable />
                <AccountsReceivable />
    
            {/* <div className="working">
                <img src={img} alt="Imagem"/>
                <br/>
                <div> This is being built </div>
            </div> */}

        </>

    )
}