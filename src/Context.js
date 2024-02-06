import { setDoc ,addDoc ,updateDoc , collection , } from "firebase/firestore";
// importing hooks which help us to handling states 
import { createContext, useContext, useEffect, useState } from "react";
// import data for fetching data
import Data from "./Data/data";
import { db } from "./firebaseStore/firebase";

// creating context
const ProductContext = createContext();

// make a hook  
function useContexValues() {
  const value = useContext(ProductContext);
  return value;
}


// make a functional component 
function CustomContext({ children }) {
  // define some state , which help us to save data , array etc.
  const [price, setPrice] = useState(5999);
  const [value, setValue] = useState({
    Clothes: false,
    Furniture: false,
    Jewelery: false,
    Electric: false,
  });


  const [searchTitle, setSearchTitle] = useState("");
  // in addCart we save products that user select to add cart
  const [addCart, setAddCart] = useState([]);
  // handle cart numbers , how many products in cart
  const [cartNo, setCartNo] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);
  const [inCart, setInCart] = useState(false);
  // in buy array , save the user products that user want's to purchase
  const [buy, setBuy] = useState([]);
  // handle count buy numbers , how many products user purchase
  const [countBuy, setCountBuy] = useState(0);

// make a constant to save the Data info
  const data = Data;

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedCartNo = localStorage.getItem("cartNo");

    if (storedCart) {
      setAddCart(JSON.parse(storedCart));
    }

    if (storedCartNo) {
      setCartNo(Number(storedCartNo));
    }
  }, []);

  // Save data to localStorage whenever addCart or cartNo changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(addCart));
    localStorage.setItem("cartNo", cartNo.toString());
  }, [addCart, cartNo]);



  // handleing the price range using an input that type is range
  const handleRangeChange = (e) => {
    const selectedPrice = e.target.value;
    setPrice(selectedPrice);
  };

  // handle checkbox according to user required , which products user want's to seen
  const handleCheckboxChange = (category) => {
    setValue((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  //handling search products by title 
  const handleSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };


// handle add to cart products 
  async function handleAddToCart(product){
    // first we check if product id which is user want to adding in cart and item id that select current is same or not
    const index = addCart.find((item) => item.id === product.id);
    


    if (!index) {
      handleIncreaseQuantity(product.id);
      setAddCart((prevCartData) => [
        ...prevCartData,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.img,
          quantity: 1,
        },
      ]);
      setInCart(true);
    }
  };


// handle increase quantity when product in cart and user want to increase the quantity of a product
  const handleIncreaseQuantity = (productId) => {
    // call setAddCart function and update quantity of that perticular product
    setAddCart((prevCartData) =>
      prevCartData.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    // increase cart number
    setCartNo((prevCartNo) => prevCartNo + 1);
  };



// handle decrease quantity when product in cart and user want to decrese the quantity of a product
  const handleDecreaseQuantity = (productId) => {
    // update quantity 
    setAddCart((prevCartData) => {
      const index = prevCartData.findIndex((item) => item.id === productId);

      if (index !== -1 && prevCartData[index].quantity > 1) {
        const updatedCart = [...prevCartData];
        updatedCart[index].quantity--;
        setCartNo((prevCartNo) => prevCartNo - 1);
        return updatedCart;
      } else {
        setCartNo((prevCartNo) => prevCartNo - 1);
        setInCart(false);
        return prevCartData.filter((item) => item.id !== productId);
      }
    });
  };




// handele delete product inside cart  
  const handleDeleteFromCart = (productId) => {
    setAddCart((prevCartData) => {
      const index = prevCartData.findIndex((item) => item.id === productId);

      if (index !== -1 && prevCartData[index]) {
        setCartNo((prevCartNo) =>
          Math.max(0, prevCartNo - prevCartData[index].quantity)
        );
        setInCart(false);
        return prevCartData.filter((item) => item.id !== productId);
      }
      return prevCartData;
    });
  };

  
  useEffect(() => {
    const totalPrices = addCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrices);
  }, [addCart]);


  
  const filteredData = data.filter((product) => {
    const priceRange = product.price <= price;
    const Title = product.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const categorySelect = value[product.category];
    return (
      priceRange &&
      Title &&
      (Object.values(value).every((val) => val === false) || categorySelect)
    );
  });

  const BuyNow = (product) => {
    const index = buy.find((item) => item.id === product.id);

    if (!index) {
      setCountBuy(countBuy + 1);
      setBuy((prevCartData) => [
        ...prevCartData,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.img,
          quantity: product.quantity,
        },
      ]);
    }
  };

  const DeleteOrder = (productId) => {
    setBuy((prevCartData) => {
      const index = prevCartData.findIndex((item) => item.id === productId);

      if (index !== -1 && prevCartData[index]) {
        setCountBuy((prevCartNo) =>
          Math.max(0, prevCartNo - prevCartData[index].quantity)
        );

        return prevCartData.filter((item) => item.id !== productId);
      }
      return prevCartData;
    });
  };

  return (
    <ProductContext.Provider
      value={{
        DeleteOrder,
        countBuy,
        buy,
        BuyNow,
        inCart,
        totalprice,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleDeleteFromCart,
        setCartNo,
        addCart,
        cartNo,
        price,
        handleRangeChange,
        filteredData,
        handleCheckboxChange,
        handleSearchTitle,
        handleAddToCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, useContexValues };
export default CustomContext;
