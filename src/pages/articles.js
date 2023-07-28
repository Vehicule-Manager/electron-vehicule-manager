import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Modal } from 'semantic-ui-react';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';
import Delete from '../assets/img/delete.png';
import Edit from '../assets/img/edit.png';
import Add from "../assets/img/add.png";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'table/articles');
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des articles :', error);
            }
        };

        fetchArticles();
    }, []);

    const handleDelete = async (articleId) => {
        try {
            await fetch(process.env.REACT_APP_API_URL + 'vehicules/' + articleId, {
                method: 'DELETE',
            });
            setArticles(articles.filter((articles) => articles.id !== articleId));
            closeModal();
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la suppression de l\'article:', error);
        }
    };

    function TruncateText({ text, limit }) {
        const shortened = text.length > limit ? text.substring(0, limit - 3) + '...' : text;
        return <div>{shortened}</div>;
    }

    const openModal = (articleId) => {
        setSelectedArticleId(articleId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Navbar />
            <div className='iconAdd'>
                <a href="add/article"><img src={Add} alt='Ajouter' /><p>Ajouter un client</p></a>
            </div>
            <div className='divTable'>
                <table>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Content</th>
                            <th>Voiture relié</th>
                            <th>Modification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(article => (
                            <tr key={article.id}>
                                <td >{article.title}</td>
                                <td><TruncateText text={article.content} limit={100} /></td>
                                <td></td>
                                <td className='divEdit'>
                                    <img src={Edit} alt='Modifier' />
                                    <img src={Delete} alt='Supprimer' onClick={() => openModal(article.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal open={showModal} onClose={closeModal} size='mini'>
                <Modal.Header>Êtes-vous sûr de vouloir supprimer cette article ?</Modal.Header>
                <Modal.Actions>
                    <Button positive onClick={closeModal}>
                        Annuler
                    </Button>
                    <Button negative onClick={() => handleDelete(selectedArticleId)}>
                        Supprimer
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default Articles;
