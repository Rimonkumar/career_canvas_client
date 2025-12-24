import Lottie from 'lottie-react';
import React, { use } from 'react';
import registerLotte from '../../assets/Lotties/Register.json'
import { AuthContext } from '../../provider/AuthProvider';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {

    const { createUser } = use(AuthContext)
    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Success!",
                    text: "Registation Successful",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch(error => {
                console.log(error.message);
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
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" required />

                                <label className="label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" required />

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                            <p className='p-4'>If you have Already Account <Link className='text-amber-700' to='/signin'>SignIn</Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;