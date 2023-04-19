import { useState, useEffect } from 'react'
import Users from './components/Users'
import Carts from './components/Carts'
import Products from './components/Products'

function App() {

  return (
    <div>
        <Users />
        <Carts />
        <Products />
    </div>
  )
}

export default App
