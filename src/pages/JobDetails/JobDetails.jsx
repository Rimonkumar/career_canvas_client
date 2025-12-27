import React from 'react';
import { Link, useLoaderData } from 'react-router';
import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaDollarSign, FaEnvelope } from "react-icons/fa";

const JobDetails = () => {
    const job = useLoaderData();

    const {
        title, company, location, jobType, category, applicationDeadline,
        salaryRange, description, requirements, responsibilities,
        hr_email, hr_name, company_logo
    } = job;

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-4">

                {/* Header Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 mb-8">
                    <img src={company_logo} alt={company} className="w-24 h-24 object-contain rounded-lg p-2 bg-gray-50 border" />
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                        <p className="text-blue-600 font-semibold text-lg">{company}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-gray-500">
                            <span className="flex items-center gap-1"><FaMapMarkerAlt /> {location}</span>
                            <span className="flex items-center gap-1"><FaBriefcase /> {jobType}</span>
                            <span className="flex items-center gap-1 font-bold text-green-600">
                                <FaDollarSign /> {salaryRange.min} - {salaryRange.max} {salaryRange.currency.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <Link to={`/apply/${job._id}`} className="btn btn-primary">
                        Apply Now
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4">Job Description</h3>
                            <p className="text-gray-600 leading-relaxed">{description}</p>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4">Requirements</h3>
                            <div className="flex flex-wrap gap-2">
                                {requirements.map((req, index) => (
                                    <span key={index} className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium border border-blue-100">
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Responsibilities */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4">Responsibilities</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                {responsibilities.map((res, index) => (
                                    <li key={index}>{res}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Overview Card */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-5 border-b pb-3">Job Summary</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gray-100 rounded-lg text-blue-600"><FaCalendarAlt /></div>
                                    <div>
                                        <p className="text-xs text-gray-400">Deadline</p>
                                        <p className="font-semibold text-sm">{applicationDeadline}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gray-100 rounded-lg text-blue-600"><FaBriefcase /></div>
                                    <div>
                                        <p className="text-xs text-gray-400">Category</p>
                                        <p className="font-semibold text-sm">{category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gray-100 rounded-lg text-blue-600"><FaEnvelope /></div>
                                    <div>
                                        <p className="text-xs text-gray-400">Contact HR</p>
                                        <p className="font-semibold text-sm">{hr_name}</p>
                                        <p className="text-xs text-gray-500">{hr_email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;