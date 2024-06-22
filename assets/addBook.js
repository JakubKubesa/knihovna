import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
  const [nazev, setNazev] = useState('');
  const [rokPublikace, setRokPublikace] = useState('');
  const [idA, setIDA] = useState('');
  const [pocetStran, setPocetStran] = useState('');
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
      rok_publikace: rokPublikace,
      id_a: idA,
      pocet_stran: pocetStran,
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-12 col-md-6 col-lg-4">
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Název:</label>
            <input 
              type="text" 
              className="form-control"
              value={nazev} 
              onChange={(e) => setNazev(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rok publikace:</label>
            <input 
              type="number" 
              className="form-control"
              value={rokPublikace} 
              onChange={(e) => setRokPublikace(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">ID autora:</label>
            <input 
              type="number" 
              className="form-control"
              value={idA} 
              onChange={(e) => setIDA(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Počet stran:</label>
            <input 
              type="number" 
              className="form-control"
              value={pocetStran} 
              onChange={(e) => setPocetStran(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Formát:</label>
            <input 
              type="text" 
              className="form-control"
              value={format} 
              onChange={(e) => setFormat(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cena:</label>
            <input 
              type="number" 
              className="form-control"
              value={cena} 
              onChange={(e) => setCena(e.target.value)} 
              required 
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={back}>Back</button>
            <button type="submit" className="btn btn-primary">Přidat Knihu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
