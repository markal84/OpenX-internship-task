export default function Products(props) {
  const { products } = props;

  const categories = products.reduce((acc, product) => {
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

  return (
    <section className="Section">
      Products categories
      <ul>
        {categoriesArr.map((categories, idx) => {
          const { category, totalValue } = categories;
          return (
            <li key={idx}>
              <p>
                Category: <span className="bold">{category},</span> Total value:{" "}
                <span className="bold">{totalValue.toFixed(2)}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
