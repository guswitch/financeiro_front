import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

import api from '../../services/api';

import './styles.css';

export default function AccountsReceivable() {

    const [accountsReceivable, setAccountsReceivable] = useState([]);
    const [accountReceivable, setAccountReceivable] = useState({});
    const [debtors, setDebtors] = useState([]);

    let [debtor, setDebtor] = useState('');
    let [price, setPrice] = useState(0);
    let [emissionDate, setemissionDate] = useState(new Date());
    let [maturityDate, setmaturityDate] = useState(new Date());

    const [controllerComponents, setcontrollerComponents] = useState("");

    useEffect(() => {
        async function getAccountsReceivable() {
            try {
                const response = await api.get('/AccountsReceivable/');
                setAccountsReceivable(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getAccountsReceivable();
    }, [accountsReceivable]);

    useEffect(() => {
        async function getDebtor() {
            try {
                const response = await api.get('/Debtor/');
                // console.log(response.data);
                setDebtors(response.data);
            } catch (error) {
                console.error(error);
            }
        }
  
        getDebtor();
    },[debtors])

    async function RegisterAccount() {
        try {
            const response = await api.post('/AccountsReceivable/Create/', { debtorId: debtor, price, emissionDate, maturityDate });
            console.log(response.data);
            setcontrollerComponents("")
            // setCreditors(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function openDetailsAccount(_id) {
        try {
            const response = await api.get(`/AccountsReceivable/${_id}`);
            setAccountReceivable(response.data)
            console.log(accountReceivable);
            setcontrollerComponents("openDetails");

        } catch (error) {
            console.error(error);
        }
    }

    async function openDeleteAccount(_id) {
        let question = window.confirm('Você tem certeza que deseja excluir esse registro ?');
        //  console.log(question);
        if (question) {
            try {
                const response = await api.delete(`/AccountsReceivable/Delete/${_id}`);
                alert("Excluido com sucesso");
                setcontrollerComponents("");

            } catch (error) {
                console.error(error);
            }
        }
    }

    if (controllerComponents === "openRegister")
        return (
            <div className="container-accounts-payable-container">
                <div id="container-register-accounts-payable-bar">
                    <h1> Register Account </h1>
                    <button className="btnAddBill" onClick={RegisterAccount}> ✓ </button>
                </div>
                <div id="container-accounts-payable-content">
                    <form>

                        <label> Creditor: </label>
                        <select value={debtor} onChange={(e) => setDebtor(e.target.value)} required>
                            <option value="" selected disabled hidden> ------- Escolha uma opção ------- </option>
                            {
                                debtors.map(debtor => {
                                    return <option value={debtor._id}> {debtor.name} </option>
                                })
                            }
                        </select>
                        <p> {debtor}</p>

                        <label> Price: </label>
                        <input type="number" onChange={(e) => setPrice(e.target.value)} required />

                        <label> Emission Date: </label>
                        <input type="date" onChange={(e) => setemissionDate(e.target.value)} required />

                        <label> Maturity Date: </label>
                        <input type="date" onChange={(e) => setmaturityDate(e.target.value)} required />

                    </form>
                    <br />
                    <button onClick={() => setcontrollerComponents("")}> Voltar </button>
                </div>
            </div>
        );

    if (controllerComponents === "openDetails")
        return (
            <div className="container-accounts-payable-container">
                <div className="container-accounts-payable-bar">
                    <h1> Details Account </h1>
                </div>
                <div className="container-accounts-payable-content">
                    <label className="price"> {accountReceivable.price} R$ </label>
                    <p className="description"> {accountReceivable.debtorId.name} </p>
                    <p className="maturityDate"> {moment(accountReceivable.emissionDate).format('DD/MM/YYYY')} </p>
                    <p className="maturityDate"> {moment(accountReceivable.maturityDate).format('DD/MM/YYYY')} </p>
                    <br />
                    {/* <a href="#" onClick={() => setcontrollerComponents("openUpdate")}> Update </a> */}
                    <button onClick={() => openDeleteAccount(accountReceivable._id)}> Delete </button>
                    <button onClick={() => setcontrollerComponents("")}> Voltar </button>
                </div>
            </div>
        );

    return (
        <div className="container-accounts-payable-container" >
            <div className="container-accounts-payable-bar" >
                <h1> Bills to Receive </h1>
                <button className="btnAddBill" onClick={() => setcontrollerComponents("openRegister")} > + </button>
            </div>
            <div className="container-accounts-payable-content">
                {
                    accountsReceivable.map(accountReceivable => {

                        const { _id, price, maturityDate } = accountReceivable;

                        return (

                            <div className="banner"
                                key={_id} onClick={() => openDetailsAccount(_id)}>
                                <div className="info" >
                                    <label className="price" > {price} R$ </label>
                                    <p className="maturityDate" > {moment(maturityDate).format('DD/MM/YYYY')} </p>
                                </div>
                                <div className="actions" >
                                    <button className="btnpg" > Received </button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}


