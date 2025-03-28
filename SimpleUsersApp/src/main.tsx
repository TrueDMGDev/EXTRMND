import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Users from './components/Users.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Users />
  </StrictMode>,
)
