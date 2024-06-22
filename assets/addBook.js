import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
  const [nazev, setNazev] = useState('');
  const [rok_publikace, setRokPublikace] = useState('');
  const [id_a, setIDA] = useState('');
  const [pocet_stran, setPocetStran] = useState('');
  const [format, setFormat] = useState('');
  const [cena, setCena] = useState('');
  const navigate = useNavigate();

  const back = () => {
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      nazev,
      rok_publikace,
      id_a,
      pocet_stran,
      format,
      cena
    };

    try {
      const response = await axios.post('http://localhost:8000/api/books', newBook);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the book!', error);
      if (error.response) {
        console.error('Error data:', error.response.data);
      }
    }
  };

  
  return (
    <>
    <button type="button" onClick={back}>Back</button>
    <form onSubmit={handleSubmit}>
      <div>
        <label>název:</label>
        <input 
          type="text" 
          value={nazev} 
          onChange={(e) => setNazev(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>rok publikace:</label>
        <input 
          type="number" 
          value={rok_publikace} 
          onChange={(e) => setRokPublikace(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>ID autora:</label>
        <input 
          type="number" 
          value={id_a} 
          onChange={(e) => setIDA(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>počet stran:</label>
        <input 
          type="number" 
          value={pocet_stran} 
          onChange={(e) => setPocetStran(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>formát:</label>
        <input 
          type="text" 
          value={format} 
          onChange={(e) => setFormat(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>cena:</label>
        <input 
          type="number" 
          value={cena} 
          onChange={(e) => setCena(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Přidat Knihu</button>
    </form>
    </>
  );
};

export default BookForm;