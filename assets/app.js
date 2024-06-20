import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

function TableA() {
    const [autors, setAutors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/autors')
            .then(response => {
                setAutors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the autors!', error);
            });
    }, []);

    return (
        <>
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

    useEffect(() => {
        axios.get('http://localhost:8000/api/knihy')
            .then(response => {
                setKnihy(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the knihy!', error);
            });
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>název</th>
                    </tr>
                </thead>
                <tbody>
                    {knihy.map(kniha => (
                        <tr key={kniha.id}>
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

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);
