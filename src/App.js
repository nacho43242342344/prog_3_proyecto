import React from 'react';
import { Switch, Route} from "react-router-dom" 
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Populares from './pages/Vertodas';
import Cartel from "./pages/VertodasCartel"
import Notfound from './pages/Notfound';

function App() {
  return (
    <>
      <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/ver-todas/populares" component={Populares} />
            <Route path="/ver-todas/cartel" component={Cartel} />
            <Route path="" component= {Notfound} />
        </Switch>
      <Footer />
    </>
  );
}

export default App;
