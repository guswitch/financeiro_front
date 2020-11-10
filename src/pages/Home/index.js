import React from 'react';

import './styles.css';
import Header from '../../components/Header';
import AccountsPayable from '../../components/AccountsPayable';
import AccountsReceivable from '../../components/AccountsReceivable';
import Departments from '../../components/Departments';
import Creditors from '../../components/Creditors';
import Debtors from '../../components/Debtors';

export default function Home() {

    return (
        <>
            <Header />

            <div id="container-root">
                <AccountsPayable />
                <AccountsReceivable />
                <Creditors />
                <Debtors />
                <Departments />
            </div>
            {/* <div className="working">
                <img src={img} alt="Imagem"/>
                <br/>
                <div> This is being built </div>
            </div> */}

        </>

    )
}