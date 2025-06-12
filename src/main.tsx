import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { PlanesProvider } from '../context/PlanesProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <PlanesProvider>
      <App />
    </PlanesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
