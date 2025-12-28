import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import {
    LayoutDashboard, UserCircle, FilePlus, Briefcase,
    Users, Lock, LogOut, Trash2, X
} from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const SideBar = ({ setIsSidebarOpen }) => {
    const { logOut, deleteCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                setIsSidebarOpen(false);
                navigate('/signin');
            })
            .catch(error => console.error(error));
    };

    const handleDeleteProfile = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action is permanent. Your account will be deleted forever!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete my account"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCurrentUser()
                    .then(() => {
                        Swal.fire(
                            "Deleted!",
                            "Your account has been deleted successfully.",
                            "success"
                        );
                        setIsSidebarOpen(false);
                        navigate('/register');
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Re-authentication Required",
                            text: "For security reasons, please logout and login again before deleting your account.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
        { name: 'Company Profile', icon: <UserCircle size={18} />, path: '/dashboard/profile' },
        { name: 'Post A New Job', icon: <FilePlus size={18} />, path: '/dashboard/postjob' },
        { name: 'Manage Jobs', icon: <Briefcase size={18} />, path: '/dashboard/managejobs' },
        { name: 'My Application', icon: <Users size={18} />, path: '/dashboard/applicants' },
        { name: 'Change Password', icon: <Lock size={18} />, path: '/dashboard/password' },
    ];

    return (
        <nav className="h-full py-6 px-4 flex flex-col justify-between">
            <div>
                {/* Mobile Close Button */}
                <div className="flex justify-end lg:hidden mb-4">
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Sidebar Navigation Links */}
                <ul className="space-y-1 overflow-y-auto">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] transition-all ${isActive
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

            {/* Bottom Actions: Logout & Delete */}
            <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] text-red-500 hover:bg-red-50 w-full transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>

                <button
                    onClick={handleDeleteProfile}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] text-gray-500 hover:bg-red-50 hover:text-red-600 w-full transition-all mt-1"
                >
                    <Trash2 size={18} />
                    Delete Profile
                </button>
            </div>
        </nav>
    );
};

export default SideBar;