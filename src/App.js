import React from 'react';
import { Route, Switch } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Populares from './pages/VertodasPopulares';
import Cartel from "./pages/VertodasCartel"
import Notfound from './pages/Notfound';
import SearchResults from './pages/SearchResults';
import Favoritos from './pages/Favoritos';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ver-todas/populares" component={Populares} />
          <Route path="/ver-todas/cartel" component={Cartel} />
          <Route path="/search" component={SearchResults} />
          <Route path="/favoritos" component={Favoritos} />         
          <Route path="" component= {Notfound} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
