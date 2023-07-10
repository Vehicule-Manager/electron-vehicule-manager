import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import logo from '../assets/img/logoAccueil.png';
import '../assets/style/style.scss';
import Connected from '../pages/accueil';

const Home = () => {
    return (
        <div>

        </div>
    );
}

const Accueil = () => {
    return (
        <div>

        </div>
    );
}

const Login = () => {
    const [showForm, setShowForm] = useState(true);
    const [showConnected, setShowConnected] = useState(false);

    const handleConnexion = () => {
        setShowForm(false);
        setShowConnected(true);
    }


    return (
        <div>
            <div className="logo formulaireConnection">
                <img src={logo} alt="logo" />
            </div>

            <form>
                <div className="formulaireConnection">
                    <input placeholder="login" type="text" name="name" className="inputFormulaireConnection" />
                </div>
                <br />
                <div className="formulaireConnection">
                    <input placeholder="password" type="password" name="password" className="inputFormulaireConnection" /><br />
                </div>

                <div className="formulaireConnection">
                    <Link to="/accueil">
                        <input type="submit" value="Connexion" className="buttonFormulaireConnection" onClick={handleConnexion} />
                    </Link>
                </div>
            </form>
        </div>
    )
}








export default Login;
