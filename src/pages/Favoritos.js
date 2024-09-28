import { Component } from "react";
import GroupContent from "../components/GroupContent/GroupContent";

class Favoritos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })
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
          isLoading: false
        });
      });
    }
  }
  render() {
    return (
      <div className="favoritos-page">
        <h1>Ver todas las películas en favoritos</h1>
      
        {!this.state.isLoading ? (

        <GroupContent data={this.state.movies} />

        ) : (<p>Loadign</p>)}
       
      </div>
    );
    
  }
}
export default Favoritos;

