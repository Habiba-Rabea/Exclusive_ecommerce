import { useContext, useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { productsData } from '../../data/productsData.js';
import Breadcrumb from '../../Components/Common/Breadcrumb.jsx';
import CategoryHeader from '../../Components/Category/CategoryHeader.jsx';
import CategorySearchBar from '../../Components/Category/CategorySearchBar.jsx';
import ProductCardCategory from '../../Components/Category/ProductCardCategory.jsx';
import '../../CSS/Tailwind.css';
import '../../CSS/CategoryProducts.css';
import { CategoryProductsContext } from '../../Context/CategoryProductsContext.jsx';

const categoryMeta = {
  phones: {
    title: 'PHONES',
    description: 'Modern essentials, selected for the way you live.',
  },
  computers: {
    title: 'COMPUTERS',
    description: 'Powerful tools for work, creativity, and play.',
  },
  smartwatch: {
    title: 'SMARTWATCH',
    description: 'Stay connected, active, and in control.',
  },
  camera: {
    title: 'CAMERA',
    description: 'Capture every moment with confidence.',
  },
  headphones: {
    title: 'HEADPHONES',
    description: 'Immersive sound for every part of your day.',
  },
  gaming: {
    title: 'GAMING',
    description: 'Level up your setup and your experience.',
  },
};

const categoryLinks = [
  ['phones', 'Phones'],
  ['computers', 'Computers'],
  ['smartwatch', 'Smartwatch'],
  ['camera', 'Camera'],
  ['headphones', 'Headphones'],
  ['gaming', 'Gaming'],
];

export default function Category() {
  let {query,sortOption} = useContext(CategoryProductsContext);
  const { categorySlug } = useParams();
  const selectedCategory = categorySlug?.toLowerCase();
  const meta = selectedCategory ? categoryMeta[selectedCategory] : null;

  const products = useMemo(
    () => (selectedCategory
      ? productsData.filter((product) => product.category === selectedCategory)
      : productsData),
    [selectedCategory],
  );

  const visibleProducts = useMemo(()=>{
   const filtered = products.filter((item)=>{
    return item.name.toLowerCase().includes(query.toLowerCase().trim())
   })
   return [...filtered].sort((a,b)=>{
    switch(sortOption){
      case "az" : return a.name.localeCompare(b.name);
      case "za" : return b.name.localeCompare(a.name);
      case "lowHigh" : return a.price - b.price;
      case "highLow" : return b.price - a.price;
    }
   })
   
  },[query,sortOption, products]);


  

  if (selectedCategory && !meta) {
    return (
      <main className="category-page category-page--empty">
        <h1>Category not found</h1>
        <p>Please choose one of the available product categories.</p>
      </main>
    );
  }



  return (
    <main className="category-page">
      <Breadcrumb
        items={[
          { name: 'Home', link: '/' },
          { name: 'Products', link: '/products' },
          ...(meta ? [{ name: meta.title }] : []),
        ]}
      />
      <nav className="category-navigation" aria-label="Product categories">
        <NavLink to="/products" end className={({ isActive }) => `category-navigation-link${isActive ? ' active' : ''}`}>
          Products
        </NavLink>
        {categoryLinks.map(([slug, label]) => (
          <NavLink
            key={slug}
            to={`/category/${slug}`}
            className={({ isActive }) => `category-navigation-link${isActive ? ' active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <CategoryHeader
        title={meta?.title || 'ALL PRODUCTS'}
        description={meta?.description || 'Explore our complete collection of selected essentials.'}
        productCount={visibleProducts.length}
      />
      <CategorySearchBar productCount={visibleProducts.length} />
      <section className="category-products-grid" aria-label={`${meta?.title || 'All'} products`}>
        {visibleProducts.map((product) => (
          <ProductCardCategory key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

