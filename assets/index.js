import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './app';
import AddAutor from './addAutor';
import AddBook from './addBook';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/main" element={<App />} />
            <Route path="/addAutor" element={<AddAutor />} />
            <Route path="/addBook" element={<AddBook />} />
        </Routes>
    </Router>
);
