import React from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/analytics", label: "Analytics" }
];

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-64 bg-white shadow-lg h-screen p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`block px-2 py-2 rounded transition ${
                  location.pathname === link.to
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;