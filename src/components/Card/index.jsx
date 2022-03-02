import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

import styles from "./Card.module.scss";

function Card({
  id,
  imageUrl,
  name,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);

  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, imageUrl, name, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFav = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={0}
          width={320}
          height={500}
          viewBox="0 0 320 500"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="6" ry="6" width="280" height="355" />
          <rect x="0" y="370" rx="5" ry="5" width="280" height="50" />
          <rect x="0" y="468" rx="5" ry="5" width="100" height="30" />
          <rect x="248" y="467" rx="8" ry="8" width="31" height="31" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.fav} onClick={onClickFav}>
            <img
              src={isFavorite ? "img/fav-like.svg" : "img/fav-un.svg"}
              alt="Unliked"
            />
          </div>
          <img src={imageUrl} alt="Sneakers" />
          <h5 className={styles.cardTitle}>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                onClick={onClickPlus}
                className={styles.plus}
                src={
                  isItemAdded(id) ? "img/btn-check.svg" : "img/btn-plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
