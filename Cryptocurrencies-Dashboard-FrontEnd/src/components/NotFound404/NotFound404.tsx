import React from 'react'

import './NotFound404.css'

const NotFound404: React.FC = () => {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-title'>404</h1>
      <p className='not-found-message'>Oops! The page you are looking for doesn't exist.</p>
    </div>
  )
}

export default NotFound404
