import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { 
  LayoutDashboard, UserCircle, FilePlus, Briefcase, 
  Users, Lock, LogOut, Trash2, X 
} from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';

const SideBar = ({ setIsSidebarOpen }) => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                setIsSidebarOpen(false);
                navigate('/signin'); // লগআউট হলে সাইন-ইন পেজে পাঠাবে
            })
            .catch(error => console.error(error));
    };

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18}/>, path: '/dashboard' },
        { name: 'Company Profile', icon: <UserCircle size={18}/>, path: '/dashboard/profile' },
        { name: 'Post A New Job', icon: <FilePlus size={18}/>, path: '/dashboard/postjob' },
        { name: 'Manage Jobs', icon: <Briefcase size={18}/>, path: '/dashboard/managejobs' },
        { name: 'All Applicants', icon: <Users size={18}/>, path: '/dashboard/applicants' },
        { name: 'Change Password', icon: <Lock size={18}/>, path: '/dashboard/password' },
    ];

    return (
        <nav className="h-full py-6 px-4 flex flex-col justify-between">
            <div>
                {/* Close Button for Mobile */}
                <div className="flex justify-end lg:hidden mb-4">
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                <ul className="space-y-1 overflow-y-auto">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink 
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] transition-all ${
                                        isActive 
                                        ? 'bg-[#EBF2FF] text-[#1967D2] font-medium' 
                                        : 'text-[#696969] hover:bg-gray-50 hover:text-[#1967D2]'
                                    }`
                                }
                            >
                                {item.icon}
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout and Delete Profile section at bottom */}
            <div className="mt-auto pt-4 border-t border-gray-100">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] text-red-500 hover:bg-red-50 w-full transition-all"
                >
                    <LogOut size={18}/>
                    Logout
                </button>
                
                <NavLink 
                    to="/delete"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] text-gray-500 hover:bg-gray-50 transition-all"
                >
                    <Trash2 size={18}/>
                    Delete Profile
                </NavLink>
            </div>
        </nav>
    );
};

export default SideBar;