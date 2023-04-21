import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { usersData, cartsData, productsData } from "./tests/fetchedData";
import Users from "./components/Users";
import Carts from "./components/Carts";
import Products from "./components/Products";

describe("App should", () => {
  test("fetch users and display number of users", () => {
    render(<Users users={usersData} />);

    const usersNumber = screen.getByText(/Total users:/);
    expect(usersNumber).toBeInTheDocument();
    expect(usersNumber).toHaveTextContent(`10`);
  });

  test("display furthest away living users and distance between them", () => {
    const maxUsersDistance = ["johnd", "derek"];
    const distance = "15012km";

    render(<Users users={usersData} />);

    const furthestDistance = screen.getByText(/Users living farthest away:/);
    expect(furthestDistance).toBeInTheDocument();
    expect(furthestDistance).toHaveTextContent(
      `${maxUsersDistance[0]} and ${maxUsersDistance[1]}`
    );

    const maxDistance = screen.getByText(distance);
    expect(maxDistance).toBeInTheDocument();
  });

  test("display owner of the highest value cart and total sum of the cart", () => {
    const user = ["john", "doe"];
    const cartSum = 2578.7;

    render(
      <Carts carts={cartsData} users={usersData} products={productsData} />
    );

    let highestTotal = 0;
    let highestCartOwner = "";

    function findHighest() {
      cartsData.forEach((cart) => {
        let cartSum = 0;

        cart.products.forEach((product) => {
          const ordered = productsData.find(
            (order) => order.id === product.productId
          );
          cartSum += ordered.price * product.quantity;
        });

        if (cartSum > highestTotal) {
          highestTotal = cartSum;
          highestCartOwner = usersData.find((user) => user.id === cart.userId);
        }
      });
    }

    findHighest();

    expect(highestTotal).toEqual(cartSum);
    expect(highestCartOwner.name.firstname).toEqual(user[0]);
    expect(highestCartOwner.name.lastname).toEqual(user[1]);
  });

  test("display all avaiable products categories and total sums of them", () => {
    render(<Products products={productsData} />);

    function extractCategories() {
      const categories = productsData.reduce((acc, product) => {
        const { category, price } = product;

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += price;
        return acc;
      }, {});

      const categoriesArr = Object.keys(categories).map((category) => ({
        category,
        totalValue: categories[category],
      }));

      return categoriesArr;
    }

    const extractedCategories = extractCategories();

    expect(extractedCategories).toHaveLength(4);
    expect(extractedCategories[2].category).toEqual("electronics");
    expect(extractedCategories[1].totalValue).toEqual(883.98);
  });
});
