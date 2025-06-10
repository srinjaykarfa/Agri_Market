import React from 'react';
import { useNavigate } from 'react-router-dom';
import guava from '../assets/guava.webp';
import carrot from '../assets/carrot.webp';
import rice from '../assets/rice.webp';

const categories = [
  { name: 'Fruits', image: guava },
  { name: 'Vegetables', image: carrot },
  { name: 'Grains', image: rice },
];

const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-8 py-4 bg-white shadow rounded mb-6">
      {categories.map((cat) => (
        <button
          key={cat.name}
          className="flex flex-col items-center focus:outline-none transition text-gray-700 hover:text-green-700"
          onClick={() => navigate(`/category/${cat.name}`)}
        >
          <img src={cat.image} alt={cat.name} className="w-14 h-14 object-contain mb-2" />
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;