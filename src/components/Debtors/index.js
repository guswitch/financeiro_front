import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Debtors() {
    const [debtors, setDebtors] = useState([]);
    const [debtor, setDebtor] = useState({});
    const [departments, setDepartments] = useState([]);

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

    useEffect(() => {
        async function getDepartments() {
            try {
                const response = await api.get('/Department/');
                // console.log(response.data);
                setDepartments(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getDepartments();
    }, []);

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
                const response = await api.delete(`/Debtor/Delete/${_id}`);
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
                    <h1> cCeditors Details: </h1>
                </div>
                <div className="container-debtors-content">
                    <h3> {debtor.name} </h3>
                    <p> {debtor.cnpj} </p>
                    <p> <b> Mainly activity: </b>  {debtor.mainlyActivty} </p>
                    <p> <b> Email: </b>  {debtor.email} </p>
                    <p> <b> Phone: </b>  {debtor.phone} </p>
                    <p> <b> CEP: </b>  {debtor.cep} </p>
                    <button onClick={() => openDeleteDebtor(debtor._id)}> Delete </button>
                    <button onClick={() => setcontrollerComponents("")}> Voltar </button>
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
                    <button onClick={() => setcontrollerComponents("")}> Voltar </button>
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
