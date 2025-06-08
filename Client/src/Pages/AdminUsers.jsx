import React from "react";
import AdminSidebar from "../Components/AdminSidebar";

const AdminUsers = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
        {/* Example table - replace with real data */}
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Role</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">Admin User</td>
              <td className="py-2 px-4">admin@example.com</td>
              <td className="py-2 px-4">Admin</td>
              <td className="py-2 px-4">
                <button className="text-green-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline ml-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminUsers;