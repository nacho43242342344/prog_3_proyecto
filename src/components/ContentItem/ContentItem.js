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
      esFavorito: false,
    };
  }

  variasDescri = () => {
    this.setState(prevState => ({
      showDescription: !prevState.showDescription
    }));
  };

  variasFav = () => {
    this.setState(prevState => ({
      esFavorito: !prevState.esFavorito
    }), () => {
      console.log(`${this.state.id} ${this.state.esFavorito ? 'agregado a favoritos' : 'eliminado de favoritos'}`);
    });
  };

  componentDidMount() {
    const storage = localStorage.getItem("favoritos");
    if (storage !== null) {
      const parsedStorage = JSON.parse(storage);
      const estaEnFavoritos = parsedStorage.includes(this.state.id);
      if (estaEnFavoritos) {
        this.setState({
          esFavorito: true,
        });
      }
    }
  }
  agregarAFavoritos(){
    const storage= localStorage.getItem('favoritos')
    if (storage !== null){
      const parsedStorage = JSON.parse(storage)
      parsedStorage.push(this.state.id)
      const stringStorage = JSON.stringify(parsedStorage)
      localStorage.setItem('favoritos',stringStorage)
    }else{
      const primerFavorito= [this.state.id]
      const stringStorage=JSON.stringify(primerFavorito)
      localStorage.setItem('favoritos',stringStorage)
    }
    this.setState({
      esFavorito:true
    })
  }
  quitarDeFavoritos(){
    const storage= localStorage.getItem('favoritos')
    const parsedStorage=JSON.parse(storage)
    const restoFavoritos= parsedStorage.filter(id=>id!== this.state.id)
    const stringStorage=JSON.stringify(restoFavoritos)
    localStorage.setItem('favoritos',stringStorage)
    this.setState({
      esFavorito:false
    })
  }

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

        <button onClick= {()=> !this.state.esFavorito ?  this.agregarAFavoritos() : this.quitarDeFavoritos()}>
          {this.state.esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      </div>
    );
  }
}

export default ContentItem;
