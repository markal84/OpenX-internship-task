import { useState, useEffect } from 'react'
import fetchData from '../helpers/fetchData'
import { cartsUrl } from '../globals/apisURL'

export default function Carts() {
  const [carts, setCarts] = useState([])

  useEffect(() => {
    fetchData(cartsUrl)
      .then((res) => {
        setCarts(res)
      })
      .catch((error) => {
        console.log(error.message);
      })
  }, [])

  return (
    <div>
      <button type='button'>Show carts</button>
      {carts.map((cart) => {
        return (
          <div key={cart.id}>
            <p>Orders:</p>
            <p>{cart.products.map((product) => {
              return (
                <span key={product.productId}>{product.quantity} &nbsp;</span>
              )
            })}</p>
          </div>
        )
      })}
    </div>
  )
}
