import React from 'react';
import '../assets/style/style.scss';
import home from '../assets/img/home.png';
import logout from '../assets/img/logout.png';

const Navbar = () => {

    return (
        <div>
            <div className='bg-div'>
                <div className='align-home'>
                    <a href="/accueil"><img src={home} alt="logo" /></a>
                </div>
                <div>
                    <h1>Rentals Car</h1>
                </div>
                <div className='logout'>
                    <input placeholder="Recherche..." type="text" name="name" />
                    <a href="/"><img src={logout} alt="logo" /></a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;