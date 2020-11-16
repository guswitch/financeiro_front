import React, { useEffect, useState } from "react";
import moment from 'moment';

import api from '../../services/api';

import './styles.css';

export default function AccountsPayable() {

    const [accountsPayable, setAccountsPayable] = useState([]);
    const [accountsPaid, setAccountsPaid] = useState([]);
    const [accountPayable, setAccountPayable] = useState({});
    const [creditors, setCreditors] = useState([]);


    let [description, setDescription] = useState('');
    let [creditor, setCreditor] = useState('');
    let [price, setPrice] = useState(0);
    let [emissionDate, setemissionDate] = useState(new Date());
    let [maturityDate, setmaturityDate] = useState(new Date());

    const [controllerComponents, setcontrollerComponents] = useState("");

    useEffect(() => {
        async function getAccountsPayable() {
            try {
                const response = await api.get('/AccountsPayable/');
                setAccountsPayable(response.data);

                const response2 = await api.get('/AccountsPaid/');
                setAccountsPaid(response2.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAccountsPayable();
    }, [accountsPayable]);

    useEffect(() => {
        async function getCreditor() {
            try {
                const response = await api.get('/Creditor/');
                // console.log(response.data);
                setCreditors(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getCreditor();
    }, [creditors]);

    async function RegisterAccount() {
        try {
            const response = await api.post('/AccountsPayable/Create/', { description, creditorId: creditor, price, emissionDate, maturityDate });
            console.log(response.data);
            setcontrollerComponents("")
            // setCreditors(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    /* async function UpdateAccount(_id) {
         try {
             const response = await api.put(`/AccountsPayable/Update/${_id}`, { description, creditorId: creditor, price, emissionDate, maturityDate });
             console.log(response.data);
             setcontrollerComponents("")
         } catch (error) {
             console.error(error);
         }
     } */

    async function openDetailsAccount(_id) {
        try {
            const response = await api.get(`/AccountsPayable/${_id}`);
            setAccountPayable(response.data)
            console.log(accountPayable);
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
                await api.delete(`/AccountsPayable/Delete/${_id}`);
                alert("Excluido com sucesso");
                setcontrollerComponents("");

            } catch (error) {
                console.error(error);
            }
        }
    }

    async function PayAccount(_id) {
        try {
            await api.put(`/AccountsPayable/Update/${_id}`, { paid: true });
            alert("conta paga com sucesso");
        } catch (error) {
            console.error(error);
        }
    }

    if (controllerComponents === "openDetails") {
        return (
            <div className="container-accounts-payable-container">
                <div className="container-accounts-payable-bar">
                    <h1> Details Account </h1>
                </div>
                <div className="container-accounts-payable-content">
                    <label className="price"> {accountPayable.price} R$ </label>
                    <p className="description"> <b> Creditor: </b> {accountPayable.creditorId.name} </p>
                    <p className="description"> <b> Description: </b> {accountPayable.description} </p>
                    <p className="maturityDate"> <b> Emission Date: </b> {moment(accountPayable.emissionDate).format('DD/MM/YYYY')} </p>
                    <p className="maturityDate"> <b> Maturity Date: </b> {moment(accountPayable.maturityDate).format('DD/MM/YYYY')} </p>
                    {accountPayable.paid ? (
                        <p className="bill-paid"> Paid Bill </p>
                    ) : (
                            <p className="bill-unpaid"> Unpaid Bill </p>
                        )}
                    <br />
                    {/* <a href="#" onClick={() => setcontrollerComponents("openUpdate")}> Update </a> */}
                    <div className="actions-details">
                        <button className="btn-back" onClick={() => setcontrollerComponents("")}> Voltar </button>
                        <button className="btn-delete" onClick={() => openDeleteAccount(accountPayable._id)}> Delete </button>
                    </div>
                </div>
            </div>
        );
    }

    if (controllerComponents === "openUpdate")
        return (
            {/* 
                <div className="container-accounts-payable-container">
                <div className="container-accounts-payable-bar">
                    <h1> Update Account </h1>
                    <button className="btnAddBill" onClick={() => UpdateAccount(accountPayable._id)}> ✓ </button>
                </div>
                <div className="container-accounts-payable-content">
                    <form>

                        <label> Description: </label>
                        <input type="text" onChange={(e) => setDescription(e.target.value)} required  placeholder={accountPayable.description}/>

                        <label> Creditor: </label>
                        <select onChange={(e) => setCreditor(e.target.value)} required>
                            <option value={accountPayable.creditorId.name} selected disabled hidden> {accountPayable.creditorId.name} </option>
                            {
                                creditors.map(creditor => {
                                    return <option value={creditor._id}> {creditor.name} </option>
                                })
                            }
                        </select>

                        <label> Price: </label>
                        <input type="number" onChange={(e) => setPrice(e.target.value)} required placeholder={accountPayable.price}/>

                        <label> Emission Date: </label>
                        <span> Data atual: {moment(accountPayable.emissionDate).format('DD/MM/YYYY')}</span>
                        <input type="date" onChange={(e) => setemissionDate(e.target.value)} required/>

                        <label> Maturity Date: </label>
                        <span> Data atual: {moment(accountPayable.maturityDate).format('DD/MM/YYYY')}</span>
                        <input type="date" onChange={(e) => setmaturityDate(e.target.value)} required />

                    </form>
                    <br />
                    <a href="#" onClick={() => setcontrollerComponents("")}> Voltar </a>
                </div>
                        </div> 
            */}
        );

    if (controllerComponents === "openRegister")
        return (
            <div className="container-accounts-payable-container">
                <div className="container-accounts-payable-bar">
                    <h1> Register Account </h1>
                    <button className="btnAddBill" onClick={RegisterAccount}> ✓ </button>
                </div>
                <div className="container-accounts-payable-content">
                    <form>

                        <label> Description: </label>
                        <input type="text" onChange={(e) => setDescription(e.target.value)} required />

                        <label> Creditor: </label>
                        <select value={creditor} onChange={(e) => setCreditor(e.target.value)} required>
                            <option value="" selected disabled hidden> ------- Escolha uma opção ------- </option>
                            {
                                creditors.map(creditor => {
                                    return <option value={creditor._id}> {creditor.name} </option>
                                })
                            }
                        </select>
                        {/* <p> {creditor}</p> */}

                        <label> Price: </label>
                        <input type="number" onChange={(e) => setPrice(e.target.value)} required />

                        <label> Emission Date: </label>
                        <input type="date" onChange={(e) => setemissionDate(e.target.value)} required />

                        <label> Maturity Date: </label>
                        <input type="date" onChange={(e) => setmaturityDate(e.target.value)} required />

                    </form>
                    <br />
                    <div className="actions-details">
                    <button class="btn-back" onClick={() => setcontrollerComponents("")}> Voltar </button>
                    </div>
                </div>
            </div>
        );

    if (controllerComponents === "openHistory") {
        return (
            <div className="container-accounts-payable-container">
                <div className="container-accounts-payable-bar">
                    <h1> Bills Paid </h1>
                    <div>
                        <button className="btnAddBill" onClick={() => setcontrollerComponents("")}> ↩ </button>
                    </div>
                </div>
                <div id="container-accounts-payable-content">
                    {
                        accountsPaid.map(accountPaid => {

                            const { _id, description, price, maturityDate } = accountPaid;

                            return (

                                <div className="banner"
                                    key={_id} >
                                    <div className="info" onClick={() => openDetailsAccount(_id)}>
                                        <label className="price"> {price} R$ </label>
                                        <p className="description"> {description} </p>
                                        <p className="maturityDate"> {moment(maturityDate).format('DD/MM/YYYY')} </p>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        );
    }

    return (
        <div className="container-accounts-payable-container">
            <div className="container-accounts-payable-bar">
                <h1> Bills to Pay </h1>
                <div>
                    <button className="btnAddBill" onClick={() => setcontrollerComponents("openRegister")}> + </button>
                    <button className="btnAddBill" onClick={() => setcontrollerComponents("openHistory")}> 🗂 </button>
                </div>
            </div>
            <div className="container-accounts-payable-content">
                {
                    accountsPayable.map(accountPayable => {

                        const { _id, description, price, maturityDate } = accountPayable;

                        return (

                            <div className="banner"
                                key={_id} >
                                <div className="info" onClick={() => openDetailsAccount(_id)}>
                                    <label className="price"> {price} R$ </label>
                                    <p className="maturityDate"> {moment(maturityDate).format('DD/MM/YYYY')} </p>
                                    <p className="description"> {description} </p>

                                </div>
                                <div className="actions">
                                    <button className="btnpg" onClick={() => PayAccount(_id)}> Paid </button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    );

}
