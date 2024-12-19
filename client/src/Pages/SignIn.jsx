import { useState } from 'react';
import { FaCog, FaWrench, FaThumbsUp, FaMagic } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // <-- Import Link
import { useNavigate } from 'react-router-dom';
const SignIn = ()  => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        try {
            const res = await fetch('/api/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({email, password}),
            });
            const data = await res.json();
            console.log(data);

            if (res.ok) {
                // Store token in local storage
                localStorage.setItem('authToken', data._id);
        
                // Navigate to tasks
                navigate('/private/tasks');
              } else {
                console.error(data.message || 'Authentication failed');
              }
            
          } catch (error) {
            console.log(error)
          }
        
    };

    return (
        <div className="min-h-screen flex items-center justify-evenly bg-[#070f19] text-white">
            <div className="flex w-full max-w-6xl rounded-lg overflow-hidden shadow-lg flex-col md:flex-row ">
                {/* Left Side - Features */}
                <div className="flex flex-col m-2 px-2 pt-24 space-y-8 ">
                    <div className="text-3xl font-bold text-blue-400">Task Manager</div>
                    <div className="flex items-start space-x-4">
                        <FaCog className="text-2xl text-gray-300" />
                        <div>
                            <h3 className="text-lg font-semibold">Organize Your World</h3>
                            <p className="text-sm text-gray-400">
                                Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.
                            </p>
                        </div>
                    </div>
                    {/* <div className="flex items-start space-x-4">
                        <FaWrench className="text-2xl text-gray-300" />
                        <div>
                            <h3 className="text-lg font-semibold">Built to last</h3>
                            <p className="text-sm text-gray-400">
                                Experience unmatched durability that goes above and beyond with lasting investment.
                            </p>
                        </div>
                    </div> */}
                    <div className="flex items-start space-x-4">
                        <FaWrench className="text-3xl text-gray-300" />
                        <div>
                            <h3 className="text-lg font-semibold">Stay On Track</h3>
                            <p className="text-sm text-gray-400">
                            Stay focused and organized with a task manager that keeps you aligned with your goals. Prioritize, plan, and accomplish more every day with ease.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <FaThumbsUp className="text-2xl text-gray-300" />
                        <div>
                            <h3 className="text-lg font-semibold">Great user experience</h3>
                            <p className="text-sm text-gray-400">
                                Integrate our product into your routine with an intuitive and easy-to-use interface.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <FaMagic className="text-2xl text-gray-300" />
                        <div>
                            <h3 className="text-lg font-semibold">Innovative functionality</h3>
                            <p className="text-sm text-gray-400">
                                Stay ahead with features that set new standards, addressing your evolving needs better than the rest.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="max-w-full m-2 px-5 py-2 lg:my-4 lg:w-1/2 lg:p-12 lg:ml-24 bg-[#060d15] border rounded-md border-gray-700 hover:animate-shake">
                    <h2 className="text-3xl text-left font-bold mb-6">Sign in</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                placeholder='xyz@email.com'
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 mt-1 text-white border border-gray-600 bg-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                placeholder='*****'
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 mt-1 text-white border border-gray-600 bg-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="flex items-center text-sm">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="ml-2">Remember me</span>
                                </label>
                            </div>
                            <div>
                                <a href="#" className="text-sm text-blue-400 hover:underline">Forgot your password?</a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-white hover:bg-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        Don't have an account? <Link to="/sign-up" className="text-blue-400 hover:underline">Sign up</Link>
                    </div>
                    <div className="mt-4 text-center text-sm">or</div>
                    <div className="mt-4 flex-row">
                        <button className="flex items-center justify-center w-full p-2 my-2 bg-black text-white border rounded-lg border-gray-700 shadow hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500">
                            <FcGoogle className="mr-2" /> Sign in with Google
                        </button>
                        <button className="flex items-center justify-center w-full p-2 bg-black text-white border rounded-lg border-gray-700 shadow hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <FaLinkedin className="mr-2" /> Sign in with Linkedin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;