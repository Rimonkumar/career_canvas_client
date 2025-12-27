import React, { useState } from 'react';
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import DashBoardFooter from "./DashBoardFooter";
import NavBar from "../Shared/NavBar";
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            
            {/* Navbar (Fixed at Top) */}
            <div className="flex-none">
                <NavBar />
            </div>

            {/* Main Container */}
            <div className="flex flex-1 overflow-hidden relative">
                
                {/* Mobile Sidebar Overlay */}
                <div className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${isSidebarOpen ? "bg-black/50 opacity-100" : "pointer-events-none opacity-0"}`} 
                     onClick={() => setIsSidebarOpen(false)} 
                />

                {/* Sidebar (Fixed on Left) */}
                <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:block border-r border-gray-100 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <SideBar setIsSidebarOpen={setIsSidebarOpen} />
                </aside>

                {/* ২. Content Area (এটি স্ক্রল হবে) */}
                <div className="flex-1 flex flex-col bg-[#F5F7FC] overflow-y-auto">
                    <main className="flex-grow p-4 md:p-10">
                        {!isSidebarOpen && (
                            <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg mb-6 hover:bg-blue-100 transition-colors"
                            >
                                <Menu size={20} />
                                <span className="font-medium text-sm">Menu</span>
                            </button>
                        )}

                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    </main>
                    
                    {/* Footer - Content এর শেষে থাকবে */}
                    <DashBoardFooter />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;