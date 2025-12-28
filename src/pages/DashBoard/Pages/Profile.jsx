import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Profile = () => {
    const { user, updateUserProfile, deleteCurrentUser, logOut } = useAuth();
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        updateUserProfile(name, photo)
            .then(() => {
                Swal.fire("Success!", "Profile Updated Successfully", "success");
            })
            .catch(error => {
                Swal.fire("Error", error.message, "error");
            });
    };

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your account will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Account"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCurrentUser()
                    .then(() => {
                        Swal.fire("Deleted!", "Account has been removed.", "success");
                        navigate('/register');
                    })
                    .catch(error => {
                        Swal.fire("Error", "Please login again before deleting account.", "error");
                    });
            }
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md mt-10">
            {/* User Info Header */}
            <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-blue-50">
                    <img 
                        src={user?.photoURL || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{user?.displayName || "User Name"}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                    <p className="text-xs text-blue-600 font-semibold mt-1">Profile Verified</p>
                </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label font-bold">Full Name</label>
                    <input type="text" name="name" className="input input-bordered w-full" defaultValue={user?.displayName} />
                </div>
                
                <div className="form-control">
                    <label className="label font-bold">Photo URL</label>
                    <input type="text" name="photo" className="input input-bordered w-full" defaultValue={user?.photoURL} />
                </div>

                <div className="md:col-span-2">
                    <label className="label font-bold">Email (Read Only)</label>
                    <input type="email" className="input input-bordered w-full bg-gray-50" defaultValue={user?.email} readOnly />
                </div>

                <div className="flex gap-4 mt-4">
                    <button className="btn btn-primary">Update Profile</button>
                    <button 
                        type="button" 
                        onClick={handleDelete} 
                        className="btn btn-error btn-outline"
                    >
                        Delete My Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;