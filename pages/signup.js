//signup page

import Link from 'next/link';
import React from 'react';

const SignUp = () => {
  return (
    <main className='p-20 text-center'>
      <div className="flex flex-col mb-5">
          <h1 className="text-2xl font-medium">MicroSim</h1>
          <div className="text-xs italic">
            <span className="italic text-neutral-950">Powered by </span>
            <span className="italic text-neutral-950">Execubots</span>
          </div>
        </div>
        <div className="flex items-center justify-center mb-3">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-center text-2xl font-semibold mb-4">SignUp</h2>
          <form >
          <div className="mb-4 flex justify-between">
            <div className="w-1/2 mr-1">
              
                <input type="text" 
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="First Name" />
              </div>
              <div className="w-1/2 mr-1">
                <input type="text" 
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Last Name"  />
              </div>
              </div>


            <div className="mb-4 flex justify-between">
              <div className="w-1/2 mr-1">
                <input type="date" 
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 placeholder="Date of Birth" />
              </div>
              <div className="w-1/2 ml-1">
                <select required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option selected>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <input type="email" 
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email" />
            </div>
            <div className="mb-4">
              <input type="password"
              required 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               placeholder="Password" />
            </div>
            <div className="mb-4">
              <input type="password" 
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               placeholder="Confirm Password" />
            </div>
            
            <div>
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link href="/" className="text-blue-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
    </main>
  );
}

export default SignUp;
