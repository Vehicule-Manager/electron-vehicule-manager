import React, { useEffect, useState } from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';
import Delete from '../assets/img/delete.png';
import Edit from '../assets/img/edit.png';

const Client = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL+'clients');
                const data = await response.json();
                setUsers(data);
                console.log(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <div  className='divTable'>
                <table>
                    <thead>
                        <tr>
                            <th>M/Mme</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Date de naissance</th>
                            <th>Adresse</th>
                            <th>Modification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td >{user.civility}</td>
                                <td>{user.lastname}</td>
                                <td>{user.firstname}</td>
                                <td>{user.birthDate}</td>
                                <td>{user.address}</td>
                                <td className='divEdit'><img src={Edit} /><img src={Delete} /></td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Client;
