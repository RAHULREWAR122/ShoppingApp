import style from "./cart.module.css";
import { useContexValues } from "../Context";

export function Cart() {
  const {
    totalprice,
    addCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleDeleteFromCart,
    BuyNow,
  } = useContexValues();

  return (
    <>
      <div className={style.main}>
        <section className={style.top}>
          {addCart.length > 0 ? (
            addCart.map((prod) => (
              <div key={prod.id} className={style.cartProduct}>
                <img src={prod.img} alt={prod.title} />
                <div className={style.details}>
                  <h2>{prod.title}</h2>
                  <div className={style.product}>
                    <h2>
                      &#8377; {prod.quantity} X {prod.price}
                    </h2>
                    <div className={style.quantity}>
                      <img
                        onClick={() => handleDecreaseQuantity(prod.id)}
                        src="https://cdn-icons-png.flaticon.com/128/7500/7500219.png"
                        alt="-"
                      />
                      <span>{prod.quantity}</span>
                      <img
                        onClick={() => handleIncreaseQuantity(prod.id)}
                        src="https://cdn-icons-png.flaticon.com/128/6947/6947572.png"
                        alt="+"
                      />
                    </div>
                  </div>
                  <div className={style.btns}>
                    <button
                      onClick={() =>
                        BuyNow({
                          id: prod.id,
                          title: prod.title,
                          price: prod.price,
                          img: prod.img,
                          quantity: prod.quantity,
                        })
                      }
                      className={style.buy}
                    >
                      Buy Now
                    </button>
                    <button
                      className={style.remove}
                      onClick={() => handleDeleteFromCart(prod.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No Products Available here</h1>
          )}
        </section>
        <section className={style.bottom}>
          <h1>Total</h1>
          <h2>&#8377; {totalprice}</h2>
        </section>
      </div>
    </>
  );
}
