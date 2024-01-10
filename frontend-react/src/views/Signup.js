import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.js";


export default function Signup(){
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const {setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    try {
      const response = await axiosClient.post('/signup', payload);
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Signup for free</h1>
          {errors && <div className='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
          }
          <input ref={nameRef} type='text' placeholder='full name'/>
          <input ref={emailRef} type='email' placeholder='email adress'/>
          <input ref={passwordRef} type='password' placeholder='password'/>
          <input ref={passwordConfirmationRef} type='password' placeholder='password confirmation'/>
          <button className='btn btn-block'>Signup</button>
          <p className='message'>Already registered <Link to='/login'>Sign in</Link></p>
        </form>
      </div>
    </div>
  )
}
