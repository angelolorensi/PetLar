import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/auth/Login.js";
import Signup from "./views/auth/Signup.js";
import NotFound from "./views/shared/NotFound.js";
import DefaultLayout from "./views/layouts/DefaultLayout.js";
import GuestLayout from "./views/layouts/GuestLayout.js";
import AddPetForm from "./views/pet/forms/AddPetForm";
import EditPetForm from "./views/pet/forms/EditPetForm";
import PetList from "./views/pet/PetList";
import PetDetail from "./views/pet/PetDetail";

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
                path: '/pets/:id/edit',
                element: <EditPetForm />
            },
            {
                path:'/pets/:id',
                element: <PetDetail/>
            },
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
