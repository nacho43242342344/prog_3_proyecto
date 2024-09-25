import { Component } from "react";
import GroupContent from "../components/GroupContent/GroupContent";

class Favoritos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    const storage = localStorage.getItem("favoritos");
    if (storage !== null) {
      const parsedStorage = JSON.parse(storage);
      Promise.all(
        parsedStorage.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=b2d79b61dd4647f5264c62498ee335ca`
          ).then((response) => response.json())
        )
      ).then((data) => {
        this.setState({
          movies: data,
        });
        console.log(data);
      });
    }
  }
  render() {
    const{movies}= this.state
    return (
        <div className="favoritos-page">
        <h1>Ver todas las películas en favoritos</h1>
        {movies.length === 0 ? (
          <p>No hay películas en favoritos.</p>
        ) : ( 
          <div className="movies-list">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
    
  }
}
export default Favoritos;

