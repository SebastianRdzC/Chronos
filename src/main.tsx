import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, } from 'react-router'
import './index.css'
import Landing from './pages/landing/Landing.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      
    </Router>

  </StrictMode>,
)
