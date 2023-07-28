import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import '../assets/style/style.scss';
import { Form, Select } from 'semantic-ui-react';

const AddVehicule = ({ item }) => {
    const [modeles, setModeles] = useState([]);
    const [marques, setMarques] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [filteredModeles, setFilteredModeles] = useState([]);

    // Gestion des select
    const energiesOption = [
        { key: 'g', text: 'Gazoil', value: '1' },
        { key: 'e', text: 'Essence', value: '2' },
        { key: 'el', text: 'Electrique', value: '3' },
        { key: 'h', text: 'Hybride', value: '4' },
    ]

    const gearboxOption = [
        { key: 'm', text: 'Manuelle', value: '1' },
        { key: 'a', text: 'Automatique', value: '2' },
    ]

    const newsOption = [
        { key: 'n', text: 'Neuf', value: '1' },
        { key: 'o', text: 'Occasion', value: '0' },
    ]

    const statuseOption = [
        { key: 'v', text: 'Vente', value: '1' },
        { key: 'lo', text: 'LOA', value: '2' },
        { key: 'll', text: 'LDD', value: '3' },
        { key: 'l', text: 'Location', value: '4' },
    ]

    const brandOption = marques.map((marque) => ({
        key: marque.id,
        text: marque.name,
        value: marque.id,
    }));

    const typeOption = [
        { key: 'b', text: 'Berline', value: '1' },
        { key: 'c', text: 'Citadine', value: '2' },
        { key: 'su', text: 'SUV', value: '3' },
        { key: 'u', text: 'Utilitaire', value: '4' },
        { key: 'sp', text: 'Sportif', value: '5' },
    ]


    // Gestion de l'envoie du formulaire
    const [news, setNews] = useState('');
    const [firstDateCirculate, setFirstDateCirculate] = useState('');
    const [description, setDescription] = useState('');
    const [horsepower, setHorsepower] = useState('');
    const [price, setPrice] = useState('');
    const [enterDate, setEnterDate] = useState('');
    const [leavingDate, setLeavingDate] = useState('');
    const [immatriculation, setImmatriculation] = useState('');
    const [id_statuses, setId_statuses] = useState('');
    const [id_gear_boxes, setId_gear_boxes] = useState('');
    const [id_brands, setId_brands] = useState('');
    const [id_energies, setId_energies] = useState('');
    const [id_types, setId_types] = useState('');
    const [id_model_car, setId_model_car] = useState('');

    const handleNewsChange = (e, data) => {
        setNews(data.value);
    }
    const handleFirstDateCirculateChange = (e, data) => {
        setFirstDateCirculate(data.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleHorsepowerChange = (e, data) => {
        setHorsepower(data.value);
    }
    const handlePriceChange = (e, data) => {
        setPrice(data.value);
    }
    const handleEnterDateChange = (e, data) => {
        setEnterDate(data.value);
    }
    const handleLeavingDateChange = (e, data) => {
        setLeavingDate(data.value);
    }
    const handleImmatriculationChange = (e, data) => {
        setImmatriculation(data.value);
    }
    const handleId_statusesChange = (e, data) => {
        setId_statuses(data.value);
    }
    const handleId_gear_boxesChange = (e, data) => {
        setId_gear_boxes(data.value);
    }
    const handleId_brandsChange = (e, data) => {
        setId_brands(data.value);
    }
    const handleId_energiesChange = (e, data) => {
        setId_energies(data.value);
    }
    const handleId_typesChange = (e, data) => {
        setId_types(data.value);
    }
    const handleId_model_carChange = (e, data) => {
        setId_model_car(data.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const vehiculeData = {
                new: news,
                firstDateCicrulate: firstDateCirculate,
                description: description,
                horsepower: horsepower,
                price: price,
                enterDate: enterDate,
                leavingDate: leavingDate,
                immatriculation: immatriculation,
                id_statuses: id_statuses,
                id_gear_boxes: id_gear_boxes,
                id_brands: '1', //id_brands
                id_energies: id_energies,
                id_types: id_types,
                id_model_car: '1', //id_model_car
            };

            const response = await fetch(process.env.REACT_APP_API_URL + 'vehicules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehiculeData),
            });
            if (response.ok) {
                console.log('Véhicule ajouté avec succès !');
                console.log(vehiculeData);
                console.log(response);
            } else {
                console.log('Une erreur s\'est produite lors de l\'ajout du véhicule', response.statusText);
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'ajout du véhicule :', error);
        }
    };


    useEffect(() => {
        const fetchMarques = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'brands');
                const data = await response.json();
                setMarques(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des marques :', error);
            }
        };
        fetchMarques();
    }, []);

    useEffect(() => {
        const fetchModeles = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'models');
                const data = await response.json();
                setModeles(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des modèles :', error);
            }
        };
        fetchModeles();
    }, []);

    useEffect(() => {
        if (selectedBrandId) {
            const filteredModels = modeles.filter((modele) => parseInt(modele.id_brands) === parseInt(selectedBrandId));
            setFilteredModeles(filteredModels);
        } else {
            setFilteredModeles([]);
        }
    }, [selectedBrandId, modeles]);

    const handleBrandChange = (event) => {
        setSelectedBrandId(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className='formulaireAddVehicule'>
                <h2>Ajouter un véhicule</h2>

                <Form onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field label='Marque' control='select' name='brand' onChange={handleBrandChange}>
                            <option value=''>Sélectionnez une marque</option>
                            {marques.map((marque) => (
                                <option key={marque.id} value={marque.id} >
                                    {marque.name}
                                </option>
                            ))}
                        </Form.Field>
                        <Form.Field label='Modèle' control='select' name='model' disabled={!selectedBrandId}>
                            <option value=''>Sélectionnez un modèle</option>
                            {filteredModeles.length === 0 ? (
                                <option value='' disabled>Aucun modèle disponible pour cette marque</option>
                            ) : (
                                filteredModeles.map((modele) => (
                                    <option key={modele.id} value={modele.id} onChange={handleId_model_carChange}>
                                        {modele.name}
                                    </option>
                                ))
                            )}
                        </Form.Field>
                        <Form.Select value={id_energies} control={Select}
                            label='Energie'
                            placeholder='Energie'
                            options={energiesOption}
                            onChange={handleId_energiesChange} />
                        <Form.Select value={id_gear_boxes} control={Select}
                            label='Boite de vitesse'
                            placeholder='Boite de vitesse'
                            options={gearboxOption}
                            onChange={handleId_gear_boxesChange} />
                        <Form.Input value={horsepower} onChange={handleHorsepowerChange} type="number" fluid label='Nombre de CV' placeholder='Nom de cv' name="horsePower" />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input value={price} onChange={handlePriceChange} type="number" fluid label='Prix' placeholder='prix' name="price" />
                        <Form.Input value={immatriculation} onChange={handleImmatriculationChange} className='elementForm' fluid type="text" label='Immatriculation' name="immatriculation" />
                        <Form.Select value={id_types} control={Select}
                            label='Type de véhicule'
                            placeholder='Type de véhicule'
                            options={typeOption}
                            onChange={handleId_typesChange} />
                        <Form.Select value={news} control={Select}
                            label='Neuf / Occasion'
                            placeholder='Neuf / Occasion'
                            options={newsOption}
                            onChange={handleNewsChange} />
                        <Form.Select value={id_statuses} control={Select}
                            label='Type de vente'
                            placeholder='Type de vente'
                            options={statuseOption}
                            onChange={handleId_statusesChange} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input value={firstDateCirculate} onChange={handleFirstDateCirculateChange} className='elementForm' fluid type="date" label='Première mise en circulation' name="firstDateCurculate" />
                        <Form.Input value={enterDate} onChange={handleEnterDateChange} type="date" fluid label='Date entrée' name="enterDate" />
                        <Form.Input value={leavingDate} onChange={handleLeavingDateChange} type="date" fluid label='Date de location' name="dateLeaving" />
                    </Form.Group>
                    <Form.Field value={description} onChange={handleDescriptionChange} label='Description' control='textarea' rows='3' />
                    <Form.Field type='submit' className='buttonAdd' control='button'>
                        Ajouter le véhicule
                    </Form.Field>
                </Form>
            </div>
        </div>
    )
}

export default AddVehicule;
