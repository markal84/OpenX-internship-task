import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CARTS_URL, PRODUCTS_URL, USERS_URL } from "./globals/apisURL";
import fetchData from "./helpers/fetchData";
import { usersData } from "./tests/fetchedData";
import Users from "./components/Users";

describe("App should", () => {
  test("fetch users and display number of users", () => {
    render(<Users users={usersData} />);

    const usersNumber = screen.getByText(/Total users:/);
    expect(usersNumber).toBeInTheDocument();
    expect(usersNumber).toHaveTextContent("10");
  });
});

/*

test("fetch users", async () => {
    const usersRes = usersData;

    fetch.mockResolvedValue(createFetchRes(usersRes));
    const usersList = await fetchData(USERS_URL);

    expect(usersRes).toEqual(usersList);
  });
*/
