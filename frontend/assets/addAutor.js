import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AutorForm = () => {
  const [jmeno, setJmeno] = useState('');
  const [prijmeni, setPrijmeni] = useState('');
  const [datumNarozeni, setDatumNarozeni] = useState('');
  const navigate = useNavigate();

  const back = () => {
    navigate('/');
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAutor = {
      jmeno,
      prijmeni,
      datum_narozeni: datumNarozeni
    };

    try {
      const response = await axios.post('http://localhost:8000/api/autors', newAutor);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the author!', error);
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
            <label className="form-label">Jméno:</label>
            <input 
              type="text" 
              className="form-control"
              value={jmeno} 
              onChange={(e) => setJmeno(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Příjmení:</label>
            <input 
              type="text" 
              className="form-control"
              value={prijmeni} 
              onChange={(e) => setPrijmeni(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Datum narození:</label>
            <input 
              type="date" 
              className="form-control"
              value={datumNarozeni} 
              onChange={(e) => setDatumNarozeni(e.target.value)} 
              required 
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={back}>Back</button>
            <button type="submit" className="btn btn-primary">Přidat autora</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutorForm;
