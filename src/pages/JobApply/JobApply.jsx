import React from 'react';
import { useParams, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios'; 
import { Github, Linkedin, FileText, User, Mail } from 'lucide-react';

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
            linkedin: form.linkedin.value,
            github: form.github.value,
            resume: form.resume.value,
            appliedDate: new Date().toLocaleDateString()
        };

        axios.post('http://localhost:3000/jobapplications', applicationData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Application Sent!',
                        text: 'Your profile has been shared with the employer.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/dashboard/applicants');
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
        <div className="min-h-80 pt-10 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-gray-100">

                {/* Left Side: Info Box */}
                <div className="md:w-1/3 bg-[#1967D2] p-8 text-white flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Apply Now</h2>
                    <p className="text-blue-100 mb-6 italic">"Opportunity dances with those already on the dance floor."</p>
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                            <User size={18} /> <span>Verified Profile</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} /> <span>Direct HR Contact</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-2/3 p-8 md:p-12">
                    <form onSubmit={handleApplyJob} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-400">Your Name</label>
                                <div className="relative">
                                    <input type="text" defaultValue={user?.displayName} readOnly
                                        className="input input-bordered w-full pl-10 bg-gray-50 focus:outline-none" />
                                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-400">Email Address</label>
                                <div className="relative">
                                    <input type="email" defaultValue={user?.email} readOnly
                                        className="input input-bordered w-full pl-10 bg-gray-50 focus:outline-none" />
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase text-gray-500">LinkedIn Profile URL</label>
                            <div className="relative">
                                <input type="url" name="linkedin" placeholder="https://linkedin.com/in/..."
                                    className="input input-bordered w-full pl-10 focus:border-blue-500" required />
                                <Linkedin className="absolute left-3 top-3 text-blue-600" size={18} />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase text-gray-500">GitHub Portfolio URL</label>
                            <div className="relative">
                                <input type="url" name="github" placeholder="https://github.com/..."
                                    className="input input-bordered w-full pl-10 focus:border-blue-500" required />
                                <Github className="absolute left-3 top-3 text-gray-800" size={18} />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-xs font-bold uppercase text-gray-500">Resume Drive Link</label>
                            <div className="relative">
                                <input type="url" name="resume" placeholder="Google Drive/Dropbox Link"
                                    className="input input-bordered w-full pl-10 focus:border-blue-500" required />
                                <FileText className="absolute left-3 top-3 text-red-500" size={18} />
                            </div>
                        </div>

                        <button className="btn bg-[#1967D2] hover:bg-[#1554ad] text-white w-full border-none rounded-xl h-12 text-lg font-semibold shadow-lg transition-all active:scale-95">
                            Submit My Application
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApply;