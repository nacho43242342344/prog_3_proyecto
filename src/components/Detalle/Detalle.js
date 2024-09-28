import React from "react";

const Detalle = (props) => {
  const { movie } = props;
  const {title, poster_path, vote_average, release_date, runtime, overview,genres,} = movie || {};

  return (
    <div className="detalle-pelicula">
        <h1>{title}</h1>
          <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}alt={title}/>
          <p> <strong>Calificación:</strong> {vote_average}</p>
          <p> <strong>Fecha de estreno:</strong> {release_date}</p>
          <p>  <strong>Duración:</strong> {runtime} minutos </p>
          <p>  <strong>Sinópsis:</strong> {overview} </p>
          <p>  <strong>Género:</strong>{" "}{genres && genres.length > 0  ? genres.map((genre) => genre.name).join(", ")  : "No disponible"}</p>
    </div>
  );
};

export default Detalle;
