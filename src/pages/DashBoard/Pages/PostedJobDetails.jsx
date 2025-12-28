import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaEnvelope, FaUserCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PostedJobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        Promise.all([
            fetch(`http://localhost:3000/jobs/${id}`).then(res => res.json()),
            fetch(`http://localhost:3000/job-applications?jobId=${id}`).then(res => res.json())
        ])
            .then(([jobData, apps]) => {
                setJob(jobData);
                setApplications(Array.isArray(apps) ? apps : []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoading(false);
            });
    }, [id]);

    const handleViewDetails = (app) => {
        // Build HTML with available fields (safe fallback if a field is missing)
        const html = `
            <div style="text-align:left;line-height:1.4">
                <p><strong>Name:</strong> ${app.applicant_name || '—'}</p>
                <p><strong>Email:</strong> ${app.applicant_email || '—'}</p>
                <p><strong>Phone:</strong> ${app.phone || '—'}</p>
                <p><strong>Applied At:</strong> ${app.appliedAt || app.createdAt || '—'}</p>
                <p><strong>Status:</strong> ${app.status || 'Pending'}</p>
                <p><strong>Education:</strong> ${app.education || '—'}</p>
                <p><strong>Experience:</strong> ${app.experience || '—'}</p>
                <p><strong>LinkedIn:</strong> ${app.linkedin ? `<a href="${app.linkedin}" target="_blank" rel="noopener noreferrer">${app.linkedin}</a>` : '—'}</p>
                <p><strong>Cover Letter:</strong><br/>${app.cover_letter || app.coverletter || '—'}</p>
                <p><strong>Resume:</strong> ${app.resume ? `<a href="${app.resume}" target="_blank" rel="noopener noreferrer">View CV</a>` : '—'}</p>
            </div>
        `;
        Swal.fire({
            title: 'Applicant Details',
            html,
            width: '600px',
            showCloseButton: true,
        });
    };

    const handleStatusUpdate = (e, appId) => {
        const newStatus = e.target.value;
        fetch(`http://localhost:3000/job-applications/${appId}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
            .then(res => res.json())
            .then(data => {
                // Update local state so status reflects immediately in UI (works whether API returns modifiedCount or updated object)
                setApplications(prev => prev.map(a => a._id === appId ? { ...a, status: newStatus } : a));
                Swal.fire({
                    icon: "success",
                    title: "Status Updated",
                    text: `Candidate is now marked as ${newStatus}`,
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch(err => {
                console.error(err);
                Swal.fire({ icon: 'error', title: 'Update failed' });
            });
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
    if (!job) return <div className="p-6 text-center text-red-500 font-bold">Job Not Found</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center gap-6">
                    <img src={job.company_logo} alt={job.company} className="w-20 h-20 object-contain rounded-lg p-2 bg-gray-50 border" />
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
                        <p className="text-blue-600 font-semibold text-lg">{job.company}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-500">
                            <span className="flex items-center gap-1"><FaMapMarkerAlt /> {job.location}</span>
                            <span className="flex items-center gap-1"><FaBriefcase /> {job.jobType}</span>
                        </div>
                    </div>
                    <Link to="/dashboard/myPostedJobs" className="btn btn-outline">Back</Link>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Job Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white p-6 rounded-xl border">
                            <h3 className="font-bold text-lg mb-2">Description</h3>
                            <p className="text-gray-600">{job.description}</p>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white p-6 rounded-xl border h-fit">
                        <h3 className="font-bold border-b pb-2 mb-4">Quick Summary</h3>
                        <div className="space-y-3 text-sm">
                            <p className="flex justify-between"><span>Total Applicants:</span> <span className="badge badge-primary">{applications.length}</span></p>
                            <p className="flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /> {job.applicationDeadline}</p>
                            <p className="flex items-center gap-2"><FaEnvelope className="text-blue-500" /> {job.hr_email}</p>
                        </div>
                    </div>
                </div>

                {/* Applicants Table */}
                <div className="mt-8 bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaUserCheck className="text-green-500" /> All Applicants
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Resume</th>
                                    <th>Details</th>
                                    <th>Update Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app, idx) => (
                                    <tr key={app._id}>
                                        <td>{idx + 1}</td>
                                        <td className="font-bold">{app.applicant_name || "Anonymous"}</td>
                                        <td>{app.applicant_email}</td>
                                        <td>
                                            <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">View CV</a>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/dashboard/review-applicant/${app._id}`}
                                                className="btn btn-primary btn-xs"
                                            >
                                                Review 
                                            </Link>
                                        </td>
                                        <td>
                                            <select
                                                value={app.status || "Pending"}
                                                onChange={(e) => handleStatusUpdate(e, app._id)}
                                                className="select select-bordered select-xs w-full max-w-xs"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Under Review">Under Review</option>
                                                <option value="Interview">Interview</option>
                                                <option value="Hired">Hired</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostedJobDetails;