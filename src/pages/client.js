import React, { useEffect, useState } from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';
import Delete from '../assets/img/delete.png';
import Edit from '../assets/img/edit.png';
import Add from "../assets/img/add.png";

const Client = () => {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);


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
                // Réactualise la liste des clients automatiquement
                setClients(clients.filter(clients => clients.id_users !== clientId));
                closeModal();
                } else {
                console.error('Erreur lors de la suppression du client.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la suppression du client :', error);
        }
    };

    const openModal = (clientId) => {
        setSelectedClientId(clientId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Navbar />
            <div className='iconAdd'>
                <div>
                   <a href="add-client"><img src={Add} alt='Ajouter' /></a>
                    <p>Ajouter un client</p>
                </div>
            </div>
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
                                <img src={Delete} alt="Delete" onClick={() => openModal(client.id_users)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Modal open={showModal} onClose={closeModal} size='mini'>
                <Modal.Header>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</Modal.Header>
                <Modal.Actions>
                    <Button negative onClick={closeModal}>
                        Annuler
                    </Button>
                    <Button positive onClick={() => deleteClient(selectedClientId)}>
                        Supprimer
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default Client;
