import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router';
import useApplicationApi from '../../../Hooks/useApplicationApi';

const MyPostedJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const { myPostedJobsPromise } = useApplicationApi();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            myPostedJobsPromise(user.email)
                .then(data => {
                    setJobs(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error loading jobs:", err);
                    setLoading(false);
                });
        }
    }, [user?.email, myPostedJobsPromise]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">My Posted Jobs: {jobs.length}</h2>
            
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-700">
                            <th className="py-4">Job Title</th>
                            <th>Deadline</th>
                            <th>Category</th>
                            <th>Total Application</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job._id} className="hover:bg-blue-50/50 transition-colors">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">

                                            <div className="mask mask-squircle w-12 h-12">

                                                <img src={job.company_logo} alt="Company Logo" />

                                            </div>

                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800">{job.title}</div>
                                            <div className="text-xs opacity-60 flex items-center gap-1">
                                                <MapPin size={12} /> {job.location}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="flex items-center gap-1.5 text-sm">
                                        <Calendar size={14} className="text-gray-400" /> 
                                        {job.applicationDeadline}
                                    </span>
                                </td>
                                <td>
                                    <div className="badge badge-ghost badge-sm font-medium">
                                        {job.category}
                                    </div>
                                </td>
                                <td className="font-semibold">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Users size={16} />
                                        {/* Use the count from the backend aggregation */}
                                        <span>{job.applicationCount || 0} Applied</span>
                                    </div>
                                </td>
                                <th className="text-center">
                                     <Link to={`/dashboard/myPostedJobs/${job._id}`} className="btn btn-primary btn-sm rounded-lg">View Details</Link>
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