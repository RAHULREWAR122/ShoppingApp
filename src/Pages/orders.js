import { useContexValues } from "../Context";
import style from "./orders.module.css";

export function MyOrders() {
  const { buy, DeleteOrder } = useContexValues();

  console.log(buy);

  return (
    <>
      <div className={style.orderPage}>
        {buy.length > 0 ? (
          buy.map((prod) => {
            return (
              <div key={prod.id} className={style.order}>
                <div className={style.top}>
                  <img src={prod.img} alt={prod.title} />
                </div>
                <div className={style.details}>
                  <h1>
                    {prod.title.length < 13
                      ? prod.title
                      : prod.title.slice(0, 13) + "..."}
                  </h1>
                  <h2>
                    price :{prod.quantity} x {prod.price}
                  </h2>
                  <h2>Total : {prod.quantity * prod.price}</h2>
                  <div className={style.btn}>
                    <button onClick={() => DeleteOrder(prod.id)}>
                      Delete Order
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>No Orders !!</h2>
        )}
      </div>
    </>
  );
}
