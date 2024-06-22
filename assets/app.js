import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TableA() {
    const [autors, setAutors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/autors')
            .then(response => {
                setAutors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the autors!', error);
            });
    }, []);

    const handleAddAuthor = () => {
        navigate('/addAutor');
    };

    return (
        <>
            <button onClick={handleAddAuthor}>Add Author</button>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>přijmení</th>
                    </tr>
                </thead>
                <tbody>
                    {autors.map(autor => (
                        <tr key={autor.id}>
                            <td>{autor.id}</td>
                            <td>{autor.prijmeni}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

function TableK() {
    const [knihy, setKnihy] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/knihy')
            .then(response => {
                setKnihy(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the knihy!', error);
            });
    }, []);

    const handleAddBook = () => {
        navigate('/addBook');
    };

    const handleRowClick = (id) => {
        navigate(`/knihaDetail/${id}`);
    };

    return (
        <>
            <button onClick={handleAddBook}>Add Book</button>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>název</th>
                    </tr>
                </thead>
                <tbody>
                    {knihy.map(kniha => (
                        <tr key={kniha.id} onClick={() => handleRowClick(kniha.id)}>
                            <td>{kniha.id}</td>
                            <td>{kniha.nazev}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Knihovní systém</h1>
                <TableA />
                <TableK />
            </div>
        );
    }
}

export default App;
