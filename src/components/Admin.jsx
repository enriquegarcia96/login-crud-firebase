import React from 'react';
import {auth} from '../firebase';
import {withRouter} from 'react-router';

const Admin = ( props ) => {

    const [user, setUser] = React.useState(null);

    React.useEffect( () =>{

        if (auth.currentUser) {
            console.log('Existe un usuario');
            setUser(auth.currentUser);//acediendo a la informacion de current
        }else{
            console.log('NO Existe un usuario');

            props.history.push('/login');//lo redirigo al login
        }
    }, [props.history]);



    return (
        <div>
            <h2>Ruta Protegida</h2>
            {
                //Evaluo el usuario si existe el usuario
                user && (
                    <h3>{user.email}</h3>
                )
            }
        </div>
    )
}

export default withRouter (Admin)
