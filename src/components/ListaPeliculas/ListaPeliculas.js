import React from 'react';
import Populares from '../Populares/Populares';
import "./ListaPeliculas.css"

const ListaPeliculas = ({peliculas }) => {
    return (
        <div className="lista-peliculas">
            {peliculas.map((pelicula) => (
                <Populares key={pelicula.id} pelicula={pelicula} />  
            ))}
        </div>
    );
};

export default ListaPeliculas;
