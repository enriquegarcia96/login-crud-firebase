import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import {auth} from './firebase';
import Reset from './components/Reset';

/*
 ====================================
    IMPORTO EL REACT ROUTER
 ===================================*/
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(() => {

    // Obtiene el usuario con sesion activa */
    auth.onAuthStateChanged(user => {
      console.log(user);

      if (user) {
        setFirebaseUser(user);
      }else{
        setFirebaseUser(null);
      }

    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        
        <Navbar firebaseUser={firebaseUser}/>

      <Switch>
          <Route path="/" exact>
            inicio...
            <h1 className="text-center">Enrique García</h1>
          </Route>
          
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/reset">
                <Reset />
          </Route>

      </Switch>
      </div>
    </Router>
  ) : (
    <h1 className="text-center"> Cargando...</h1>
  )
}

export default App;
