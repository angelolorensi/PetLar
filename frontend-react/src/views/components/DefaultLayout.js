import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.js";
import {useEffect} from "react";
import axiosClient from "../../axios-client.js";

export default function DefaultLayout(){
    const {user, token,notification,setUser, setToken} = useStateContext();

    if(!token){
        return <Navigate to='/login'/>
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null)
            })
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => [
                setUser(data)
            ])
    }, []);

    return (
        <div id='defaultLayout'>
            <aside>
                <Link className='fs-2 fw-bold' to='/dashboard'>PetLar 🐶</Link>
                <Link className='fs-4 fw-bold add-btn' to='/add'>Adicionar Pet</Link>
            </aside>
            <div className='content'>
                <header>
                    <div className='fs-3 fw-bold'>
                        Pets
                    </div>
                    <div>
                        {user.name}
                        <a className='btn-logout' href='#' onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>

            {notification && <div className='notification'>
                {notification}
            </div>}
        </div>
    )
}
