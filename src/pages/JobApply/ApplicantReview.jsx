import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaArrowLeft, FaDownload, FaLinkedin, FaGithub, FaPhone, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ApplicantReview = () => {
    const { id } = useParams(); // Application ID
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/job-applications/${id}`,{
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setApplication(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleStatusUpdate = (newStatus) => {
        fetch(`http://localhost:3000/job-applications/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
        .then(res => res.json())
        .then(data => {
            // Note: MongoDB usually returns modifiedCount. Check your backend response!
            if (data.modifiedCount > 0 || data.acknowledged) {
                setApplication({ ...application, status: newStatus });
                Swal.fire({
                    icon: "success",
                    title: "Status Updated",
                    text: `Candidate status is now ${newStatus}`,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (!application) return <div className="text-center py-20 text-red-500 font-bold">Application data not found.</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white shadow-2xl rounded-3xl my-10 border border-gray-100">
            {/* Header / Navigation */}
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate(-1)} className="btn btn-ghost hover:bg-gray-100 gap-2 rounded-xl">
                    <FaArrowLeft /> Back to Applications
                </button>
                <div className="text-right text-sm text-gray-400">
                    <p className="flex items-center gap-1 justify-end"><FaCalendarAlt /> Applied on: {application.appliedDate || "N/A"}</p>
                </div>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 border border-blue-100 mb-8">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black text-gray-800">{application.applicant_name}</h2>
                    <p className="text-blue-600 font-medium text-lg mb-2">{application.applicant_email}</p>
                    <div className={`badge p-3 font-bold border-none ${
                        application.status === 'Hired' ? 'bg-green-100 text-green-700' : 
                        application.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                        Status: {application.status || 'Pending'}
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 w-full md:w-auto">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Change Candidate Status</p>
                    <select 
                        value={application.status || "Pending"}
                        onChange={(e) => handleStatusUpdate(e.target.value)}
                        className="select select-bordered select-md w-full md:w-56 focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Interview">Call for Interview</option>
                        <option value="Rejected">Reject Candidate</option>
                        <option value="Hired">Hire</option>
                    </select>
                </div>
            </div>

            {/* Information Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                
                {/* Contact & Links Column */}
                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Info</h4>
                        <div className="space-y-3">
                            <p className="flex items-center gap-3 text-gray-700 font-semibold">
                                <div className="bg-gray-100 p-2 rounded-lg text-gray-500"><FaPhone size={14}/></div>
                                {application.phone || 'No phone provided'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Professional Links</h4>
                        <div className="flex flex-col gap-3">
                            <a href={application.linkedin} target="_blank" rel="noreferrer" 
                               className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors text-blue-700 font-medium">
                                <FaLinkedin size={20} /> LinkedIn Profile
                            </a>
                            <a href={application.github} target="_blank" rel="noreferrer" 
                               className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-gray-800 font-medium">
                                <FaGithub size={20} /> GitHub Portfolio
                            </a>
                            <a href={application.resume} target="_blank" rel="noreferrer" 
                               className="flex items-center gap-3 p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors text-red-700 font-bold mt-2">
                                <FaDownload size={18} /> View PDF Resume
                            </a>
                        </div>
                    </div>
                </div>

                {/* Background & Pitch Column */}
                <div className="md:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-1"><FaGraduationCap/> Education</p>
                            <p className="text-gray-800 font-bold text-lg">{application.education || 'Not Specified'}</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-1"><FaCalendarAlt/> Experience</p>
                            <p className="text-gray-800 font-bold text-lg">{application.experience || 'Not Specified'}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                        <h4 className="text-lg font-black text-gray-800 mb-4 border-b pb-2">Cover Letter / Pitch</h4>
                        <p className="whitespace-pre-line text-gray-600 leading-relaxed italic">
                            {application.cover_letter ? `"${application.cover_letter}"` : "The candidate did not provide a cover letter."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicantReview;