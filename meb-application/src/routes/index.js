import { Navigate, createBrowserRouter } from "react-router-dom";
import WebLayout from '../layouts/web/index'
import  Home from '../pages/home'
import Okumalar from "../pages/okumalar";
import Skor from "../pages/skor";
import YeniOkuma from "../pages/yeni-okuma";
import Rapor from "../pages/rapor";
import VoiceRecord from "../pages/voice-record";
import Okuma from "../pages/okuma";
import Login from "../pages/login";
import AuthLayout from "../layouts/web/auth";
import SignUp from "../pages/signUp";
import NotFounded from "../pages/notFounded";

const routes = createBrowserRouter([
    {
        path: '/',
        element:<WebLayout/>,
        children:[
            {
                index:true,
                element: <Navigate to="/skorlarim" />
            },
            {
                path: '/skorlarim',
                element: <Skor/>
            },
            {
                path: '/okumalarim',
                element: <Okumalar/>
            },
            {
                path: '/okuma',
                element: <Okuma/>,
                children:[
                    {
                        path:"/okuma/:id" , element:<Okuma/>
                    },]
            },
            {
                path: '/yeni-okuma',
                element: <YeniOkuma/>
            },
            {
                path: '/rapor',
                element: <Rapor/>,
                children:[
                    {
                        path:"/rapor/:id" , element:<Rapor/>
                    },
                ]
            },
            {
                path: '/voice-record',
                element: <VoiceRecord/>,
                children:[
                    {
                        path:"/voice-record/:id" , element:<VoiceRecord/>
                    },
                ]
            },
            {
                path: '/404',
                element: <NotFounded/>
            },
          
            
        ]

        
    },
    {
        path:'/',
        element:<AuthLayout/>,
        children:[
            {
                path:'/login',
                element : <Login />
            },
            {
                path:'/signup',
                element : <SignUp />
            }
            
        ],
        
    }
])

    export default routes

//     import { createBrowserRouter } from "react-router-dom";
// import WebLayout from '../layouts/web/index'
// import  Home from '../pages/home'
// import Okumalar from "../pages/okumalar";
// import Skor from "../pages/skor";
// import YeniOkuma from "../pages/yeni-okuma";
// import Rapor from "../pages/rapor";
// import VoiceRecord from "../pages/voice-record";
// import Okuma from "../pages/okuma";
// import Login from "../pages/login";
// import AuthLayout from "../layouts/web/auth";
// import SignUp from "../pages/signUp";
// import PrivateRoute from "./privateRoute";

// const routes = createBrowserRouter([
//     {
//         path: '/',
//         element:<WebLayout/>,
//         children:[
//             {
//                 index:true,
//                 element: <PrivateRoute><Home/></PrivateRoute>
//             },
//             {
//                 path: '/skorlarim',
//                 element: <PrivateRoute><Skor/></PrivateRoute>
//             },
//             {
//                 path: '/okumalarim',
//                 element: <PrivateRoute><Okumalar/></PrivateRoute>
//             },
//             {
//                 path: '/okuma',
//                 element: <PrivateRoute><Okuma/></PrivateRoute>,
//                 children:[
//                     {
//                         path:"/okuma/:id" , element:<PrivateRoute><Okuma/></PrivateRoute>
//                     },]
//             },
//             {
//                 path: '/yeni-okuma',
//                 element: <PrivateRoute><YeniOkuma/></PrivateRoute>
//             },
//             {
//                 path: '/rapor',
//                 element: <PrivateRoute><Rapor/></PrivateRoute>,
//                 children:[
//                     {
//                         path:"/rapor/:id" , element:<PrivateRoute><Rapor/></PrivateRoute>
//                     },
//                 ]
//             },
//             {
//                 path: '/voice-record',
//                 element: <VoiceRecord/>,
//                 children:[
//                     {
//                         path:"/voice-record/:id" , element:<PrivateRoute><VoiceRecord/></PrivateRoute>
//                     },
//                 ]
//             },
          
            
//         ]

        
//     },
//     {
//         path:'/',
//         element:<AuthLayout/>,
//         children:[
//             {
//                 path:'/login',
//                 element : <Login />
//             },
//             {
//                 path:'/signup',
//                 element : <SignUp />
//             }
            
//         ],
        
//     }
// ])

//     export default routes