import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        nazev: '',
        rok_publikace: '',
        ID_A: '',
        pocet_stran: '',
        format: '',
        cena: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/kniha/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the book!', error);
            });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/kniha/${id}`)
            .then(() => {
                alert('Book deleted');
                navigate('/');
            })
            .catch(error => console.error('There was an error deleting the book!', error));
    };

    const back = () => {
        navigate('/');
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8000/api/kniha/${id}`, book)
            .then(response => {
                console.log('Book updated successfully!');
                alert('Book updated');
            })
            .catch(error => {
                console.error('There was an error updating the book!', error);
            });
    };

    return (
        <div>
            <h1>Book Detail</h1>
            <button type="button" onClick={back}>Back</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Název</label>
                    <input 
                        type="text" 
                        name="nazev" 
                        value={book.nazev || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Rok publikace</label>
                    <input 
                        type="number" 
                        name="rok_publikace" 
                        value={book.rok_publikace || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>ID A</label>
                    <input 
                        type="number" 
                        name="ID_A" 
                        value={book.ID_A || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Počet stran</label>
                    <input 
                        type="number" 
                        name="pocet_stran" 
                        value={book.pocet_stran || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Formát</label>
                    <input 
                        type="text" 
                        name="format" 
                        value={book.format || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Cena</label>
                    <input 
                        type="number" 
                        name="cena" 
                        value={book.cena || ''} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    );
};

export default BookDetail;
