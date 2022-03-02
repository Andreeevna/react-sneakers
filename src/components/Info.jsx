import React from "react";
import AppContext from "../context";

function Info({image, title, desc}) {
    const { setCartOpened } = React.useContext(AppContext)
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width="120px"
        src={image}
        alt="Empty"
      />
      <h2>{title}</h2>
      <p className="opacity-6">{desc} </p>
      <button onClick={() => setCartOpened(false)} className="greenBtn">
        <img src="img/arrow-left.svg" alt="Arrow-left" />
        Вернуться назад
      </button>
    </div>
  );
}

export default Info;
