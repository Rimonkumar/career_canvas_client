import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';

const AllApplicants = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/job-applications?email=${user.email}`,{ withCredentials: true })
                .then(res => {
                    setApplications(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching applications:", err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Applications</h2>
                <div className="badge badge-primary p-4 gap-2">
                    Total: {applications.length}
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-4">#</th>
                            <th>Company & Position</th>
                            <th>Location</th>
                            <th>Applied Date</th>
                            <th>Job Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((app, index) => (
                                <tr key={app._id} className="hover:bg-blue-50/30 transition-colors border-b border-gray-50">
                                    <th className="text-gray-400 font-medium">{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12 bg-gray-100 p-1">
                                                    <img 
                                                        src={app.jobDetails?.company_logo || 'https://via.placeholder.com/150'} 
                                                        alt="Logo" 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{app.jobDetails?.title}</div>
                                                <div className="text-xs text-gray-500">{app.jobDetails?.company}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm text-gray-600">{app.jobDetails?.location}</div>
                                    </td>
                                    <td className="text-sm text-gray-500">
                                        {app.appliedDate || 'Not specified'}
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm text-blue-600 font-semibold bg-blue-50 border-none px-3">
                                            {app.jobDetails?.jobType}
                                        </span>
                                    </td>
                                    <td>
                                        <a 
                                            href={app.resume} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="btn btn-ghost btn-xs text-[#1967D2] font-bold hover:bg-blue-100"
                                        >
                                            View My Resume
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-20 text-gray-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-lg">No applications found.</p>
                                        <p className="text-sm">Start applying to see them here!</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllApplicants;