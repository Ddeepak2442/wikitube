// pages/ForgotPassword.js
import Link from 'next/link';
import React from 'react';

const ForgotPassword = () => {
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
          <h2 className="text-center text-2xl mb-6">Forgot Password</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email Address"
                required
              />
            </div>
            <Link href="/login" className="block text-right text-blue-500 mb-3 ">
              Got password? Login
            </Link>
            <div className="mb-6">
              <button
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <p className="text-center">
            Don't Have Account?{' '}
            <Link href="/register" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </main>
  );
};

export default ForgotPassword;
