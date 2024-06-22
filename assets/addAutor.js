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
    <>
    <button type="button" onClick={back}>Back</button>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Jméno:</label>
        <input 
          type="text" 
          value={jmeno} 
          onChange={(e) => setJmeno(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Příjmení:</label>
        <input 
          type="text" 
          value={prijmeni} 
          onChange={(e) => setPrijmeni(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Datum narození:</label>
        <input 
          type="date" 
          value={datumNarozeni} 
          onChange={(e) => setDatumNarozeni(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Přidat autora</button>
    </form>
    </>
  );
};

export default AutorForm;