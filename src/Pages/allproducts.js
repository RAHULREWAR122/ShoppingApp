import style from "./products.module.css";
import { useContexValues } from "../Context";
import { useNavigate } from "react-router-dom";

export function AllProducts({isAuth}) {
  const {
    price,
    handleRangeChange,
    filteredData,
    handleCheckboxChange,
    handleAddToCart,
    addCart,
  } = useContexValues();
 const navigate = useNavigate();

  // const productsInCart = new Set(addCart.map((item) => item.id));
  const productsInCart = (productId) =>
    addCart.some((item) => item.id === productId);

  return (
    <>
      <main>
        <section className={style.left}>
          <div className={style.quality}>
            <div className={style.price}>
              <h2>Price</h2>
              <input
                type="range"
                min="199"
                max="14999"
                value={price}
                onChange={handleRangeChange}
              />
              <span>{price}</span>
            </div>

            <div className={style.category}>
              <h1
                style={{
                  color: "#000",
                  fontSize: "2rem",
                  marginBottom: "10px",
                  marginTop: "40px",
                }}
              >
                Category
              </h1>

              <label htmlFor="Clothes">
                <input
                  type="checkbox"
                  name=""
                  id="Clothes"
                  checked={handleCheckboxChange.Clothes}
                  onChange={() => handleCheckboxChange("Clothes")}
                />
                Clothes
              </label>
              <label htmlFor="Furniture">
                <input
                  type="checkbox"
                  name=""
                  id="Furniture"
                  checked={handleCheckboxChange.Furniture}
                  onChange={() => handleCheckboxChange("furniture")}
                />
                Furniture
              </label>
              <label htmlFor="Electric">
                <input
                  type="checkbox"
                  name=""
                  id="Electric"
                  checked={handleCheckboxChange.Electric}
                  onChange={() => handleCheckboxChange("Electric")}
                />
                Electric
              </label>
              <label htmlFor="Jewelery">
                <input
                  type="checkbox"
                  name=""
                  id="Jewelery"
                  checked={handleCheckboxChange.Jewelery}
                  onChange={() => handleCheckboxChange("Jewelery")}
                />
                Jewelery
              </label>
            </div>
          </div>
        </section>

        {/* Right section */}

        <section className={style.right}>
          {filteredData.length > 0 ? (
            filteredData.map((product) => (
              <div key={product.id} className={style.cards}>
                <img src={product.img} alt={product.title} />
                <h2>{product.title}</h2>
                <h3>&#8377; {product.price}</h3>
                <button   
                   className={`${
                    !productsInCart(product.id) ? style.ca : style.noCa
                  }`}
                                  
                  onClick={() => isAuth ? (                    handleAddToCart({
                    id: product.id,
                    title: product.title,
                    img: product.img,
                    price: product.price,
                  })
                   ) : navigate('/signIn')
                  }
                >
                  {productsInCart(product.id) ? "Added" : "Add To Cart"}
                </button>
              </div>
            ))
          ) : (
            <h1 className={style.noData}>No Data Available!!!</h1>
          )}
        </section>
      </main>
    </>
  );
}
