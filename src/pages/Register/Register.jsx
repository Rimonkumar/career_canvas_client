import Lottie from 'lottie-react';
import React, { use } from 'react';
import registerLotte from '../../assets/Lotties/Register.json'
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin';
import { updateProfile } from 'firebase/auth'; 

const Register = () => {
    const { createUser } = use(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                
                updateProfile(user, {
                    displayName: name, 
                    photoURL: photo
                })
                .then(() => {
                    Swal.fire({
                        title: "Success!",
                        text: "Registration Successful",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    navigate('/dashboard'); 
                })
                .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                });
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie style={{ width: '300px' }} animationData={registerLotte} loop={true} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold">Register now!</h1>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* Name Field */}
                                <label className="label">Full Name</label>
                                <input type="text" name="name" className="input" placeholder="Your Full Name" required />

                                {/* Photo URL Field */}
                                <label className="label">Photo URL</label>
                                <input type="text" name="photo" className="input" placeholder="Photo URL" required />

                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" required />

                                <label className="label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" required />

                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                            <p className='p-4 text-sm'>If you have Already Account <Link className='text-amber-700 font-bold' to='/signin'>SignIn</Link> </p>
                        </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;