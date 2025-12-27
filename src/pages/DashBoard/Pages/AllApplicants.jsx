import React from 'react';

const AllApplicants = () => {
    return (
        <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">All Applicants</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="table w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th>Name</th>
                        <th>Applied For</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="font-bold">John Doe</div>
                            <div className="text-sm opacity-50">john@example.com</div>
                        </td>
                        <td>React Developer</td>
                        <td><span className="badge badge-ghost">Pending</span></td>
                        <td><button className="btn btn-xs btn-outline">View CV</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default AllApplicants;