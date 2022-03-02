import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [fav, setFav] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const cartResponse = await axios.get(
          "https://6206be4792dd6600171c0c15.mockapi.io/cart"
        );
        const favResponse = await axios.get(
          "https://6206be4792dd6600171c0c15.mockapi.io/favorites"
        );
        const itemsResponse = await axios.get(
          "https://6206be4792dd6600171c0c15.mockapi.io/items"
        );

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFav(favResponse.data);
        setItems(itemsResponse.data);
      } catch (err) {
        alert("Ошибка при запросе данных");
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://6206be4792dd6600171c0c15.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://6206be4792dd6600171c0c15.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (err) {
      alert("Не получилось добавить в корзину");
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6206be4792dd6600171c0c15.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (err) {
      alert("Ошибка при удалении из корзины");
      console.log(err);
    }
  };

  const onAddToFav = async (obj) => {
    try {
      if (fav.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://6206be4792dd6600171c0c15.mockapi.io/favorites/${obj.id}`
        );
        setFav((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://6206be4792dd6600171c0c15.mockapi.io/favorites",
          obj
        );
        setFav((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((objS) => Number(objS.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        fav,
        isItemAdded,
        onAddToFav,
        cartItems,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFav={onAddToFav}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route path="/favorites" exact element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
