import React,{useEffect, useState } from 'react';
import moment from 'moment';

import axios from 'axios';
import './styles.css';

export default function Cotacao(){
    let [cotacoes, setCotacoes] = useState([])
    let [dolar, setDolar] = useState('');
    let [datedolar, setDateDolar] = useState('');
    let [euro, setEuro] = useState('');
    let [dateeuro, setDateEuro] = useState('');

     useEffect(() => {
        async function getCotacao(){
            try {
                const response = await axios.get('https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL');
                setCotacoes(response.data);
                setDolar(cotacoes.USD.high);
                setDateDolar(cotacoes.USD.create_date);
                setEuro(cotacoes.EUR.high);
                setDateEuro(cotacoes.EUR.create_date);
            } catch (error) {
                console.log(error);
            }
        }
        getCotacao();
    }, [cotacoes])
    return(
        <div className="container-cotacao">
            <ul className="list">
                <li className="cotacao">
                    <b>Dólar Comercial</b>
                    <p>
                        {moment(datedolar).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                    <h2>
                        R${dolar}
                    </h2>
                </li>
                <li className="cotacao">
                    <b>Euro Comercial</b>
                    <p>
                        {moment(dateeuro).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                    <h2>
                        R${euro}
                    </h2>
                </li>
            </ul>
        </div>
    )
}


