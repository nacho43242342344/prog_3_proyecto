import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      esFavorito: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;


    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b2d79b61dd4647f5264c62498ee335ca`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ 
          data, 
          esFavorito: this.checkFavorito(id),
        });
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  }


  checkFavorito(id) {
    const storage = localStorage.getItem('favoritos');
    if (storage) {
      const favoritos = JSON.parse(storage);
      return favoritos.includes(id);
    }
    return false;
  }

  
  agregarAFavoritos = () => {
    const { id } = this.props.match.params;
    const storage = localStorage.getItem('favoritos');
    let favoritos = [];
    if (storage) {
      favoritos = JSON.parse(storage);
    }
    favoritos.push(id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    this.setState({ esFavorito: true });
  };

  
  quitarDeFavoritos = () => {
    const { id } = this.props.match.params;
    const storage = localStorage.getItem('favoritos');
    let favoritos = JSON.parse(storage);
    favoritos = favoritos.filter((favId) => favId !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    this.setState({ esFavorito: false });
  };

  render() {
    const { data, esFavorito } = this.state
    if (!data || !data.title) {
      return <div>Cargando...</div>; 
    }

    return(
    <div className="detalle-pelicula">
    <h1>{this.state.data.title}</h1>
    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${this.state.data.poster_path}`} alt={this.state.data.title} />
    <p><strong>Calificación:</strong> {this.state.data.vote_average}</p>
    <p><strong>Fecha de estreno:</strong> {this.state.data.release_date}</p>
    <p><strong>Duración:</strong> {this.state.data.runtime} minutos</p>
    <p><strong>Sinópsis:</strong> {this.state.data.overview}</p>
    <p><strong>Género:</strong> {this.state.data.genres.map(genre => genre.name).join(', ')}</p>
   
</div>
  )}
}

export default Detalle;