import React from "react";
import AdminSidebar from "../Components/AdminSidebar";

const AdminAnalytics = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Example cards - replace with real analytics */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
            <p>₹0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p>0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Products</h2>
            <p>0</p>
          </div>
        </div>
        {/* Add more analytics charts here */}
      </main>
    </div>
  );
};

export default AdminAnalytics;