export default function Carts(props) {
  const { carts } = props

  return (
    <div>
      <button type='button'>Show / hide carts</button>
    </div>
  )
}

/*
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
*/