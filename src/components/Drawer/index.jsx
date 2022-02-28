import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function Drawer({ onClose, items = [], onRemove, opened }) {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isComplete, setIsComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6206be4792dd6600171c0c15.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const el = cartItems[i];
        await axios.delete(
          "https://6206be4792dd6600171c0c15.mockapi.io/cart/" + el.id
        );
        await delay();
      }
    } catch (err) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible:''}`}>
      <div className={styles.drawer}>
          <h2 className="d-flex justify-between mb-30">
            Корзина
            <img
              onClick={onClose}
              className="removeBtn cu-p"
              src="/img/btn-remove.svg"
              alt="Remove"
            />
          </h2>

          {items.length > 0 ? (
            <div className="d-flex flex-column flex">
              <div className="items flex">
              {items.map((item) => (
                <div key={item.id} className="cartItem d-flex align-center">
                  <img
                    className="mr-10"
                    width={70}
                    height={80}
                    src={item.imageUrl}
                    alt="Sneakers"
                  />
                  <div className="mr-10">
                    <p className="cartItemDesc mb-5">{item.name}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(item.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб.</b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{Math.round(totalPrice / 100* 5)} руб.</b>
                  </li>
                </ul>
                <button
                  disabled={isLoading}
                  onClick={onClickOrder}
                  className="greenBtn"
                >
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          ) : (
            <Info
              image={isComplete ? "/img/order.jpg" : "/img/empty-cart.png"}
              title={isComplete ? "Заказ оформлен!" : "Корзина пустая"}
              desc={
                isComplete
                  ? ` Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                  : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
              }
            />
          )}
        </div>
      </div>
    
  );
}

export default Drawer;
