import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
    const history = useHistory(); 

    return (
        <header>
            <div className="logo">
                <h1>PopcornParadise</h1>
                <img src="/logo.jpg" alt="Logo de la aplicación" />
            </div>
            <SearchForm history={history} /> 
            <nav>
                <ul>
                    <li><b><Link to="/">Home</Link></b></li>
                    <li><b><Link to="/favoritos">Favoritos</Link></b></li>
                    <li><b><Link to="/ver-todas/populares">Ver Todas - Populares</Link></b></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
