import React from 'react'
import '../CSS/Login.css'
import { Button } from '@mui/material'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import { actionType } from './Reducer';

const Login = () => {

    const [{} , dispatch] = useStateValue();


const signIn = () => {
   signInWithPopup(auth, provider).then((result) => {
    dispatch({
        type: actionType.SET_USER,
        user: result.user,
    })
   }).catch((error) => {
    console.log(error.message);
   })
};


  return (
    <div className='login'>
        <div className='login__container'>
            <img src='https://png.pngtree.com/png-clipart/20181003/ourmid/pngtree-whatsapp-social-media-icon-design-template-vector-whatsapp-logo-png-image_3654780.png' alt=''/>
            <div className='login__text'>
                <h1>Sign-in</h1>
            </div>
            <Button onClick={signIn}> Sign-in with Google</Button>
        </div>
    </div>
  )
}

export default Login