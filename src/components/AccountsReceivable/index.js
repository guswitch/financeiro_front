import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

import api from '../../services/api';

import './styles.css';

export default function AccountsReceivable() {

    const [accountsReceivable, setAccountsReceivable] = useState([]);

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

    return (
       <div id="container-accounts-receivable-container" >
           <div id="container-accounts-receivable-bar" >
               <h1> Bills to Receive </h1>
               <button className="btnAddBill" > + </button>
           </div>
           <div id="container-accounts-receivable-content">
               {
                   accountsReceivable.map(accountReceivable => {

                       const { _id, price, maturityDate } = accountReceivable;

                       return (

                           <div className="banner"
                               key={_id} >
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
