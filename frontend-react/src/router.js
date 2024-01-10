import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.js";
import Signup from "./views/Signup.js";
import NotFound from "./views/NotFound.js";
import DefaultLayout from "./views/components/DefaultLayout.js";
import GuestLayout from "./views/components/GuestLayout.js";
import Home from "./views/Home";
import AddPetForm from "./views/AddPetForm";

const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path: '/',
                element: <Navigate to='/home'/>
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/add',
                element: <AddPetForm/>
            }
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children: [
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
        ]
    },
    {
        path:'*',
        element:<NotFound/>
    },
])

export default router;
