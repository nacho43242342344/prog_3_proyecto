import { Component } from "react";
import ListaPeliculas from "../components/ListaPeliculas/ListaPeliculas";

class Populares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            populares: [], 
            pag: 1, 
            filtrar: "", 
            datoFiltrado: []
        };
    }


    handleFilterChange(event) {
        const newFilterValue = event.target.value;
        this.setState({
            filtrar: newFilterValue,
            datoFiltrado: this.state.populares.filter(movie =>
                movie.title.toLowerCase().includes(newFilterValue.toLowerCase())
            )
        });
    }

    render() {
        const todaspelis = this.state.datoFiltrado || this.state.populares;

        return (
            <div className="ver-todas-page">
                <h1>Ver todas las películas populares</h1>

                <form>
                <input 
                    type="text" 
                    placeholder="Buscar película..." 
                    value={this.state.filtrar}
                    onChange={(e) => this.handleFilterChange(e)} 
                />

                </form>

                <ListaPeliculas peliculas={todaspelis} />

                <button onClick={this.fetchPopulares}>Cargar más</button>
            </div>
        );
    }

    componentDidMount() {
        this.fetchPopulares(); // muestro las pelis del inicio
    }

    fetchPopulares = () => {
        const { pag } = this.state;
        const apiKey = 'b2d79b61dd4647f5264c62498ee335ca';
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pag}`; //populares
    
        fetch(url)
            .then((data) => data.json())
            .then((data) =>
    
                this.setState((datos) => ({
                    populares: datos.populares.concat(data.results),
                    datoFiltrado: datos.populares.concat(data.results).filter(movie =>
                        movie.title.toLowerCase().includes(this.state.filtrar.toLowerCase()) //filtra y muestra que tiene nombre similr
                    ),
                    pag: datos.pag + 1
                }))
            )
            .catch((e) => console.log(e));
    };
}

export default Populares;
