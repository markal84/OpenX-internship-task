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
    <div>
      Products categories
      <ul>
        {categoriesArr.map((categories, idx) => {
          const { category, totalValue } = categories;
          return (
            <li key={idx}>
              <p>
                Category:&nbsp;
                <span>{category},</span>&nbsp; Total value:&nbsp;
                <span>{totalValue.toFixed(2)}</span>&nbsp;
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
