import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';

const NavBar = () => {
    // FIX: Use AuthContext here
    const { user, logOut } = useContext(AuthContext); 

    const Links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/jobs">Find Jobs</NavLink></li>
        <li><NavLink to="/employers">Employers</NavLink></li>
        <li><NavLink to="/candidates">Candidates</NavLink></li>
        <li><NavLink to="/blog">Blog</NavLink></li>
    </>;

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {Links}
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-xl">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    </div>
                    <span className="text-xl font-bold font-sans tracking-tight">RimnonBD</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    {Links}
                </ul>
            </div>

            <div className="navbar-end gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                <span className="badge badge-sm badge-primary indicator-item">1</span>
                            </div>
                        </button>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="User" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li><Link to="/my-jobs">My Job Post</Link></li>
                                <li><Link to="/application/me">My Applications</Link></li>
                                <li><button onClick={logOut}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="hidden sm:flex items-center gap-4">
                        <Link to="/upload-cv" className="text-sm font-medium text-blue-600 hover:underline">Upload your CV</Link>
                        <Link to="/register" className="btn btn-ghost text-blue-600 lowercase font-normal">Register</Link>
                        <Link to="/signin" className="btn btn-ghost text-blue-600 lowercase font-normal">SignIn</Link>
                        <Link to="/add-jobs" className="btn btn-primary text-white rounded-lg px-6">Job Post</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;