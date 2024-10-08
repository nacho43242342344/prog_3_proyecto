import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";
import { Link } from "react-router-dom";
import { Component } from "react";

class Header extends Component {
    render(){
        return (
            <header>
                <div className="logo">
                    <Link to="/">
                        <h1>PopcornParadise</h1>
                    </Link>
                    <img src="/logo.jpg" alt="Logo de la aplicación" />
                </div>
                <SearchForm history={this.props.history} /> 
                <nav>
                    <ul>
                        <li><b><Link to="/">Home</Link></b></li>
                        <li><b><Link to="/favoritos">Favoritos</Link></b></li>
                        <li><b><Link to="/ver-todas/populares">Populares</Link></b></li>
                        <li><b><Link to="/ver-todas/cartel">Cartel</Link></b></li>
                    </ul>
                </nav>
            </header>
        );
}
}

export default Header;
