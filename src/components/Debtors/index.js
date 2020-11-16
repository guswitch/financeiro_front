import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Debtors() {
    const [debtors, setDebtors] = useState([]);
    const [debtor, setDebtor] = useState({});

    let [cnpj, setCnpj] = useState("");


    const [controllerComponents, setcontrollerComponents] = useState("");

    useEffect(() => {
        async function getDebtors() {
            try {
                const response = await api.get('/Debtor/');
                setDebtors(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getDebtors();
    }, [debtors]);

    async function RegisterDebtor() {
        try {
            const response = await api.post('/Debtor/Create/', { cnpj });
            console.log(response.data);
            setcontrollerComponents("");
        } catch (error) {
            console.error(error);
        }
    }

    async function openDetailsDebtor(_id) {
        try {
            const response = await api.get(`/Debtor/${_id}`);
            setDebtor(response.data)
            console.log(debtor);
            setcontrollerComponents("openDetails");

        } catch (error) {
            console.error(error);
        }
    }

    async function openDeleteDebtor(_id) {
        let question = window.confirm('Você tem certeza que deseja excluir esse registro ?');
        //  console.log(question);
        if (question) {
            try {
                await api.delete(`/Debtor/Delete/${_id}`);
                alert("Excluido com sucesso");
                setcontrollerComponents("");

            } catch (error) {
                console.error(error);
            }
        }
    }

    if (controllerComponents === 'openDetails')
        return (
            <div className="container-debtors">
                <div className="container-debtors-bar">
                    <h1> Debtor Details: </h1>
                </div>
                <div className="container-debtors-content">
                    <h3> {debtor.name} </h3>
                    <p> <b> CNPJ: </b> {debtor.cnpj} </p>
                    <p> <b> Mainly activity: </b>  {debtor.mainlyActivty} </p>
                    <p> <b> Email: </b>  {debtor.email} </p>
                    <p> <b> Phone: </b>  {debtor.phone} </p>
                    <p> <b> CEP: </b>  {debtor.cep} </p>
                    <div className="actions-details">
                        <button className="btn-back" onClick={() => setcontrollerComponents("")}> Voltar </button>
                        <button className="btn-delete" onClick={() => openDeleteDebtor(debtor._id)}> Delete </button>
                    </div>
                </div>
            </div>
        );

    if (controllerComponents === 'openRegister')
        return (
            <div className="container-debtors">
                <div className="container-debtors-bar">
                    <h1> Register Debtors: </h1>
                    <button className="btnAddBill" onClick={RegisterDebtor}> ✓ </button>
                </div>
                <div className="container-debtors-content">
                    <form>

                        <label> CNPJ: </label>
                        <input type="text" onChange={(e) => setCnpj(e.target.value)} required />

                    </form>
                    <div className="actions-details">
                    <button class="btn-back" onClick={() => setcontrollerComponents("")}> Voltar </button>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="container-debtors">
            <div className="container-debtors-bar">
                <h1> Debtors: </h1>
                <button className="btnAddBill" onClick={() => setcontrollerComponents('openRegister')}> + </button>
            </div>
            <div className="container-debtors-content">
                <ul>
                    {
                        debtors.map(debtor => {
                            return (
                                <li key={debtor._id} onClick={() => openDetailsDebtor(debtor._id)}>
                                    {debtor.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
