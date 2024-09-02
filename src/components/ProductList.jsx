import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettAllProduct } from "../redux/slices/productSlice";
import Product from "./Product";

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);
  const filter = useSelector((store) => store.filter.filter);

  useEffect(() => {
    dispatch(gettAllProduct());
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex-row" style={{ flexWrap: "wrap", marginTop: "10px" }}>
      {filteredProducts &&
        filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
    </div>
  );
}

export default ProductList;
