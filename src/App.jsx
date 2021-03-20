import React from 'react';
import Navbar from './components/Navbar';

/*
 ====================================
    IMPORTO EL REACT ROUTER
 ===================================*/
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="container">
        
        <Navbar />

      <Switch>
          <Route path="/" exact>
            inicio...
          </Route>
          
          <Route path="/login">
            login..
          </Route>

          <Route path="/admin">
            Administracion...
          </Route>

      </Switch>
      </div>
    </Router>
  );
}

export default App;
