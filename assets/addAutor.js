import React, { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';

const AutorForm = () => {
  const [jmeno, setJmeno] = useState('');
  const [prijmeni, setPrijmeni] = useState('');
  const [datumNarozeni, setDatumNarozeni] = useState('');

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
    } catch (error) {
      console.error('There was an error creating the author!', error);
      if (error.response) {
        console.error('Error data:', error.response.data);
      }
    }
  };

  return (
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
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <AutorForm />
);
