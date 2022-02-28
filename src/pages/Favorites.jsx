import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Favorites() {
  const {fav, onAddToFav} = React.useContext(AppContext); 
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
         Мои закладки
        </h1>
      </div>
      <div className="sneakers">
      {fav
            .map((obj) => (
              <Card
                favorited={true}
                onFavorite={onAddToFav}
                key={obj.name}
                {...obj}
              />
              
            ))}
      </div>
    </div>
  );
}

export default Favorites;
