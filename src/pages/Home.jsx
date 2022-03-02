import React from "react";
import Card from "../components/Card";


function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFav,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toUpperCase().includes(searchValue.toUpperCase())
    );

    return (isLoading ? [...Array(10)] : filteredItems).map((obj, index) => (
      <Card
        {...obj}
        onFavorite={(item) => onAddToFav(item)}
        onPlus={(item) => onAddToCart(item)}
        loading={isLoading}
        key={index}
      />
    ));
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="searchBlock d-flex">
          <img src="img/search.svg" alt="Search" />
          {searchValue && (
            <img
              className="clear removeBtn"
              src="img/btn-remove.svg"
              alt="Remove"
              onClick={() => setSearchValue("")}
            />
          )}
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            className="search"
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}

export default Home;
