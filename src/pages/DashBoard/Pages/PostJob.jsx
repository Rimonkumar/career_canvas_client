import React from 'react';

const PostJob = () => {
    <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Post A New Job</h2>
        <div className="space-y-4">
            <input type="text" placeholder="Job Title" className="input input-bordered w-full" />
            <div className="grid grid-cols-2 gap-4">
                <select className="select select-bordered w-full">
                    <option disabled selected>Job Type</option>
                    <option>Full Time</option>
                    <option>Remote</option>
                </select>
                <input type="text" placeholder="Salary Range" className="input input-bordered w-full" />
            </div>
            <textarea className="textarea textarea-bordered w-full h-32" placeholder="Job Description"></textarea>
            <button className="btn btn-neutral px-8">Publish Job</button>
        </div>
    </div>
};

export default PostJob;