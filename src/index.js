import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Sigin from './pages/Sigin';
import Sigup from './pages/Sigup';
import Addwork from './pages/Addwork';
import Totalworks from './pages/Totalworks';
import Profile from './pages/Profile';


const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/Addwork",
        element:<Addwork />
      },
      {
        path:"/Totalworks",
        element:<Totalworks />
      },
      {
        path:"/Sigin",
        element:<Sigin />
      },
      {
        path:"/Sigup",
        element:<Sigup />
      },
      {
        path:"/Profile",
        element:<Profile />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <RouterProvider router={router}>
    <App />
  </RouterProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
