import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.js";
import Signup from "./views/Signup.js";
import NotFound from "./views/NotFound.js";
import DefaultLayout from "./views/components/DefaultLayout.js";
import GuestLayout from "./views/components/GuestLayout.js";
import AddPetForm from "./views/AddPetForm";
import PetList from "./views/PetList";
import PetDetail from "./views/PetDetail";

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
                element: <PetList/>
            },
            {
                path: '/add',
                element: <AddPetForm/>
            },
            {
                path:'/pets/:id',
                element: <PetDetail/>
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
