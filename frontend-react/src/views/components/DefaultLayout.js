import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.js";
import { useEffect } from "react";
import axiosClient from "../../axios-client.js";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };


    return (
        <div id="defaultLayout">
            <aside>
                <Link className="fs-2 fw-bold" to="/">
                    PetLar 🐶
                </Link>
                <Link className="fs-4 fw-bold add-btn" to="/add">
                    Adicionar Pet
                </Link>
            </aside>
            <div className="content">
                <header>
                    <div className="fs-2 fw-bold">Pets</div>
                    <div>
                        {user.name}
                        <a className="btn btn-primary m-2" href="#" onClick={onLogout}>↪️Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
