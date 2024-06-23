import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/knihaDetail/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the book!', error);
            });
    }, [id]);

    const back = () => {
        navigate('/');
    }

    const handleRowClick = (id) => {
        navigate(`/kniha/${id}`);
    };
    
    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="p-4 border rounded bg-light">
                    <h1>{book.nazev}</h1>
                    <p>Rok publikace: {book.rok_publikace}</p>
                    <p>Počet stran: {book.pocet_stran}</p>
                    <p>Formát: {book.format}</p>
                    <p>Cena: {book.cena}</p>
                    {book.author && (
                        <div>
                            <h3>Autor</h3>
                            <p>Jméno: {book.author.jmeno}</p>
                            <p>Příjmení: {book.author.prijmeni}</p>
                            <p>Datum narození: {book.author.datum_narozeni}</p>
                        </div>
                    )}
                    <div className="mt-3">
                        <button type="button" className="btn btn-primary me-2" onClick={() => handleRowClick(book.id)}>Update</button>
                        <button type="button" className="btn btn-secondary" onClick={back}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
