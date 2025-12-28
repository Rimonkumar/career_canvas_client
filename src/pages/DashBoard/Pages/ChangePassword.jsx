import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import useAuth from '../../../Hooks/useAuth';

const ChangePassword = () => {
    const { changeUserPassword } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPassword = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            return Swal.fire("Error", "Passwords do not match!", "error");
        }

        if (newPassword.length < 6) {
            return Swal.fire("Error", "Password must be at least 6 characters", "warning");
        }

        changeUserPassword(newPassword)
            .then(() => {
                Swal.fire("Success!", "Password updated successfully", "success");
                e.target.reset();
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    title: "Security Alert",
                    text: "For security reasons, please logout and login again to change your password.",
                    icon: "info"
                });
            });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 mt-10">
            <div className="flex items-center gap-3 mb-6 text-[#1967D2]">
                <ShieldCheck size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-control">
                    <label className="label text-sm font-semibold text-gray-600">New Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder="Min 6 characters" 
                            className="input input-bordered w-full focus:border-[#1967D2]" 
                            required 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label text-sm font-semibold text-gray-600">Confirm New Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder="Min 6 characters" 
                            className="input input-bordered w-full focus:border-[#1967D2]" 
                            required 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

               

                <div className="pt-2">
                    <button className="btn bg-[#1967D2] hover:bg-[#1452a8] text-white w-full md:w-fit px-10">
                        Update Password
                    </button>
                </div>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 leading-relaxed">
                    <strong>Note:</strong> Firebase requires a recent login session to change passwords. If you haven't logged in recently, you might be asked to re-authenticate for security purposes.
                </p>
            </div>
        </div>
    );
};

export default ChangePassword;