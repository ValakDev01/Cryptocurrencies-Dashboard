import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard/Dashboard'
import NotFound404 from './components/NotFound404/NotFound404'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}

export default App
