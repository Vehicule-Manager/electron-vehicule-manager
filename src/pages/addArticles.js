import React, {useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../assets/style/style.scss';
import Navbar from '../component/navbar';
import {Form, TextArea, Button} from 'semantic-ui-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddClient = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [article, setArticle] = useState([]);
    const [characterCount, setCharacterCount] = useState(0);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const countCharacters = (text) => {
        return text.replace(/[\r\n\t]/g, '').length;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const articleData = {
                title: title,
                content: content,
                description: description,
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}add/articles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
            });

            if (response.ok) {
                console.log('Article ajouté avec succès!');
                console.log(articleData);
            } else {
                console.error('Erreur lors de l\'ajout du article :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du article :', error);
        }
    };

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'articles');
                const data = await response.json();
                setArticle(data);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des articles :', error);
            }
        };
        fetchArticle();
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="addArticle">
                <h1>Ajouter un article</h1>
            </div>
            <div className="formulaireAddArticle">
                <Form onSubmit={handleSubmit}>
                    <Form.Input value={title} label='Titre' placeholder='' onChange={handleTitleChange}/>
                    <Form.Field>
                        <label>Contenu de l'aticle</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            config={{
                                toolbar: [
                                    'undo',
                                    'redo',
                                    '|',
                                    'heading',
                                    '|',
                                    'bold',
                                    'italic',
                                    'link',
                                    '|',
                                    'bulletedList',
                                    'numberedList',
                                ],
                            }}
                            onReady={(editor) => {
                                editor.plugins.get('FileRepository').createUploadAdapter = () => null;
                            }}
                            onChange={(event, editor) => {
                                handleEditorChange(event, editor);
                                // Get the character count and update the state accordingly
                                setCharacterCount(countCharacters(editor.getData()));
                            }}
                        />
                        <div className="ck-editor-word-count">
                            Word Count: {content.split(/\s+/).filter((word) => word.trim() !== '').length} | Character Count: {characterCount}
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <label>Description de l'aticle</label>
                        <TextArea placeholder="Description de l'aticle" onChange={handleDescriptionChange} value={description} />
                    </Form.Field>
                        <Form.Button type="submit" control={Button} content='Ajouter le article' positive />
                </Form>
            </div>
        </div>
    );
};

export default AddClient;
