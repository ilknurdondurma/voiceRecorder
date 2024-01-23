import { createBrowserRouter } from "react-router-dom";
import WebLayout from '../layouts/web/index'
import  Home from '../pages/home'
import Okumalar from "../pages/okumalar";
import Skor from "../pages/skor";
import YeniOkuma from "../pages/yeni-okuma";
import Rapor from "../pages/rapor";
import VoiceRecord from "../pages/voice-record";
import Okuma from "../pages/okuma";

const routes = createBrowserRouter([
    {
        path: '/',
        element:<WebLayout/>,
        children:[
            {
                index:true,
                element: <Home/>
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
          
            
        ]
    },])

    export default routes