import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/'); // Navigate to the homepage after signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070f19] text-white">
      <div className="w-full p-2 py-4 lg:w-1/3 m-2 lg:p-12 bg-[#060d15] border rounded-md border-gray-700 hover:animate-shake">
        <h2 className="text-3xl text-left font-bold mb-6">Sign up</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">UserName</label>
            <input
              type="name"
              id="name"
              value={username}
              placeholder='name'
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white border border-gray-600 bg-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>  
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white hover:bg-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Already have an account? <a href="/" className="text-blue-400 hover:underline">Login here</a>
        </div>
        <div className="mt-4 text-center text-sm">or</div>
        <div className="mt-4 flex-row">
          <button className="flex items-center justify-center w-full p-2 my-2 bg-black text-white border rounded-lg border-gray-700 shadow hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500">
            <FcGoogle className="mr-2" /> Sign up with Google
          </button>
          <button className="flex items-center justify-center w-full p-2 bg-black text-white border rounded-lg border-gray-700 shadow hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FaLinkedin className="mr-2" /> Sign up with Linkedin
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;