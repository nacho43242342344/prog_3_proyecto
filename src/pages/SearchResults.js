import React from "react"
import { Component } from "react"
import GroupContent from "../components/GroupContent/GroupContent"

class SearchResults extends Component{
    constructor(props){
        super(props)
        this.state = {
            movies: [],
            isLoading: true
        }
    }
    fetchBusquedaPeli(query){
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=b2d79b61dd4647f5264c62498ee335ca`)
            .then(response=> response.json())
            .then(data=> {
                this.setState({
                    movies: data.results,
                    isLoading: false,
                })
            }
            ).catch(e => console.log(e));
    }
    componentDidMount(){
        this.fetchBusquedaPeli(this.props.location.state.query)
        this.setState({
            isLoading: true
        })
    }
    componentDidUpdate(resultadosViejos){
        //para ver si al buscar por 2da vez estamos buscando otra cosa y mostrarla, o no.
        if (resultadosViejos.location.state.query !== this.props.location.state.query) {
            this.fetchBusquedaPeli(this.props.location.state.query)
        }
    }
    render(){
        return(
            <div>
                <h2>Resultados para: {this.props.location.state.query}</h2>
                {!this.state.isLoading ? (<GroupContent data={this.state.movies}/>) : (<p>Loadign</p>)}
            </div>
        )
    }
}

export default SearchResults