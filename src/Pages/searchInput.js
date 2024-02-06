import { useContexValues } from "../Context";
import style from "./products.module.css";

export function SearchInput() {
  const { handleSearchTitle } = useContexValues();

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <input
          className={style.searchBar}
          type="text"
          placeholder="Search product here..."
          onChange={handleSearchTitle}
          id=""
        />
      </div>
    </>
  );
}
