import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './common/css/index.css'
import Layout from './layouts/Layout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
)
