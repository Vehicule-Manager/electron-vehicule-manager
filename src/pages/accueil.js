import React from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';

const Accueil = () => {

    return (
        <div>
            <Navbar />
            <div class="parent">
                <div>
                    <a href="/client"><h3>Client</h3></a>
                </div>
                <div>
                    <a href="/contrat"><h3>Contrat</h3></a>
                </div>
                <div>
                    <a href="/voiture"><h3>Voiture</h3></a>
                </div>

            </div>
        </div>
    );
}

export default Accueil;