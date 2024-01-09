import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./views/components/DefaultLayout.js";

const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>
    }
])

export default router;
