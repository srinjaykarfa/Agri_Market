import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import ProductCard from "../Components/productcard.jsx";
import guava from "../assets/guava.webp";
import sugarcane from "../assets/sugarcane.webp";
import carrot from "../assets/carrot.webp";
import cauliflower from "../assets/cauliflower.webp";
import rice from "../assets/rice.webp";
import onion from "../assets/onion.webp";

const allProducts = [
  { title: "Guava", description: "Enjoy the crisp texture and subtly sweet flavor of our farm-fresh guavas.", price: 100, image: guava, category: "Fruits" },
  { title: "Sugarcane", description: "Fresh, high-quality sugarcane straight from the farm.", price: 200, image: sugarcane, category: "Grains" },
  { title: "Carrot", description: "A crunchy, sweet root vegetable rich in vitamin A.", price: 100, image: carrot, category: "Vegetables" },
  { title: "Cauliflower", description: "Fresh cauliflower perfect for curries and stir-fry dishes.", price: 80, image: cauliflower, category: "Vegetables" },
  { title: "Rice", description: "Organic white rice straight from the paddy fields.", price: 60, image: rice, category: "Grains" },
  { title: "Onion", description: "Red onions with great flavor, harvested locally.", price: 90, image: onion, category: "Vegetables" },
];

const sortOptions = [
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Name: A-Z", value: "nameAsc" },
  { label: "Name: Z-A", value: "nameDesc" },
];

const getCategoryProducts = (category) => {
  return allProducts.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

const getProductNames = (products) => {
  return [...new Set(products.map((product) => product.title))];
};

const CategoryPage = ({ onAddToCart }) => {
  const { categoryName } = useParams();
  const categoryProducts = getCategoryProducts(categoryName);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortBy, setSortBy] = useState("priceAsc");
  const [priceRange, setPriceRange] = useState([
    categoryProducts.length
      ? Math.min(...categoryProducts.map((p) => p.price))
      : 0,
    categoryProducts.length
      ? Math.max(...categoryProducts.map((p) => p.price))
      : 500,
  ]);

  const minPrice = categoryProducts.length
    ? Math.min(...categoryProducts.map((p) => p.price))
    : 0;
  const maxPrice = categoryProducts.length
    ? Math.max(...categoryProducts.map((p) => p.price))
    : 500;

  const handleProductCheck = (name) => {
    setSelectedProducts((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handlePriceChange = (e, idx) => {
    let val = Number(e.target.value);
    if (isNaN(val)) val = 0;
    let newRange = [...priceRange];
    newRange[idx] = val;
    setPriceRange(newRange);
  };

  const handleSortChange = (e) => setSortBy(e.target.value);

  const filteredProducts = categoryProducts
    .filter(
      (product) =>
        (selectedProducts.length === 0 ||
          selectedProducts.includes(product.title)) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "nameAsc":
          return a.title.localeCompare(b.title);
        case "nameDesc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const allProductNames = getProductNames(categoryProducts);

  return (
    <div className="flex flex-col min-h-screen bg-[#f6fbea]">
      
      <main className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Sidebar */}
        <aside className="w-full md:w-60 mb-8 md:mb-0 md:mr-8 bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="text-xl font-bold mb-4 text-green-700">{categoryName} Filters</h3>
          <div className="mb-6">
            <p className="font-medium mb-2 text-gray-700">Products</p>
            {allProductNames.map((name) => (
              <div key={name} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={name}
                  checked={selectedProducts.includes(name)}
                  onChange={() => handleProductCheck(name)}
                  className="mr-2"
                />
                <label htmlFor={name} className="text-gray-600">{name}</label>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <p className="font-medium mb-2 text-gray-700">Price Range</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={minPrice}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-16 border rounded px-2 py-1 text-sm"
              />
              <span>-</span>
              <input
                type="number"
                min={priceRange[0]}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-16 border rounded px-2 py-1 text-sm"
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Min: {minPrice} | Max: {maxPrice}
            </div>
          </div>
          <div>
            <p className="font-medium mb-2 text-gray-700">Sort By</p>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full border rounded px-2 py-1 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </aside>
        {/* Product Grid */}
        <section className="flex-1">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            {categoryName} Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div key={index} className="w-full flex">
                  <ProductCard
                    {...product}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-600 text-lg">
                No products found in this category.
              </div>
            )}
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default CategoryPage;