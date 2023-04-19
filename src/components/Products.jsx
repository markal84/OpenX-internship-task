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

  const categories = products.reduce((acc, product) => {
    const { category, price } = product

    if(!acc[category]) {
      acc[category] = 0
    }

    acc[category] += price
    return acc
  }, {})


  const categoriesArr = Object.keys(categories).map((category) => ({
    category,
    totalValue: categories[category],
  }))

  return (
    <div>
      Products categories
      <ul>
        {categoriesArr.map((categories, idx) => {
          const { category, totalValue } = categories
          return (
            <li key={idx}>Category: {category}<span>, &nbsp; Total value: {totalValue.toFixed(2)}</span></li>
          )
        })}
      </ul>
    </div>
  )
}