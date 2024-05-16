import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError('Passwords do not match.');
      } else {
        setPasswordError('');
      }
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    // Perform form validation or submission here
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

    // Prepare the user data for submission
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      email: formData.email,
      password: hashedPassword,
    };

    // Perform form submission here
    await apiCallToRegisterUser(userData);
  };

  // This function makes an API call to the backend
  async function apiCallToRegisterUser(userData) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response from your backend
      const result = await response.json();
      if (result.success) {
        console.log('User registered:', result);
        // Redirect to login page or dashboard as needed
      } else {
        console.error('Registration failed:', result.message);
        // Handle registration failure (e.g., show error message to user)
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle network error (e.g., show error message to user)
    }
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
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex justify-between">
                <div className="w-1/2 mr-1">
                  <input type="text"
                  name="firstName" 
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange} />
                </div>
                <div className="w-1/2 ml-1">
                  <input type="text"
                  name="lastName"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange} />
                </div>
              </div>

              <div className="mb-4 flex justify-between">
                <div className="w-1/2 mr-1">
                  <input type="date"
                  name="dateOfBirth"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange} />
                </div>
                <div className="w-1/2 ml-1">
                  <select
                  name="gender"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.gender}
                  onChange={handleInputChange}>
                    <option value="" disabled>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <input type="email"
                name="email"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange} />
              </div>
              <div className="mb-4">
                <input type="password"
                required 
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange} />
              </div>
              <div className="mb-4">
                <input type="password" 
                required
                name="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange} />
                {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
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
