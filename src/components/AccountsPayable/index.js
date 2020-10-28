import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

import api from '../../services/api';

import './styles.css';

export default function AccountsPayable() {

    const [accountsPayable, setAccountsPayable] = useState([]);

    useEffect(() => {
        async function getAccountsPayable() {
            try {
                const response = await api.get('/AccountsPayable/');
                setAccountsPayable(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAccountsPayable();
    }, [accountsPayable]);

    return (  <div id="container-accounts-payable-container" >
         <div id="container-accounts-payable-bar" >
             <h1> Bills to Pay </h1>
              <button className="btnAddBill" > + </button>
         </div>
         <div id="container-accounts-payable-content">
             {
                 accountsPayable.map(accountPayable => {

                     const { _id, description, price, maturityDate } = accountPayable;

                     return (

                         <div className="banner"
                             key={_id} >
                             <div className="info" >
                                 <label className="price" > {price} R$ </label>
                                <p className="description" > {description} </p>
                                 <p className="maturityDate" > {moment(maturityDate).format('DD/MM/YYYY')} </p>
                             </div>
                             <div className="actions" >
                                 <button className="btnpg" > Paid </button>
                             </div>
                         </div>

                     )
                 })
             }
         </div>
     </div>
    )
}
