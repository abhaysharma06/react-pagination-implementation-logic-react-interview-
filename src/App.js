import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();

    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className="App">
      {products.slice(page * 10 - 10, page * 10).map((data, i) => {
        return (
          <div className="App__card">
            <div className="App__card--image">
              <img src={data?.images[0]} alt="product-img" />
            </div>
            <div className="App__card--content">
              <h3>{data?.title}</h3>
              <p>{data?.description}</p>
            </div>
          </div>
        );
      })}

      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>

          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
