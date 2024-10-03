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
import Logout from './pages/Logout';
import { Provider } from 'react-redux';
import store from './store/store';


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
        element:<Profile />,
        children:[
          {
            path:"/Profile/Logout",
            element:<Logout />
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <RouterProvider router={router}>
    <App />
  </RouterProvider>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();