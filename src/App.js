import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };
  const selectHandler = (pageSelected) => {
    if (
      pageSelected > 0 &&
      pageSelected <= products.length / 10 &&
      pageSelected != page
    )
      setPage(pageSelected);
  };

  console.log(products);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page != 1 ? "" : "pagination__disable"}
            onClick={() => {
              selectHandler(page - 1);
            }}
          >
            {"<"}
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page == i + 1 ? "selectedPage" : ""}
                onClick={() => {
                  selectHandler(i + 1);
                }}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => {
              selectHandler(page + 1);
            }}
          >
            {">"}
          </span>
        </div>
      )}
    </div>
  );
}
