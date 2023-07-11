import React, { useEffect, useState } from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';
import Delete from '../assets/img/delete.png';
import Edit from '../assets/img/edit.png';

const Client = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'clients');
                const data = await response.json();
                setClients(data);
                console.log(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteClient = async (clientId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}users/${clientId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Client supprimé avec succès.');
                // Réactualise la liste des clients automatiquement
                setClients(clients.filter(clients => clients.id_users !== clientId));
            } else {
                console.error('Erreur lors de la suppression du client.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la suppression du client :', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='divTable'>
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
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.civility}</td>
                            <td>{client.lastname}</td>
                            <td>{client.firstname}</td>
                            <td>{client.birthDate}</td>
                            <td>{client.address}</td>
                            <td className='divEdit'>
                                <img src={Edit} alt="Edit" />
                                <img src={Delete} alt="Delete" onClick={() => deleteClient(client.id_users)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Client;
