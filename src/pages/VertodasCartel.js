import { Component } from "react";
import GroupContent from "../components/GroupContent/GroupContent";

class Cartel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartel: [], 
            pag: 1,
            filtrar: "",
            datoFiltrado: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchCartel();
        this.setState({
            isLoading: true
        })
    }

    fetchCartel = () => {
        const { pag } = this.state;
        const apiKey = 'b2d79b61dd4647f5264c62498ee335ca';
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pag}`; //cartel
    
        fetch(url)
            .then((results) => results.json())
            .then((data) => {
                const nuevasCartel = this.state.cartel.concat(data.results);
                this.setState({
                    cartel: nuevasCartel,
                    datoFiltrado: nuevasCartel.filter(movie =>
                        movie.title.toLowerCase().includes(this.state.filtrar.toLowerCase())
                    ),
                    pag: this.state.pag + 1,
                    isLoading: false
                });
            })
            .catch((e) => console.log(e));
    };

    handleFilterChange = (event) => {
        const newFilterValue = event.target.value;
        this.setState({
            filtrar: newFilterValue,
            datoFiltrado: this.state.cartel.filter(movie =>
                movie.title.toLowerCase().includes(newFilterValue.toLowerCase())
            )
        });
    }

    render() {
        const { datoFiltrado } = this.state;

        return (
            <div className="ver-todas-page">
                <h1>Ver todas las películas de cartelera</h1>

                <form>
                    <input 
                        type="text" 
                        placeholder="Buscar película..." 
                        value={this.state.filtrar}
                        onChange={this.handleFilterChange} 
                    />
                </form>

                {!this.state.isLoading ? (
                    <>
                        <GroupContent data={datoFiltrado} />

                        <button onClick={this.fetchCartel}>Cargar más</button>
                    </>
                ) : (<p>Loadign</p>)}
            </div>
        );
    }
}

export default Cartel;