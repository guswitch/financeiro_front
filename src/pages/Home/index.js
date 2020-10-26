import React from 'react';

import img from '../../assets/Under construction-bro.svg';

import './styles.css';
import Header from '../../components/Header';



export default function Home(){

    return(
        <>
        <Header/>
            <div className="working">
                <img src={img} alt="Imagem"/>
                <br/>
                <div> This is being built </div>
            </div>
            
        </>

    )
}