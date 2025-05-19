
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { User, Package, Heart, LogOut, Settings, CreditCard, Home } from 'lucide-react';

const Profile: React.FC = () => {
  // Mock user data - in a real app, this would come from context or API
  const userData = {
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    joinDate: "January 2025",
    avatar: "/lovable-uploads/61c4de73-1a6f-4d20-94af-949fcba84ca2.png"
  };
  
  // Mock order data
  const orders = [
    {
      id: "ORD-8765432",
      date: "May 15, 2025",
      status: "Delivered",
      total: 8597,
      items: 3
    },
    {
      id: "ORD-7654321",
      date: "April 23, 2025",
      status: "Processing",
      total: 4299,
      items: 1
    }
  ];
  
  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="md:w-1/4">
                <div className="bg-perfume-darkBrown rounded-lg p-6 flex flex-col items-center mb-8">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-perfume-pink mb-4">
                    <img 
                      src={userData.avatar} 
                      alt={userData.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-medium mb-1">{userData.name}</h2>
                  <p className="text-gray-400 text-sm mb-4">{userData.email}</p>
                  <p className="text-sm text-gray-300">Member since {userData.joinDate}</p>
                  <Button variant="outline" className="mt-4 w-full">
                    Edit Profile
                  </Button>
                </div>
                
                <div className="bg-perfume-darkBrown rounded-lg overflow-hidden">
                  <ul className="divide-y divide-gray-800">
                    <li>
                      <Link to="/account" className="flex items-center px-6 py-4 hover:bg-black/20 transition-colors">
                        <User className="mr-3 text-perfume-pink" size={18} />
                        <span>My Account</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/account/orders" className="flex items-center px-6 py-4 hover:bg-black/20 transition-colors">
                        <Package className="mr-3 text-perfume-pink" size={18} />
                        <span>My Orders</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/wishlist" className="flex items-center px-6 py-4 hover:bg-black/20 transition-colors">
                        <Heart className="mr-3 text-perfume-pink" size={18} />
                        <span>Wishlist</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/account/addresses" className="flex items-center px-6 py-4 hover:bg-black/20 transition-colors">
                        <Home className="mr-3 text-perfume-pink" size={18} />
                        <span>Addresses</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/account/payment" className="flex items-center px-6 py-4 hover:bg-black/20 transition-colors">
                        <CreditCard className="mr-3 text-perfume-pink" size={18} />
                        <span>Payment Methods</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/account/settings" className="flex items-center px-6 py-4 hover:bg-black/20 transition-colors">
                        <Settings className="mr-3 text-perfume-pink" size={18} />
                        <span>Account Settings</span>
                      </Link>
                    </li>
                    <li>
                      <button className="w-full flex items-center px-6 py-4 hover:bg-black/20 transition-colors text-left">
                        <LogOut className="mr-3 text-perfume-pink" size={18} />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="bg-perfume-darkBrown rounded-lg p-6">
                  <Tabs defaultValue="dashboard">
                    <TabsList className="mb-8">
                      <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                      <TabsTrigger value="orders">Orders</TabsTrigger>
                      <TabsTrigger value="addresses">Addresses</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="dashboard" className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-black/20 rounded-lg p-4">
                          <h4 className="text-gray-400 mb-1">Total Orders</h4>
                          <p className="text-3xl font-medium">2</p>
                        </div>
                        <div className="bg-black/20 rounded-lg p-4">
                          <h4 className="text-gray-400 mb-1">Wishlist Items</h4>
                          <p className="text-3xl font-medium">5</p>
                        </div>
                        <div className="bg-black/20 rounded-lg p-4">
                          <h4 className="text-gray-400 mb-1">Pending Reviews</h4>
                          <p className="text-3xl font-medium">1</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-medium mb-4">Recent Orders</h3>
                        <div className="bg-black/20 rounded-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Order ID</th>
                                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Date</th>
                                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Total</th>
                                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-400">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map((order) => (
                                  <tr key={order.id} className="border-b border-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                      }`}>
                                        {order.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">₹{order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                      <Link to={`/order/${order.id}`} className="text-perfume-pink hover:text-white">
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-medium mb-4">Recently Viewed</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-black/20 rounded-lg p-4 flex items-center space-x-4">
                            <div className="h-16 w-16 flex-shrink-0">
                              <img src="/lovable-uploads/5778a9ee-c12b-4abf-95a1-60a4759e0426.png" alt="Black Rose" className="h-full w-full object-cover rounded" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Black Rose</h4>
                              <p className="text-xs text-gray-400">Eau de Parfum</p>
                              <p className="text-sm mt-1">₹5,999</p>
                            </div>
                          </div>
                          <div className="bg-black/20 rounded-lg p-4 flex items-center space-x-4">
                            <div className="h-16 w-16 flex-shrink-0">
                              <img src="/lovable-uploads/2191ab81-b1c5-4781-aab4-99ffaf38ecd1.png" alt="Emerald Essence" className="h-full w-full object-cover rounded" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Emerald Essence</h4>
                              <p className="text-xs text-gray-400">Eau de Parfum</p>
                              <p className="text-sm mt-1">₹4,599</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="orders">
                      <h3 className="text-xl font-medium mb-4">Your Orders</h3>
                      <div className="bg-black/20 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead>
                              <tr className="border-b border-gray-800">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Order ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Items</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Total</th>
                                <th className="px-6 py-3 text-right text-sm font-medium text-gray-400">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-800">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.id}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.date}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                      {order.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">{order.items}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">₹{order.total.toLocaleString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <Link to={`/order/${order.id}`} className="text-perfume-pink hover:text-white">
                                      View Details
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="addresses">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-medium">Your Addresses</h3>
                        <Button size="sm">Add New Address</Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/20 rounded-lg p-6">
                          <div className="flex justify-between mb-4">
                            <span className="bg-perfume-pink/20 text-perfume-pink px-2 py-1 rounded text-xs">Default</span>
                            <div className="space-x-2">
                              <button className="text-sm text-gray-300 hover:text-white">Edit</button>
                              <button className="text-sm text-gray-300 hover:text-white">Delete</button>
                            </div>
                          </div>
                          <h4 className="font-medium mb-2">Home</h4>
                          <p className="text-sm text-gray-300">Rahul Sharma</p>
                          <p className="text-sm text-gray-300">42, Sunrise Apartments</p>
                          <p className="text-sm text-gray-300">Bandra West, Mumbai</p>
                          <p className="text-sm text-gray-300">Maharashtra, 400050</p>
                          <p className="text-sm text-gray-300 mt-2">+91 98765 43210</p>
                        </div>
                        
                        <div className="bg-black/20 rounded-lg p-6">
                          <div className="flex justify-between mb-4">
                            <span>&nbsp;</span>
                            <div className="space-x-2">
                              <button className="text-sm text-gray-300 hover:text-white">Edit</button>
                              <button className="text-sm text-gray-300 hover:text-white">Delete</button>
                            </div>
                          </div>
                          <h4 className="font-medium mb-2">Office</h4>
                          <p className="text-sm text-gray-300">Rahul Sharma</p>
                          <p className="text-sm text-gray-300">TechPark, Building 4, Floor 7</p>
                          <p className="text-sm text-gray-300">Andheri East, Mumbai</p>
                          <p className="text-sm text-gray-300">Maharashtra, 400069</p>
                          <p className="text-sm text-gray-300 mt-2">+91 98765 43210</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="settings">
                      <h3 className="text-xl font-medium mb-6">Account Settings</h3>
                      
                      <div className="space-y-6">
                        <div className="bg-black/20 rounded-lg p-6">
                          <h4 className="text-lg font-medium mb-4">Personal Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-gray-400 mb-1">First Name</label>
                              <input 
                                type="text" 
                                value="Rahul" 
                                className="w-full bg-perfume-darkBrown border border-gray-800 rounded-md py-2 px-3"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                              <input 
                                type="text" 
                                value="Sharma" 
                                className="w-full bg-perfume-darkBrown border border-gray-800 rounded-md py-2 px-3"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-400 mb-1">Email</label>
                              <input 
                                type="email" 
                                value="rahul.sharma@gmail.com" 
                                className="w-full bg-perfume-darkBrown border border-gray-800 rounded-md py-2 px-3"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-400 mb-1">Phone</label>
                              <input 
                                type="tel" 
                                value="+91 98765 43210" 
                                className="w-full bg-perfume-darkBrown border border-gray-800 rounded-md py-2 px-3"
                                readOnly
                              />
                            </div>
                          </div>
                          <Button className="mt-4">Edit Information</Button>
                        </div>
                        
                        <div className="bg-black/20 rounded-lg p-6">
                          <h4 className="text-lg font-medium mb-4">Password</h4>
                          <Button>Change Password</Button>
                        </div>
                        
                        <div className="bg-black/20 rounded-lg p-6">
                          <h4 className="text-lg font-medium mb-4">Notifications</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-400">Receive updates about your orders and new products</p>
                              </div>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-perfume-darkBrown">
                                <input type="checkbox" id="toggle1" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-perfume-pink transition-transform duration-200 transform translate-x-6"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">SMS Notifications</p>
                                <p className="text-sm text-gray-400">Receive SMS updates about your orders</p>
                              </div>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-perfume-darkBrown">
                                <input type="checkbox" id="toggle2" className="sr-only" />
                                <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-gray-600 transition-transform duration-200 transform"></span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Marketing Communications</p>
                                <p className="text-sm text-gray-400">Receive promotions, discounts, and newsletter</p>
                              </div>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-perfume-darkBrown">
                                <input type="checkbox" id="toggle3" className="sr-only" defaultChecked />
                                <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-perfume-pink transition-transform duration-200 transform translate-x-6"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
