import React from 'react';
import { Link } from 'react-router-dom';
import "./Populares.css"

const Populares = ({ pelicula }) => {
    return (
        <div className="populares-item">
            <Link to={`/detalle/${pelicula.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                <h3>{pelicula.title}</h3>
            </Link>
        </div>
    );
};

export default Populares;
