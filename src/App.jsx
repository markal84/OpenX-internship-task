import { useState, useEffect } from "react";
import fetchData from "./helpers/fetchData";
import { usersUrl, cartsUrl, productsUrl } from "./globals/apisURL";
import Users from "./components/Users";
import Carts from "./components/Carts";
import Products from "./components/Products";

function App() {
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      fetchData(usersUrl),
      fetchData(cartsUrl),
      fetchData(productsUrl),
    ])
      .then(([users, carts, products]) => {
        setUsers(users);
        setCarts(carts);
        setProducts(products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading data, please wait....</p>
      ) : (
        <div>
          <Users users={users} />
          <Carts carts={carts} users={users} products={products} />
          <Products products={products} />
        </div>
      )}
    </div>
  );
}

export default App;
