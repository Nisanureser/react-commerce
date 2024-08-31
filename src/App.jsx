import { useEffect, useState } from "react";
import "./App.css";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import {
  calculateBasket,
  removeToBasket,
  setDrawer,
} from "./redux/slices/basketSlice";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { removeToStar, setStarDrawer } from "./redux/slices/starSlice";

function App() {
  const { products, drawer, totalAmount } = useSelector(
    (store) => store.basket
  );
  const { productsStar, drawerStar } = useSelector((store) => store.star);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateBasket(totalAmount));
  }, []);
  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer
          anchor="right"
          open={drawer}
          onClose={() => dispatch(setDrawer())}
        >
          <div className="basket_title">
            <p>SEPETİM</p>
          </div>

          {products &&
            products.map((product) => {
              return (
                <div className="basket" key={product.id}>
                  <div className="basket_image">
                    <img src={product.image} width={50} height={50} />
                  </div>
                  <div className="basket_write">
                    <p>{product.title}</p>
                    <p>{product.price}TL</p>
                  </div>
                  <div className="basket_icons">
                    <CiCirclePlus className="basket_icon" />
                    <span>{product.count}</span>
                    <CiCircleMinus className="basket_icon" />
                  </div>

                  <FaRegTimesCircle
                    onClick={() => dispatch(removeToBasket({ id: product.id }))}
                    className="remove-icon"
                  />
                </div>
              );
            })}
          <div className="subtotal-container">
            <p>
              ARA TOPLAM: <span>{totalAmount} TL</span>
            </p>
          </div>
        </Drawer>

        <Drawer
          anchor="right"
          open={drawerStar}
          onClose={() => dispatch(setStarDrawer())}
        >
          <div className="basket_title">
            <p>YILDIZLANAN ÜRÜNLER</p>
          </div>
          {productsStar &&
            productsStar.map((product) => {
              return (
                <div className="basket" key={product.id}>
                  <div className="basket_image">
                    <img src={product.image} width={50} height={50} />
                  </div>
                  <div className="basket_write">
                    <p>{product.title}</p>
                    <p>{product.price}TL</p>
                  </div>

                  <FaRegTimesCircle
                    onClick={() => dispatch(removeToStar({ id: product.id }))}
                    className="remove-icon"
                  />
                </div>
              );
            })}
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
