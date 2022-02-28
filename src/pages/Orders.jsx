import axios from "axios";
import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Orders() {
  const { onAddToFav, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    (async () => {
      try{const { data } = await axios.get(
        "https://6206be4792dd6600171c0c15.mockapi.io/orders"
      );
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      setIsLoading(false)

      }catch(err){
        alert("Ошибка при запросе заказов")
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="sneakers">
        {(isLoading ? [...Array(10)] : orders).map((obj, index) => (
          <Card
            {...obj}
            onFavorite={(item) => onAddToFav(item)}
            loading={isLoading}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
