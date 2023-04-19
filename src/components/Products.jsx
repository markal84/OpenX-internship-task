import { useState, useEffect } from 'react'
import fetchData from '../helpers/fetchData'
import { productsUrl } from '../globals/apisURL'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
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
      <button type='button'>Show Products</button>
      <p>Products</p>
    </div>
  )
}