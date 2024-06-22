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
        <div>
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
            <button type="button" onClick={() => handleRowClick(book.id)}>Update</button>  
            <button type="button" onClick={back}>Back</button>    
        </div>
        
    );
};

export default BookDetail;
