import React from 'react';
import { auth } from '../firebase.js';
import { withRouter } from 'react-router';


/*====================================
    IMPORTO EL REACT NAVBAR
 ===================================*/
import { Link, NavLink } from 'react-router-dom';

const Navbar = ( props ) => {

    /**========= FUNCIONES ========== */
    const cerrarSesion = () =>{

        //cierro la sesion activa
        auth.signOut()
            .then( () => {

                //lo empujo al login
                props.history.push('/login');
            } )
    }


    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">AUTH</Link>
            <div>
                <div className="d-flex">
                    <NavLink className="btn btn-dark mr-2" to="/" exact>
                        Inicio
                    </NavLink>
                    {
                        props.firebaseUser !== null ? (

                            <NavLink className="btn btn-dark mr-2" to="/admin">
                                Admin
                            </NavLink>

                        ) :  null
                    }

                    {
                        props.firebaseUser !== null ? (
                            <button 
                                className="btn btn-dark"
                                onClick={ () => cerrarSesion()}
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <NavLink className="btn btn-dark mr-2" to="/login">
                                Login
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter (Navbar);


