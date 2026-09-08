import { ArrowDownUp, Search, SlidersHorizontal } from 'lucide-react';

export default function CategorySearchBar({ productCount }) {
  return (
    <div className="category-search-bar">
      <label className="category-search-input">
        <Search size={19} aria-hidden="true" />
        <input type="search" placeholder="Search product by name..." aria-label="Search products" />
      </label>
      <div className="category-toolbar">
        <span className="category-result-count"><i /> Showing {productCount} products</span>
        <span className="category-sort"><ArrowDownUp size={16} /> Sort by: <b>Best Match</b><span className="sort-chevron">⌄</span></span>
        <button type="button" className="category-filter-button"><SlidersHorizontal size={17} /> Filters</button>
      </div>
    </div>
  );
}


