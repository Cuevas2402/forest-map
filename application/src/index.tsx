import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store from './redux/index';
import router from "./router";
import './index.css'

const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
    <StrictMode>

      <PersistGate persistor={persistor}>

        <Provider store={store}>

          <RouterProvider router={router}/>

        </Provider>
        
      </PersistGate>

      
    </StrictMode>,
)
