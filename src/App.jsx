import { useState, useEffect } from "react";
import fetchData from "./helpers/fetchData";
import { USERS_URL, CARTS_URL, PRODUCTS_URL } from "./globals/apisURL";
import Header from "./components/Header";
import Users from "./components/Users";
import Carts from "./components/Carts";
import Products from "./components/Products";
import Footer from "./components/Footer";

function App() {
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      fetchData(USERS_URL),
      fetchData(CARTS_URL),
      fetchData(PRODUCTS_URL),
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
    <div className="App">
      {isLoading ? (
        <p>Loading data, please wait....</p>
      ) : (
        <div>
          <Header />
          <h3>Users section</h3>
          <Users users={users} />
          <h3>Carts section</h3>
          <Carts carts={carts} users={users} products={products} />
          <h3>Products section</h3>
          <Products products={products} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
