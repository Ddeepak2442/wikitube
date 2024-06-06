import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

    const { loading, error, isAuthenticated, login, clearErrors } = useContext(AuthContext);
    
    useEffect(() => {
      
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (isAuthenticated && !loading) {
      router.push("/main");
    }
        

  }, [isAuthenticated, error, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ username: email, password});
  };


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
          <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
              <form onSubmit={submitHandler}>
              <div className="mb-4">
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Your Email"
                value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="\S+@\S+\.\S+"
                    title="Your email is invalid"
                    required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div className="mb-4 flex items-center">
              <Link href="/ForgotPassword" className="ml-auto text-sm text-blue-500">Forgot Password?</Link>
            </div> */}
            
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-700 text-white py-2 rounded-lg  transition duration-300">
                  {loading ? "Authenticating..." : "Login"}
                </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-600">Don't have an account? <Link href="/register" className="text-blue-500">Create an Account</Link></p>
            </div>
      </div>
    </div>
    </main>
  );
};

export default Login;
