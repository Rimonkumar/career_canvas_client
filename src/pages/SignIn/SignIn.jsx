import Lottie from 'lottie-react';
import React, { use } from 'react';
import LoginLotte from '../../assets/Lotties/Login.json';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const SignIn = () => {
    const { signInUser } = use(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Success!",
                    text: "Login Successful",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Try Again"
                });
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie style={{ width: '300px' }} animationData={LoginLotte} loop={true} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" required />

                                <label className="label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" required />

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                            <p className='p-4'>If you Don't have Account <Link className='text-amber-700' to='/signup'>SignUp</Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;