import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from "./router";
import './index.css'
import { AppProvider } from './context/AppProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>

      <AppProvider>

        <RouterProvider router={router}/>

      </AppProvider>
      
    </StrictMode>,
)
