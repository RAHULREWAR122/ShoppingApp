import { AllProducts } from "./allproducts";

import { SearchInput } from "./searchInput";

function Home({isAuth}) {
  return (
    <>
      <SearchInput />
      <AllProducts isAuth={isAuth}/>
    </>
  );
}

export default Home;
