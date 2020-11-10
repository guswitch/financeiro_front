import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './styles.css';

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState({});

    let [name, setName] = useState("");
    let [description, setDescription] = useState("");


    const [controllerComponents, setcontrollerComponents] = useState("");

    useEffect(() => {
        async function getDepartments() {
            try {
                const response = await api.get('/Department/');
                setDepartments(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getDepartments();
    }, [departments]);

    async function RegisterDepartment() {
        try {
            const response = await api.post('/Department/Create/', { name, description });
            console.log(response.data);
            setcontrollerComponents("")
            // setCreditors(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function openDetailsDepartment(_id) {
        try {
            const response = await api.get(`/Department/${_id}`);
            setDepartment(response.data)
            console.log(department);
            setcontrollerComponents("openDetails");

        } catch (error) {
            console.error(error);
        }
    }

    async function openDeleteDepartment(_id) {
        let question = window.confirm('Você tem certeza que deseja excluir esse registro ?');
        //  console.log(question);
        if (question) {
            try {
                const response = await api.delete(`/Department/Delete/${_id}`);
                alert("Excluido com sucesso");
                setcontrollerComponents("");

            } catch (error) {
                console.error(error);
            }
        }
    }

    if (controllerComponents === 'openDetails')
        return (
            <div className="container-departments">
                <div className="container-departments-bar">
                    <h1> Departments Details: </h1>
                </div>
                <div className="container-departments-content">
                    <h3> {department.name} </h3>
                    <p> {department.description} </p>
                    <p> <b> Bills Qtd: </b>  5 </p>
                    <p> <b> Bills Total price: </b>  1000R$ </p>
                    <button onClick={() => openDeleteDepartment(department._id)}> Delete </button>
                    <button onClick={() => setcontrollerComponents("")}> Voltar </button>
                </div>
            </div>
        );

    if (controllerComponents === 'openRegister')
        return (
            <div className="container-departments">
                <div className="container-departments-bar">
                    <h1> Register Departments: </h1>
                    <button className="btnAddBill" onClick={RegisterDepartment}> ✓ </button>
                </div>
                <div className="container-departments-content">
                    <form>

                        <label> Name: </label>
                        <input type="text" onChange={(e) => setName(e.target.value)} required />

                        <label> Description: </label>
                        <input type="text" onChange={(e) => setDescription(e.target.value)} required />

    
                    </form>
                    <button onClick={() => setcontrollerComponents("")}> Voltar </button>
                </div>
            </div>
        );

    return (
        <div className="container-departments">
            <div className="container-departments-bar">
                <h1> Departments: </h1>
                <button className="btnAddBill" onClick={() => setcontrollerComponents('openRegister')}> + </button>
            </div>
            <div className="container-departments-content">
                <ul>
                    {
                        departments.map(department => {
                            return (
                                <li key={department._id} onClick={() => openDetailsDepartment(department._id)}>
                                    {department.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
