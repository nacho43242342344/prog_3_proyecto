import { Component } from 'react';
import GroupContent from '../components/GroupContent/GroupContent';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            populares: [],
            cartel: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=b2d79b61dd4647f5264c62498ee335ca')
            .then((response) => response.json())
            .then((data) => this.setState(
                {
                    populares: data.results.slice(0, 5),
                    isLoading: false
                }
            ))
            .catch((err) => console.log(err));

        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=b2d79b61dd4647f5264c62498ee335ca')
            .then((response) => response.json())
            .then((data) => this.setState(
                {
                    cartel: data.results.slice(0, 5),
                    isLoading: false
                }
            ))
            .catch((err) => console.log(err));
    }

    render() {

        return (
            <div className="home-page">

                <h1>¡Bienvenido a PopcornParadise!</h1>

                {!this.state.isLoading ? (
                    <>
                        <h2>Películas más populares</h2>
                        <a href="/ver-todas/populares">Ver todas - Populares</a>
                        <GroupContent data={this.state.populares} />

                        <h2>Películas en cartel</h2>
                        <a href="/ver-todas/cartel">Ver todas - Cartel</a>
                        <GroupContent data={this.state.cartel} />
                    </>
                ) : (<p>Loadign</p>)}

            </div>
        );
    }
}

export default Home;
