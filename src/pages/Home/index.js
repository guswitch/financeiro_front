import React from 'react';

import './styles.css';
import Header from '../../components/Header';
import AccountsPayable from '../../components/AccountsPayable';
import AccountsReceivable from '../../components/AccountsReceivable';
import Departments from '../../components/Departments';
import Creditors from '../../components/Creditors';
import Debtors from '../../components/Debtors';
import Cotacao from '../../components/Cotacao';

export default function Home() {

    return (
        <div>
            <Header />

            <div id="container-root">
                <Cotacao />
                <AccountsPayable />
                <AccountsReceivable />
                <Creditors />
                <Debtors />
                <Departments />
            </div>

        </div>

    )
}