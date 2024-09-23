import { Component } from "react";
import GroupContent from "../components/GroupContent/GroupContent";

class Populares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            populares: [],
            actualPop: 1,
            filtrarPeli: "",
            datoFiltrado: [],
            isLoading: true
        };
    }

    componentDidMount() {
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b2d79b61dd4647f5264c62498ee335ca&page=${this.state.actualPop}`)
                .then((results) => results.json())
                .then((data) => {
                    this.setState({
                        populares: data.results,
                        datoFiltrado: data.results,
                        actualPop: this.state.actualPop + 1,
                        isLoading: false
                    });
                })
                .catch((e) => console.log(e));
        this.setState({
            isLoading: true
        })
    }

    handleFilterChange(event){
        const newFilterValue = event.target.value;
        this.setState({
            filtrarPeli: newFilterValue,
            datoFiltrado: this.state.populares.filter((movie) =>
                movie.title.toLowerCase().includes(newFilterValue.toLowerCase())
            )
        });
    }

    handleResetFilter(){
        this.setState({
            filtrarPeli: "",
            datoFiltrado: this.state.populares
        })
    }

    handleLoadMore(){
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=b2d79b61dd4647f5264c62498ee335ca&page=${this.state.actualPop}`
        )
            .then((response)=>response.json())
            .then((data)=>
                this.setState({
                    populares: this.state.populares.concat(data.results),
                    datoFiltrado: this.state.datoFiltrado.concat(data.results),
                    actualPop: this.state.actualPop + 1             
            })
        )
            .catch((e) => console.log(e))
    }

    render() {
        return (
            <div className="ver-todas-page">
                <h1>Ver todas las películas populares</h1>

                <form>
                    <input
                        type="text"
                        placeholder="Buscar película..."
                        value={this.state.filtrarPeli}
                        onChange={(e) => this.handleFilterChange(e)}
                    />
                    <button onClick={() => this.handleResetFilter()}>Reset</button>

                </form>
                {!this.state.isLoading ? (
                    <>
                        <GroupContent data={this.state.datoFiltrado} />

                        <button onClick={() => this.handleLoadMore()}>Cargar más</button>
                    </>
                ) : (<p>Loadign</p>)}
            </div>
        );
    }
}

export default Populares;
