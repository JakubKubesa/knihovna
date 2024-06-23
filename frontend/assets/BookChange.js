import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookChange = () => {
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
            .then(() => {
                console.log('Book updated successfully!');
                alert('Book updated');
            })
            .catch(error => {
                console.error('There was an error updating the book!', error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="p-4 border rounded bg-light">
                    <h1>Book Change</h1>
                    <button type="button" className="btn btn-secondary mb-3" onClick={back}>Back</button>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Název</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nazev"
                                value={book.nazev || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rok publikace</label>
                            <input
                                type="number"
                                className="form-control"
                                name="rok_publikace"
                                value={book.rok_publikace || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">ID A</label>
                            <input
                                type="number"
                                className="form-control"
                                name="ID_A"
                                value={book.ID_A || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Počet stran</label>
                            <input
                                type="number"
                                className="form-control"
                                name="pocet_stran"
                                value={book.pocet_stran || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Formát</label>
                            <input
                                type="text"
                                className="form-control"
                                name="format"
                                value={book.format || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Cena</label>
                            <input
                                type="number"
                                className="form-control"
                                name="cena"
                                value={book.cena || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary me-2">Update</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookChange;
