import React from 'react'

const Header = () => {
  const date = new Date();
  return (
    <div className='container'>
      <h2>
        Welcome to your time management tool
      </h2>
      <h3>{date.toLocaleDateString()}</h3>
    </div>
  )
}

export default Header