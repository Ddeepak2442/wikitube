import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { loading, error, isAuthenticated, register, clearErrors } =
    useContext(AuthContext);

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
    register({ firstName, lastName, email, password });
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
            <h2 className="text-center text-2xl font-semibold mb-4">SignUp</h2>
            <form onSubmit={submitHandler}>
            <div className="mb-4 flex justify-between">
                <div className="w-1/2 mr-1">
                  <input 
                  type="text"
                  name="firstName" 
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-1/2 ml-1">
                  <input type="text"
                  name="lastName"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <input type="email"
                name="email"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="\S+@\S+\.\S+"
                title="Your email is invalid"
                />
            </div>
              <div className="mb-4">
                <input type="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
                />
            </div>
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
                  {loading ? "Loading..." : "Register"}
                </button>
            </form>
            <p className="text-center mt-3">
              Already have an account? <Link href="/login" className="text-blue-500">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
