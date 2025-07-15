"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import { motion } from "framer-motion";
import { FaUsers, FaSearch, FaEdit, FaTrash, FaUserShield, FaUser } from "react-icons/fa";
import axios from "axios";

export default function AdminUsersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const sidebarWidth = 240;
  const navbarHeight = 64;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`http://localhost:5000/admin/users?page=${currentPage}&limit=10&search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
        setTotalUsers(response.data.total);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/admin/users/${editingUser._id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShowEditModal(false);
      setEditingUser(null);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#181C2A] via-[#232946] to-[#0B0F1C]">
      <AdminNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 relative">
        <AdminSidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} style={{ top: navbarHeight, height: `calc(100vh - ${navbarHeight}px)` }} />
        <main
          className="flex-1 transition-all duration-300 px-6 pt-20"
          style={{ marginLeft: isSidebarOpen ? sidebarWidth : 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold md:font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#A259FF] mb-4 drop-shadow-md tracking-tight font-sans">
              User Management
            </h1>
            <p className="text-gray-400">Manage all registered users in the system</p>
          </motion.div>

          {/* Search and Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#232946]/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
              />
            </div>
            <div className="text-white">
              <span className="text-gray-400">Total Users: </span>
              <span className="font-semibold text-[#3B82F6]">{totalUsers}</span>
            </div>
          </motion.div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#232946]/50 border border-white/10 rounded-xl overflow-hidden shadow-xl"
          >
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B82F6]"></div>
                <p className="text-gray-400 mt-2">Loading users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#181C2A]/80 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {users.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="hover:bg-[#181C2A]/30 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center">
                                <FaUser className="text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isAdmin 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.isAdmin ? (
                              <>
                                <FaUserShield className="mr-1" />
                                Admin
                              </>
                            ) : (
                              <>
                                <FaUser className="mr-1" />
                                User
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal(user)}
                              className="text-[#3B82F6] hover:text-[#6366F1] transition-colors duration-200"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex justify-center"
            >
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#232946]/50 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#181C2A]/50 transition-colors duration-200"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#232946]/50 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#181C2A]/50 transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#232946] border border-white/10 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Edit User</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateUser({
                name: formData.get('name'),
                email: formData.get('email'),
                isAdmin: formData.get('isAdmin') === 'true'
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingUser.name}
                    className="w-full px-3 py-2 bg-[#181C2A]/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingUser.email}
                    className="w-full px-3 py-2 bg-[#181C2A]/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    name="isAdmin"
                    defaultValue={editingUser.isAdmin.toString()}
                    className="w-full px-3 py-2 bg-[#181C2A]/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option value="false">User</option>
                    <option value="true">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-lg transition-colors duration-200"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 