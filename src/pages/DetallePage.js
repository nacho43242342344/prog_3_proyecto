import { Component } from "react";
import '../components/Detalle/Detalle'
import Detalle from "../components/Detalle/Detalle";

class DetallePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        movie: null,
        esFavorito: false,
        isLoading: true
      };
    }
  
    componentDidMount() {
      const { id } = this.props.match.params;
      this.setState({
        isLoading: true
      })
      
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b2d79b61dd4647f5264c62498ee335ca`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            movie: data,
            esFavorito: this.checkFavorito(id),
            isLoading: false
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
      const { movie } = this.state;
      return(
        <>
        {!this.state.isLoading ? (
        <Detalle  movie={movie}/>
        ) : (<p>Loadign</p>)}
      </>
      )
    }
  }
  
  export default DetallePage;
