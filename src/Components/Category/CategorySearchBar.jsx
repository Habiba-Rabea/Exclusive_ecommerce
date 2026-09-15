import { ArrowUpDown, Search } from 'lucide-react';
import "../../CSS/Categorysearchbar.css";
import { useContext } from 'react';
import { CategoryProductsContext } from '../../Context/CategoryProductsContext';

export default function CategorySearchBar({ productCount }) {
  let {query,setQuery,sortOption,setSortOption} = useContext(CategoryProductsContext);

  
  return (
 <section className="category-search-bar" aria-label="Product search and sort">
      {/* Search */}
      <div className="category-search-bar__search">
        <Search className="category-search-bar__search-icon" />
        <input
        value={query}
          type="text"
          placeholder="Search product by name..."
          className="category-search-bar__search-input"
          onChange={(e)=>setQuery(e.target.value)}
        />
      </div>
 
      {/* Meta: results count + sort */}
      <div className="category-search-bar__meta">
        <span className="category-search-bar__count">
          <span className="category-search-bar__dot" />
          Showing {productCount} products
        </span>
 
        <span className="category-search-bar__divider" aria-hidden="true" />
 

{/* sorting by select tag */}

<div className="selectCard inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg  px-0.75 py-1.5 shadow-sm hover:border-gray-300 transition-all">
  {/* Label */}
  <span className="text-xs font-medium text-gray-500 whitespace-nowrap flex gap-1">
    <ArrowUpDown className="category-search-bar__sort-icon" />
    Sort By
  </span>

  {/* Visual Divider */}
  <div className="h-4 w-px bg-gray-200" />

  {/* Select / Dropdown Component */}
   <select value={sortOption} className="selectOptions select outline-0 border-0 shadow-none w-8.5  " onChange={(e)=>setSortOption(e.target.value)}>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
        <option value="lowHigh">Low to High</option>
       <option value="highLow">High to Low</option>
       </select>
</div>

      </div>
    </section>
  );
}


