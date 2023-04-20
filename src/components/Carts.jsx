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

  console.log(highestCartOwner);

  return (
    <div>
      <div>
        <h3>Cart with highest value:</h3>
        {highestCartOwner != ""
          ? `${highestCartOwner.name.firstname} ${highestCartOwner.name.lastname}`
          : "waiting for data"}
        <p>
          <span>
            {" "}
            with total sum of{" "}
            {highestTotal !== 0 ? `${highestTotal}` : "waiting for data"}
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
