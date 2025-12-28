import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router';

const MyPostedJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Fetch jobs posted by this specific HR/User
        fetch(`http://localhost:3000/jobs?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setJobs(data));
    }, [user?.email]);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">My Posted Jobs: {jobs.length}</h2>
            
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Job Title</th>
                            <th>Deadline</th>
                            <th>Applications</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job._id} className="hover:bg-gray-50">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={job.company_logo} alt="Company Logo" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{job.title}</div>
                                            <div className="text-sm opacity-50 flex items-center gap-1">
                                                <MapPin size={12} /> {job.location}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="flex items-center gap-1 font-medium">
                                        <Calendar size={14} /> {job.applicationDeadline}
                                    </span>
                                </td>
                                <td>
                                    <div className="badge badge-secondary badge-outline">
                                        {job.applicationCount || 0} Applied
                                    </div>
                                </td>
                                <th>
                                    <Link to={`/dashboard/myPostedJobs/${job._id}`} className="btn btn-ghost btn-xs text-blue-600">View Details</Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;