import React, { useEffect, useState } from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';
import Delete from '../assets/img/delete.png';
import Edit from '../assets/img/edit.png';

const Cars = () => {
    const [vehicule, setVehicule] = useState([]);
    const [client, setClient] = useState([]);

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
                })
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
            }
        };

        fetchClients();
    }, [vehicule]);

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
                        </tr>
                    </thead>
                    <tbody>
                        {vehicule.map(vehicule => (
                            <tr key={vehicule.id}>
                                <td >{vehicule.civility}</td>
                                <td>{vehicule.firstDateCicrulate}</td>
                                <td>{vehicule.immatriculation}</td>
                                <td>{vehicule.leavingDate}</td>
                                <td>{client.firstName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cars;
