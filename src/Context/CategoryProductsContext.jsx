import { createContext, useState } from "react"




export const CategoryProductsContext = createContext();

export default function CategoryProductsContextProvider(props) {

    const [query, setQuery] = useState("");
    const [sortOption, setSortOption] = useState("az");
  return <CategoryProductsContext.Provider value={{query,setQuery,sortOption,setSortOption}}>
   {props.children}
  </CategoryProductsContext.Provider>
}
