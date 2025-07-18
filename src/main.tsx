import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { PlanesProvider } from './context/PlanesProvider.tsx'
import { AuthProvider } from './context/authContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlanesProvider>
          <App />
        </PlanesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
