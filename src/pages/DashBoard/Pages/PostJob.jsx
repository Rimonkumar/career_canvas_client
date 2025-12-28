import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { Briefcase, MapPin, DollarSign, Image as ImageIcon, FileText, ListChecks, UserCheck } from 'lucide-react';
import { AuthContext } from '../../../provider/AuthProvider';
import { Link } from 'react-router';

const PostJob = () => {
    const { user } = useContext(AuthContext);

    const handlePostJob = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());

        const jobData = {
            title: initialData.title,
            location: initialData.location,
            company: initialData.company,
            company_logo: initialData.company_logo,
            description: initialData.description,
            jobType: initialData.jobType,
            category: initialData.category,
            applicationDeadline: initialData.applicationDeadline,
            hr_email: user?.email,
            hr_name: user?.displayName,
            status: "active",
            salaryRange: {
                min: parseInt(initialData.min),
                max: parseInt(initialData.max),
                currency: initialData.currency
            },
            requirements: initialData.requirements.split(',').map(req => req.trim()),
            responsibilities: initialData.responsibilities.split(',').map(res => res.trim()),
        };
        console.log(jobData);

        fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(jobData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Job Posted!',
                        text: 'Your job listing is now live.',
                        icon: 'success',
                        confirmButtonColor: '#1967D2'
                    });
                    e.target.reset();
                }
            });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Post a New Job</h1>
                    <p className="text-gray-500">Fill in the details to find the best talent.</p>
                </div>
                <div>
                    <Link to="/dashboard/myPostedJobs" className="btn btn-outline btn-primary">
                        View My Posted Jobs
                    </Link>
                </div>
            </div>

            <form onSubmit={handlePostJob} className="space-y-8">
                {/* Basic Information */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-50">
                        <Briefcase className="text-blue-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-700">Job Information</h2>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Job Title</label><br />
                            <input name="title" type="text" placeholder="e.g. Senior React Developer" className="input input-bordered bg-gray-50 focus:border-blue-500" required />
                        </div>

                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Job Category</label>
                            <select name="category" className="select select-bordered bg-gray-50" required>
                                <option disabled selected>Select Category</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Design">Design</option>
                                <option value="Management">Management</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Job Type</label><br />
                            <select name="jobType" className="select select-bordered bg-gray-50" required>
                                <option value="Full-time">Full-time</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Application Deadline</label>
                            <input name="applicationDeadline" type="date" className="input input-bordered bg-gray-50" required />
                        </div>
                    </div>
                </div>

                {/* Salary & Location */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-50">
                        <DollarSign className="text-blue-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-700">Salary & Location</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control col-span-full">
                            <label className="label text-sm font-semibold text-gray-600">Salary Range</label>
                            <div className="grid grid-cols-3 gap-4">
                                <input name="min" type="number" placeholder="Min" className="input input-bordered bg-gray-50" required />
                                <input name="max" type="number" placeholder="Max" className="input input-bordered bg-gray-50" required />
                                <select name="currency" className="select select-bordered bg-gray-50">
                                    <option value="bdt">BDT</option>
                                    <option value="usd">USD</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control col-span-full">
                            <label className="label text-sm font-semibold text-gray-600 flex items-center gap-1">
                                <MapPin size={14} /> Job Location
                            </label>
                            <input name="location" type="text" placeholder="e.g. Dhaka, Bangladesh" className="input input-bordered bg-gray-50" required />
                        </div>
                    </div>
                </div>

                {/* Company Details */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-50">
                        <ImageIcon className="text-blue-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-700">Company Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Company Name</label>
                            <input name="company" type="text" placeholder="Your Company Name" className="input input-bordered bg-gray-50" required />
                        </div>
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Company Logo URL</label>
                            <input name="company_logo" type="url" placeholder="https://image-link.com" className="input input-bordered bg-gray-50" required />
                        </div>
                    </div>
                </div>

                {/* Description & Requirements */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-50">
                        <FileText className="text-blue-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-700">Detailed Description</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Requirements (Comma Separated)</label>
                            <textarea name="requirements" placeholder="React, Node.js, Tailwind CSS..." className="textarea textarea-bordered bg-gray-50 h-24" required></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Responsibilities (Comma Separated)</label>
                            <textarea name="responsibilities" placeholder="Develop UI, Optimize code, Lead teams..." className="textarea textarea-bordered bg-gray-50 h-24" required></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">Job Description</label>
                            <textarea name="description" className="textarea textarea-bordered bg-gray-50 h-40" placeholder="Describe the role in detail..." required></textarea>
                        </div>
                    </div>
                </div>
                {/* hr */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-50">
                        <UserCheck className="text-blue-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-700">HR Contact Info</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">HR Name</label>
                            <input type="text" value={user?.displayName || ''} className="input input-bordered bg-gray-100 cursor-not-allowed" readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-600">HR Email</label>
                            <input type="email" value={user?.email || ''} className="input input-bordered bg-gray-100 cursor-not-allowed" readOnly />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pb-10">
                    <button className="btn btn-primary px-12 text-white font-bold rounded-xl shadow-lg shadow-blue-200">
                        Publish Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostJob;