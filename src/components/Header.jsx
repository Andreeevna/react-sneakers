import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between  align-center p-40">
      <Link to={process.env.PUBLIC_URL + "/"}>
        <div className="headerLeft d-flex align-center">
          <img src="img/logo.png" className="mr-10" alt="logo" />
          <div>
            <h3 className="text-uppercase">react sneakers</h3>
            <p className="opacity-5">магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-20 cu-p" onClick={props.onClickCart}>
          <img src="img/cart.svg" className="mr-10" alt="Cart" />
          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-20">
          <Link to={process.env.PUBLIC_URL + "/favorites"}>
            <img src="img/fav.svg" alt="Fav" />
          </Link>
        </li>
        <Link to="/orders">
          <img src="img/user.svg" alt="User" />
        </Link>
      </ul>
    </header>
  );
}

export default Header;
