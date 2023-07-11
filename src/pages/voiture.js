import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Link, Route, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';
import Delete from '../assets/img/delete.png';
import Edit from '../assets/img/edit.png';

const Cars = () => {
    const [vehicule, setVehicule] = useState([]);
    const [client, setClient] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);

    useEffect(() => {
        const fetchVehicule = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'vehiculesTable');
                const data = await response.json();
                setVehicule(data);
                console.log(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
            }
        };

        fetchVehicule();
    }, []);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                vehicule.map(vehicule => {
                    const res = fetch(process.env.REACT_APP_API_URL + 'clients/' + vehicule.id_clients);
                    const clientData = res.json();
                    setClient(clientData);
                    console.log(clientData);
                });
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
            }
        };

        fetchClients();
    }, [vehicule]);

    const handleDelete = async (vehicleId) => {
        try {
            await fetch(process.env.REACT_APP_API_URL + 'vehicules/' + vehicleId, {
                method: 'DELETE',
            });
            setVehicule(vehicule.filter((vehicle) => vehicle.id !== vehicleId));
            closeModal();
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la suppression du véhicule:', error);
        }
    };

    const openModal = (vehicleId) => {
        setSelectedVehicleId(vehicleId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Navbar />
            <div className='divTable'>
                <table>
                    <thead>
                        <tr>
                            <th>Modele de voiture</th>
                            <th>Date de mise en circulation</th>
                            <th>Immatriculation</th>
                            <th>Debut de location</th>
                            <th>Client</th>
                            <th>Modification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicule.map((vehicule) => (
                            <tr key={vehicule.id}>
                                <td>{vehicule.civility}</td>
                                <td>{vehicule.firstDateCicrulate}</td>
                                <td>{vehicule.immatriculation}</td>
                                <td>{vehicule.leavingDate}</td>
                                <td>{client.firstName}</td>
                                <td className='divEdit'>
                                    <img src={Edit} alt='Modifier' />
                                    <img src={Delete} alt='Supprimer' onClick={() => openModal(vehicule.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal open={showModal} onClose={closeModal} size='mini'>
                <Modal.Header>Êtes-vous sûr de vouloir supprimer ce véhicule ?</Modal.Header>
                <Modal.Actions>
                    <Button negative onClick={closeModal}>
                        Annuler
                    </Button>
                    <Button positive onClick={() => handleDelete(selectedVehicleId)}>
                        Supprimer
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default Cars;
