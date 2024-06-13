import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/stuff/Index";
import StuffCreate from "./pages/stuff/Create";
import StuffEdit from "./pages/stuff/Edit";
import Inbound from "./pages/inbound/IndexInbound";
import InboundCreate from "./pages/inbound/CreateInbound";
import User from "./pages/user/IndexUser";
import UserCreate from "./pages/user/CreateUser";
import UserEdit from "./pages/user/EditUser";
import Lending from "./pages/lending/IndexLending";
import LendingCreate from "./pages/lending/CreateLending";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard /> },

    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> },

    { path: '/inbound', element: <Inbound /> },
    { path: '/inbound/tambah', element: <InboundCreate /> },

    { path: '/user', element: <User /> },
    { path: '/user/create', element: <UserCreate /> },
    { path: '/user/edit/:id', element: <UserEdit /> },

    { path: '/lending', element: <Lending /> },
    { path: '/lending/create', element: <LendingCreate /> },
    
])