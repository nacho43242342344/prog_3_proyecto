import { Component } from "react";
import GroupContent from "../components/GroupContent/GroupContent";

class DetallePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        movie: null,
        esFavorito: false,
      };
    }
  
    componentDidMount() {
      const { id } = this.props.match.params;
  
      
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b2d79b61dd4647f5264c62498ee335ca`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            movie: data,
            esFavorito: this.checkFavorito(id),
          });
        })
        .catch((error) => console.error("Error al obtener los datos:", error));
    }
  
    
    checkFavorito(id) {
      const storage = localStorage.getItem("favoritos");
      if (storage) {
        const favoritos = JSON.parse(storage);
        return favoritos.includes(id);
      }
      return false;
    }
  
    
    agregarAFavoritos = () => {
      const { id } = this.props.match.params;
      const storage = localStorage.getItem("favoritos");
      let favoritos = [];
      if (storage) {
        favoritos = JSON.parse(storage);
      }
      favoritos.push(id);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      this.setState({ esFavorito: true });
    };
  
    
    quitarDeFavoritos = () => {
      const { id } = this.props.match.params;
      const storage = localStorage.getItem("favoritos");
      let favoritos = JSON.parse(storage);
      favoritos = favoritos.filter((favId) => favId !== id);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      this.setState({ esFavorito: false });
    };
  
    render() {
      const { movie, esFavorito } = this.state;
  
      if (!movie) {
        return <p>Cargando detalles...</p>;
      }
  
      return (
        <div className="detalle-page">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h1>{movie.title}</h1>
          <p><strong>Calificación:</strong> {movie.vote_average}</p>
          <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
          <p><strong>Duración:</strong> {movie.runtime} minutos</p>
          <p><strong>Sinopsis:</strong> {movie.overview}</p>
          <p><strong>Género:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
  
          <button onClick={esFavorito ? this.quitarDeFavoritos : this.agregarAFavoritos}>
            {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
        </div>
      );
    }
  }
  
  export default DetallePage;