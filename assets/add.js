import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Knihovní systém</h1>
                <h3>pridej autora</h3>
                
            </div>
        );
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);
