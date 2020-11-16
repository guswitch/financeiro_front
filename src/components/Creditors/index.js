import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Creditors() {
    const [creditors, setCreditors] = useState([]);
    const [creditor, setCreditor] = useState({});
    const [departments, setDepartments] = useState([]);

    let [department, setDepartment] = useState("");
    let [cnpj, setCnpj] = useState("");


    const [controllerComponents, setcontrollerComponents] = useState("");

    useEffect(() => {
        async function getCreditors() {
            try {
                const response = await api.get('/Creditor/');
                setCreditors(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getCreditors();
    }, [creditors]);

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

    async function RegisterCreditor() {
        try {
            const response = await api.post('/Creditor/Create/', { departmentId: department, cnpj });
            console.log(response.data);
            setcontrollerComponents("")
            // setCreditors(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function openDetailsCreditor(_id) {
        try {
            const response = await api.get(`/Creditor/${_id}`);
            setCreditor(response.data)
            console.log(creditor);
            setcontrollerComponents("openDetails");

        } catch (error) {
            console.error(error);
        }
    }

    async function openDeleteCreditor(_id) {
        let question = window.confirm('Você tem certeza que deseja excluir esse registro ?');
        //  console.log(question);
        if (question) {
            try {
                await api.delete(`/Creditor/Delete/${_id}`);
                alert("Excluido com sucesso");
                setcontrollerComponents("");

            } catch (error) {
                console.error(error);
            }
        }
    }

    if (controllerComponents === 'openDetails')
        return (
            <div className="container-creditors">
                <div className="container-creditors-bar">
                    <h1> Creditor Details: </h1>
                </div>
                <div className="container-creditors-content">
                    <h3> {creditor.name} </h3>
                    <p> <b> CNPJ: </b> {creditor.cnpj} </p>
                    <p> <b> Mainly activity: </b>  {creditor.mainlyActivty} </p>
                    <p> <b> Email: </b>  {creditor.email} </p>
                    <p> <b> Phone: </b>  {creditor.phone} </p>
                    <p> <b> CEP: </b>  {creditor.cep} </p>
                    <div className="actions-details">
                        <button className="btn-back" onClick={() => setcontrollerComponents("")}> Voltar </button>
                        <button className="btn-delete" onClick={() => openDeleteCreditor(creditor._id)}> Delete </button>
                    </div>
                </div>
            </div>
        );

    if (controllerComponents === 'openRegister')
        return (
            <div className="container-creditors">
                <div className="container-creditors-bar">
                    <h1> Register Creditors: </h1>
                    <button className="btnAddBill" onClick={RegisterCreditor}> ✓ </button>
                </div>
                <div className="container-creditors-content">
                    <form>

                        <label> Department: </label>
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                            <option value="" selected disabled hidden> ------- Escolha uma opção ------- </option>
                            {
                                departments.map(department => {
                                    return <option value={department._id}> {department.name} </option>
                                })
                            }
                        </select>

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
        <div className="container-creditors">
            <div className="container-creditors-bar">
                <h1> Creditors: </h1>
                <button className="btnAddBill" onClick={() => setcontrollerComponents('openRegister')}> + </button>
            </div>
            <div className="container-creditors-content">
                <ul>
                    {
                        creditors.map(creditor => {
                            return (
                                <li key={creditor._id} onClick={() => openDetailsCreditor(creditor._id)}>
                                    {creditor.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
