import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettAllProduct } from "../redux/slices/productSlice";
import Product from "./Product";

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(gettAllProduct());
  }, [dispatch]);

  return (
    <div className="flex-row" style={{ flexWrap: "wrap", marginTop: "10px" }}>
      {products &&
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
    </div>
  );
}

export default ProductList;
