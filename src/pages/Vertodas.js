import { Component } from "react";
import GroupContent from "../components/GroupContent/GroupContent";

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

    componentDidMount() {
        this.fetchPopulares();
    }

    fetchPopulares = () => {
        const { pag } = this.state;
        const apiKey = 'b2d79b61dd4647f5264c62498ee335ca';
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pag}`; //populares
    
        fetch(url)
            .then((results) => results.json())
            .then((data) => {
                const nuevasPopulares = this.state.populares.concat(data.results);
                this.setState({
                    populares: nuevasPopulares,
                    datoFiltrado: nuevasPopulares.filter(movie =>
                        movie.title.toLowerCase().includes(this.state.filtrar.toLowerCase())
                    ),
                    pag: this.state.pag + 1
                });
            })
            .catch((e) => console.log(e));
    };

    handleFilterChange = (event) => {
        const newFilterValue = event.target.value;
        this.setState({
            filtrar: newFilterValue,
            datoFiltrado: this.state.populares.filter(movie =>
                movie.title.toLowerCase().includes(newFilterValue.toLowerCase())
            )
        });
    }

    render() {
        const { datoFiltrado } = this.state;

        return (
            <div className="ver-todas-page">
                <h1>Ver todas las películas populares</h1>

                <form>
                    <input 
                        type="text" 
                        placeholder="Buscar película..." 
                        value={this.state.filtrar}
                        onChange={this.handleFilterChange} 
                    />
                </form>

                <GroupContent data={datoFiltrado} />

                <button onClick={this.fetchPopulares}>Cargar más</button>
            </div>
        );
    }
}

export default Populares;
