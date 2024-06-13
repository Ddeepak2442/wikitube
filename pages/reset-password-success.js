// pages/reset-password-success.js
import React from 'react';
import Link from 'next/link';

const ResetPasswordSuccess = () => {
  return (
    <main className='p-20 text-center'>
      <div className="flex flex-col mb-5 ">
        <h1 className="text-2xl font-medium">MicroSim</h1>
        <div className="text-xs italic">
          <span className="italic text-neutral-950">Powered by </span>
          <span className="italic text-neutral-950">Execubots</span>
        </div>
      </div>
      <div className="flex items-center justify-center mb-3">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-center text-2xl font-semibold mb-4 text-green-400">Password Reset Successful</h2>
            <p>Your password has been reset successfully. You can now log in with your new password.</p>
            <Link href="/login">
              <p className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">Go to Login</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordSuccess;
