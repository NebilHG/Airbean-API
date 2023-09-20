import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import reducers from 'reducers';
import App from './App';
import { MenuView, AboutView, ProfileView } from './views';

import './index.scss';


const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/menu",
        element: <MenuView />,
      },
      {
        path: "/about",
        element: <AboutView />,
      },
      {
        path: "/profile",
        element: <ProfileView />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404</h1>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
