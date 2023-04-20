import { useState } from "react";

export default function Carts(props) {
  const { carts, users, products } = props;
  const [isShow, setIsShow] = useState(false);

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
    <section className="Section">
      <div>
        <p>Cart with the highest value:</p>
        User:&nbsp;
        <span className="bold">
          {highestCartOwner != ""
            ? `${highestCartOwner.name.firstname} ${highestCartOwner.name.lastname}`
            : "waiting for data"}
        </span>
        <p>
          with total sum of:{" "}
          <span className="bold">
            {highestTotal !== 0 ? `${highestTotal}` : "waiting for data"}
          </span>
        </p>
      </div>
      <button type="button" onClick={() => setIsShow((isShow) => !isShow)}>
        {isShow ? "hide" : "show"} orders
      </button>
      {carts.map((cart) => {
        const user = users.find((user) => user.id === cart.userId);
        return (
          <ul
            key={cart.id}
            style={{
              display: isShow ? "block" : "none",
            }}
          >
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
          </ul>
        );
      })}
    </section>
  );
}
