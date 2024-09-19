import React from 'react';
import { Switch, Route} from "react-router-dom" 
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import VerTodas from './pages/Vertodas';

function App() {
  return (
    <>
      <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/ver-todas/populares" component={VerTodas} />
        </Switch>
      <Footer />
    </>
  );
}

export default App;
