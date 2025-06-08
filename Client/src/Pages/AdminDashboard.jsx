import React from "react";
import AdminSidebar from "../Components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Products</h2>
            <p>Manage products in the marketplace.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Users</h2>
            <p>Manage users and their roles.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Analytics</h2>
            <p>View marketplace analytics.</p>
          </div>
        </div>
        {/* Example: Placeholder content */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace below with mapped products */}
              <tr>
                <td className="py-2">Sample Product</td>
                <td className="py-2">Vegetables</td>
                <td className="py-2">₹100</td>
                <td className="py-2">
                  <button className="text-green-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline ml-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;