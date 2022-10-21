import React from 'react'
import '../index.css'

const Notification = ({ message, style }) => {
    if (message === null) {
      return null
    }
    
    return (
      <div className={style}>
        {message}
      </div>
    )
  }

export default Notification