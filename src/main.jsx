import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './common/css/index.css'
import Layout from './layouts/Layout.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>
)
