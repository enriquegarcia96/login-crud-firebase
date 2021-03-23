import React from 'react';
import {auth} from '../firebase';
import {withRouter} from 'react-router';
import Firestore from './Firestore';

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
            <h3 className="text-center">Enrique García</h3>
            <h3 className="text-center">Ruta Protegida</h3>
            {
                //Evaluo el usuario si existe el usuario
                user && (
                    <Firestore user={user} /> //con user tengo el uid del usuario de firestore
                )
            }
        </div>
    )
}

export default withRouter (Admin)
