import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ContentItem.css';

class ContentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: this.props.data.poster_path,
      name: this.props.data.title,
      id: this.props.data.id,
      description: this.props.data.overview,
      showDescription: false,
      isFavorite: false,
    };
  }

  variasDescri = () => {
    this.setState(prevState => ({
      showDescription: !prevState.showDescription
    }));
  };

  variasFav = () => {
    this.setState(prevState => ({
      isFavorite: !prevState.isFavorite
    }), () => {
      console.log(`${this.state.id} ${this.state.isFavorite ? 'agregado a favoritos' : 'eliminado de favoritos'}`);
    });
  };

  render() {
    return (
      <div className='content-item'>
        <img 
          src={`https://image.tmdb.org/t/p/w500${this.state.img}`} 
          alt={this.state.name} 
        />
        <h3>{this.state.name}</h3>

        {this.state.showDescription && <p>{this.state.description}</p>}

        <button onClick={this.variasDescri}>
          {this.state.showDescription ? 'Ocultar descripción' : 'Ver descripción'}
        </button>

        <Link to={`/detalle/${this.state.id}`}>Ir a ver el detalle</Link>

        <button onClick={this.variasFav}>
          {this.state.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      </div>
    );
  }
}

export default ContentItem;
