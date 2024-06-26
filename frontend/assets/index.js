import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './app';
import AddAutor from './addAutor';
import AddBook from './addBook';
import BookChange from './BookChange';
import BookDetail from './BookDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/main" element={<App />} />
            <Route path="/addAutor" element={<AddAutor />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/kniha/:id" element={<BookChange />} />
            <Route path="/knihaDetail/:id" element={<BookDetail />} />
        </Routes>
    </Router>
);
