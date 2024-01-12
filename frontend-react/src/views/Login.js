import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.js";
import undrawDog from '../assets/img/undraw_dog.svg';

export default function Login(){
  const emailRef = useRef();
  const passwordRef = useRef();
  const {setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = async (ev)=> {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setErrors(null)
    try {
      const response = await axiosClient.post('/login', payload);
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        if(error.response.data.errors){
          setErrors(error.response.data.errors);
        } else {
         setErrors({
           email: [error.response.data.message]
         })
        }
      }
    }
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
        <div>
            <img src={undrawDog} width='300' height='300'/>
        </div>
        <div className='form'>
          <form onSubmit={onSubmit}>
            <h1 className='title'>Entre com a sua conta</h1>
            {errors && <div className='alert'>
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
            }
            <input ref={emailRef} type='email' placeholder='email'/>
            <input ref={passwordRef} type='password' placeholder='password'/>
            <button className='btn btn-block'>Entrar</button>
            <p className='message'>Não é cadastrado? <Link to='/signup'>Criar uma conta</Link></p>
          </form>
        </div>
    </div>
  )
}
