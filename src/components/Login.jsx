import React from 'react';
import {auth, db} from '../firebase';

// Nos permite empujar al usuario  a diferentes rutas
import {withRouter} from 'react-router-dom';


const Login = ( props ) => {

    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [error, setError] = React.useState(null);
    const [esRegistro, setRegistro] = React.useState(false);


/*====================================
       FUNCIONES
===================================*/
    const procesarDatos = (e) =>{
        e.preventDefault();

        if (!email.trim()) {
            //console.log('Ingrese Correo electronico');
            setError('Ingrese Correo electronico');
            return;
        }
        if (!pass.trim()) {
            //console.log('Ingrese Contraseña');
            setError('Ingrese Contraseña')
            return;
        }
        if(pass.length < 6){
            //console.log('Contraseña mayor a 6 caracteres');
            setError('Contraseña de  6 caracteres o mas');
            return;
        }
        console.log('pasando todas las validaciones');
        setError(null);

        if (esRegistro) {
            registrar()    ;
        }else{
            login();
        }
    }

    

    /**=================
     **  FUNCION DE LOGIN 
     * =================  */
    const login = React.useCallback( async ()=>{

        try {
            const res = await auth.signInWithEmailAndPassword(email,pass);
            //console.log(res.user);

            /*  limpio los campos */
            setEmail('');
            setPass('');
            setError(null);

            //mando la ruta
            props.history.push('/admin');

        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-email') {
                setError('Correo no valido');
            }
            if (error.code === 'auth/user-not-found') {
                setError('Email no registrado');
            }
            if (error.code === 'auth/wrong-password') {
                setError('Contraseña incorrecta');
            }
        }

    },[email,pass, props.history]);//paso los state 


    /**=================
     **  FUNCION DE REGISTRAR 
     * =================  */
    //Hook (React.usecallback)
    /**=========== {} [] Llamos  a los state que estoy usando ==========*/
    const registrar = React.useCallback( async() => {

        try {
            
            /** Con esto creo una nueva cuenta en FireBase. Paso las variables state */
            const res = await auth.createUserWithEmailAndPassword(email,pass);

            /**=========== Creo la colecion usuario en FIREBASE =========== */
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            });//creo una colecion de usuarios

            await db.collection(res.user.uid).add({
                name: 'Tarea de ejemplo',
                fecha: Date.now()
            })

            //console.log(res.user);

            /*  limpio los campos */
            setEmail('');
            setPass('');
            setError(null);

            props.history.push('/admin');//mando al usuario a la pagina de admmin

        } catch (error) {
            console.log(error);

            /** Pinto el ERROR que tira firebase en la  pagina web 
             * Personalizado con el if */
            if (error.code === 'auth/invalid-email') {
                setError('Email no valido');
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('Ese correo ya existe');
            }
        }
    },[email, pass, props.history]) //paso los state 




    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese su email"
                            onChange={ e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese su password"
                            onChange={ e => setPass(e.target.value) }
                            value={ pass }
                        />
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>
                        <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={ () => setRegistro(!esRegistro) }
                            type="button"
                            >
                                {   
                                    esRegistro ? '¿Ya estas registrado?' : '¿No tienes cuenta?'
                                }
                            
                        </button>
                        {
                            !esRegistro ? (
                                <button 
                                    className="btn btn-lg btn-danger btn-sm mt-2" 
                                    type="button"
                                    onClick={ () => props.history.push('/reset') }
                                >
                                    Recuperar Contraseña
                                </button>
                            ) : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter (Login)
