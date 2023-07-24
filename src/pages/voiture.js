import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Link, Route, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';
import Delete from '../assets/img/delete.png';
import Edit from '../assets/img/edit.png';
import Add from '../assets/img/add.png';

const Cars = () => {
    const [vehicules, setVehicules] = useState([]);
    const [client, setClient] = useState([]);
    const [models, setModels] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);

    useEffect(() => {
        const fetchVehicules = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'vehiculesTable');
                const data = await response.json();
                setVehicules(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
            }
        };

        fetchVehicules();
    }, []);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'models');
                const data = await response.json();
                setModels(data)
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
            }
        }
        fetchModels();
    }, []);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                vehicules.map(vehicule => {
                    const res = fetch(process.env.REACT_APP_API_URL + 'clients/' + vehicule.id_clients);
                    const clientData = res.json();
                    setClient(clientData);
                });
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
            }
        };

        fetchClients();
    }, [vehicules]);

    const handleDelete = async (vehicleId) => {
        try {
            await fetch(process.env.REACT_APP_API_URL + 'vehicules/' + vehicleId, {
                method: 'DELETE',
            });
            setVehicules(vehicules.filter((vehicle) => vehicle.id !== vehicleId));
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
            <div className='iconAdd'>
                <div>
                    <img src={Add} alt='Ajouter' />
                    <p>Ajouter un véhicule</p>
                </div>
            </div>

            <div className='divTable'>
                <table>
                    <thead>
                        <tr>
                            <th>Modele de voiture</th>
                            <th>Date de mise en circulation</th>
                            <th>Immatriculation</th>
                            <th>Debut de location</th>
                            <th>Modification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicules.map((vehicule) => (
                            <tr key={vehicule.id}>
                                <td>{models.filter(model => model.id === vehicule.id_model_car)[0].name}</td>
                                <td>{vehicule.firstDateCicrulate}</td>
                                <td>{vehicule.immatriculation}</td>
                                <td>{vehicule.leavingDate}</td>
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
                    <Button positive onClick={closeModal}>
                        Annuler
                    </Button>
                    <Button negative onClick={() => handleDelete(selectedVehicleId)}>
                        Supprimer
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default Cars;
