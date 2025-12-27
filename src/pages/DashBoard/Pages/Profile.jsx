import React from 'react';

const Profile = () => {
    return (
        <div className="p-6 max-w-4xl bg-white rounded-xl shadow-sm">
        <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-blue-50">
                <img src="https://via.placeholder.com/150" alt="Profile" />
            </div>
            <div>
                <h2 className="text-2xl font-bold">Tech World Ltd.</h2>
                <p className="text-gray-500">Software Company | Dhaka, BD</p>
            </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Company Name" className="input input-bordered w-full" defaultValue="Tech World Ltd." />
            <input type="email" placeholder="Email Address" className="input input-bordered w-full" defaultValue="hr@techworld.com" />
            <textarea className="textarea textarea-bordered md:col-span-2" placeholder="About Company"></textarea>
            <button className="btn btn-primary w-fit">Update Profile</button>
        </form>
    </div>
    );
};

export default Profile;