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
    <div className="flex justify-center gap-10 py-2 bg-white/90 shadow rounded-lg mb-5">
      {categories.map((cat) => (
        <button
          key={cat.name}
          className="flex flex-col items-center focus:outline-none group transition text-gray-700 hover:text-green-700"
          onClick={() => navigate(`/category/${cat.name}`)}
        >
          <div className="w-14 h-14 flex items-center justify-center mb-1 overflow-hidden">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-12 h-12 object-cover rounded-md"
              draggable={false}
            />
          </div>
          <span className="font-bold text-sm tracking-wide">{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;