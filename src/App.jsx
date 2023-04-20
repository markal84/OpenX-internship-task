import { useState, useEffect } from 'react'
import fetchData from './helpers/fetchData'
import { usersUrl, cartsUrl, productsUrl } from './globals/apisURL'
import Users from './components/Users'
import Carts from './components/Carts'
import Products from './components/Products'

function App() {
  const [users, setUsers] = useState([])
  const [carts, setCarts] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchData(usersUrl)
      .then((res) => {
        setUsers(res)
      })
      .catch((error) => {
        console.log(error.message)
      })

      fetchData(cartsUrl)
      .then((res) => {
        setCarts(res)
      })
      .catch((error) => {
        console.log(error.message);
      })

      fetchData(productsUrl)
      .then((res) => {
        setProducts(res)
      })
      .catch((error) => {
        console.log(error.message);
      })
  }, [])


  return (
    <div>
        <Users users={users} />
        <Carts carts={carts} />
        <Products products={products} />
    </div>
  )
}

export default App
