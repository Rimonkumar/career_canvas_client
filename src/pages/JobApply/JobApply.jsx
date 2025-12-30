import React from 'react';
import { useParams, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios'; 
import { Github, Linkedin, FileText, User, Mail, Phone, GraduationCap, Briefcase, MessageSquare } from 'lucide-react';

const JobApply = () => {
    const { id: job_id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleApplyJob = e => {
        e.preventDefault();
        const form = e.target;

        const applicationData = {
            job_id,
            applicant_name: user?.displayName,
            applicant_email: user?.email,
            phone: form.phone.value, // Added
            linkedin: form.linkedin.value,
            github: form.github.value,
            resume: form.resume.value,
            education: form.education.value, // Added
            experience: form.experience.value, // Added
            cover_letter: form.cover_letter.value, // Added
            status: 'Pending', // Default status
            appliedDate: new Date().toLocaleDateString()
        };

        axios.post('http://localhost:3000/job-applications', applicationData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Application Sent!',
                        text: 'Your profile has been shared with the employer.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/dashboard/applicants'); // Redirect to user's apps
                }
            })
            .catch(error => { 
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });
    };

    return (
        <div className="min-h-screen py-10 flex items-center justify-center p-4 bg-gray-50">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row border border-gray-100">

                {/* Left Side: Info Box */}
                <div className="md:w-1/4 bg-[#1967D2] p-8 text-white flex flex-col justify-start">
                    <h2 className="text-3xl font-bold mb-4">Join Us</h2>
                    <p className="text-blue-100 mb-6 italic text-sm">"Your career journey starts with a single click."</p>
                    <div className="space-y-6 text-sm mt-10">
                        <div className="flex items-center gap-3"><User size={20} /> <span>Personal Info</span></div>
                        <div className="flex items-center gap-3"><Briefcase size={20} /> <span>Experience</span></div>
                        <div className="flex items-center gap-3"><FileText size={20} /> <span>Documents</span></div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-3/4 p-8 md:p-12">
                    <form onSubmit={handleApplyJob} className="space-y-5">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Application Form</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Name & Email (Read Only) */}
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-500">FULL NAME</label>
                                <input type="text" defaultValue={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-500">EMAIL</label>
                                <input type="email" defaultValue={user?.email} readOnly className="input input-bordered bg-gray-100" />
                            </div>

                            {/* Phone & LinkedIn */}
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-500">PHONE NUMBER</label>
                                <div className="relative">
                                    <input type="text" name="phone" placeholder="+880..." className="input input-bordered w-full pl-10" required />
                                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-500">LINKEDIN URL</label>
                                <div className="relative">
                                    <input type="url" name="linkedin" placeholder="linkedin.com/in/username" className="input input-bordered w-full pl-10" required />
                                    <Linkedin className="absolute left-3 top-3 text-blue-600" size={18} />
                                </div>
                            </div>

                            {/* Education & Experience */}
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-500">HIGHEST EDUCATION</label>
                                <div className="relative">
                                    <input type="text" name="education" placeholder="e.g. B.Sc in CSE" className="input input-bordered w-full pl-10" required />
                                    <GraduationCap className="absolute left-3 top-3 text-gray-400" size={18} />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-500">YEARS OF EXPERIENCE</label>
                                <div className="relative">
                                    <input type="text" name="experience" placeholder="e.g. 2 Years" className="input input-bordered w-full pl-10" required />
                                    <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Resume & GitHub */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-500">RESUME LINK (DRIVE/PDF)</label>
                                <div className="relative">
                                    <input type="url" name="resume" placeholder="Link to your CV" className="input input-bordered w-full pl-10 border-blue-200" required />
                                    <FileText className="absolute left-3 top-3 text-red-500" size={18} />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-500">GITHUB PORTFOLIO</label>
                                <div className="relative">
                                    <input type="url" name="github" placeholder="github.com/username" className="input input-bordered w-full pl-10" required />
                                    <Github className="absolute left-3 top-3 text-gray-800" size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Cover Letter */}
                        <div className="form-control">
                            <label className="label text-xs font-bold text-gray-500">COVER LETTER / MESSAGE</label>
                            <div className="relative">
                                <textarea name="cover_letter" className="textarea textarea-bordered w-full pl-10 h-32" placeholder="Why should we hire you?" required></textarea>
                                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                            </div>
                        </div>

                        <button className="btn bg-[#1967D2] hover:bg-[#1554ad] text-white w-full border-none rounded-xl h-14 text-lg font-bold shadow-lg transition-all active:scale-95">
                            Submit My Application
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApply;