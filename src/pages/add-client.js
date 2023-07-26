import React, {useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';
import {Form, Input, TextArea, Button, Select} from 'semantic-ui-react'


const AddClient = () => {
    const [civility, setCivility] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [optionalAddress, setOptionalAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState([]);
    const [clients, setClients] = useState([]);

    const civilitiesOptions = [
        {key: 'm', text: 'M', value: 'M'},
        {key: 'f', text: 'Mme', value: 'Mme'},
    ]

    const handleCivilityChange = (e, data) => {
        setCivility(data.value);
    };

    const handleFirstnameChange = (e) => {
        setFirstname(e.target.value);
    };

    const handleLastnameChange = (e) => {
        setLastname(e.target.value);
    };

    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleOptionalAddressChange = (e) => {
        setOptionalAddress(e.target.value);
    };

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };
    const handleCityChange = (e) => {
        setCity(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const clientData = {
                civility: civility,
                firstname: firstname,
                lastname: lastname,
                birthDate: birthDate,
                address: address,
                optionalAddress: optionalAddress,
                zipCode: zipCode,
                city: city,
                id_users: 7,
                id_creditInfos: 5,
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });

            if (response.ok) {
                console.log('Client ajouté avec succès!');
                console.log(clientData);
            } else {
                console.error('Erreur lors de l\'ajout du client :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du client :', error);
        }
    };

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'clients');
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des clients :', error);
            }
        };
        fetchClients();
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="addClient">
                <h1>Ajouter un client</h1>
            </div>
            <div className="formulaireAddClient">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Select value={civility} control={Select} label='Civilité' placeholder='M/Mme'
                                     options={civilitiesOptions} width={4} onChange={handleCivilityChange}/>
                        <Form.Input value={lastname} label='Nom' placeholder='Nom' width={6} onChange={handleLastnameChange}/>
                        <Form.Input value={firstname} label='Prénom' placeholder='Prénom' width={6} onChange={handleFirstnameChange}/>
                        <Form.Input value={birthDate} label='Date de naissance' type="date" placeholder='Date de naissance' width={2} onChange={handleBirthDateChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input value={address} label='Adresse postale' placeholder='Adresse' width={12} onChange={handleAddressChange}/>
                        <Form.Input value={optionalAddress} label='Complément adresse postale' placeholder='Complément adresse' width={12} onChange={handleOptionalAddressChange}/>
                        <Form.Input value={zipCode} label='Code postal' placeholder='Code postal' width={2} onChange={handleZipCodeChange}/>
                        <Form.Input value={city} label='Ville' placeholder='Ville' width={6} onChange={handleCityChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Button
                            type="submit"
                            control={Button}
                            content='Ajouter le client'
                            positive
                        />
                    </Form.Group>
                </Form>


            </div>
        </div>
    );
};

export default AddClient;
