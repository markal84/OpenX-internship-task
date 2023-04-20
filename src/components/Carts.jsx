export default function Carts(props) {
  const { carts, users, products } = props;

  let highestTotal = 0;
  let highestCartOwner = "";

  carts.forEach((cart) => {
    let cartSum = 0;

    cart.products.forEach((product) => {
      const ordered = products.find((order) => order.id === product.productId);
      cartSum += ordered.price * product.quantity;
    });

    if (cartSum > highestTotal) {
      highestTotal = cartSum;
      highestCartOwner = users.find((user) => user.id === cart.userId);
    }
  });

  return (
    <div>
      <div>
        <h3>Cart with highest value:</h3>
        <p>
          <h4>
            {highestCartOwner.name.firstname} {highestCartOwner.name.lastname}
          </h4>
          <span>
            {" "}
            with total sum of <h4>{highestTotal}</h4>
          </span>
        </p>
      </div>
      <button type="button">Show / hide orders</button>
      {carts.map((cart) => {
        const user = users.find((user) => user.id === cart.userId);
        return (
          <div key={cart.id}>
            <h4>
              {user.name.firstname} {user.name.lastname} order
            </h4>
            {cart.products.map((product) => {
              const ordered = products.find(
                (order) => order.id === product.productId
              );
              return (
                <li key={product.productId}>
                  Name: {ordered.title}, Price {ordered.price} Quantity:{" "}
                  {product.quantity} To pay: {ordered.price * product.quantity}
                </li>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
