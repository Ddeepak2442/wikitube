// // pages/ForgotPassword.js
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";



// const ForgotPassword = () => {

//   const [emailValue,setEmailValue] = useState('')
//   const [waiting,setWaiting] = useState(false)

//   async function handleResetPassword(event) {
//     event.preventDefault();
//     try {
//       setWaiting(true)
//       const response = await fetch(`${process.env.API_URL}/api/password-reset/`, {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: emailValue,
//         }),
//       });
  
//       if (response.ok) {
//         toast.success('Reset Link Sent Your Email!')
//         setWaiting(false)    
//       } else if (response.status === 404) {
//         toast.error('Entered email does not have account yet!');
//       } else {
//         toast.error('No user is associated with this email address.');
//       }
//     } catch(error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   }

//   return (
//     <main className='p-20 text-center'>
//       <div className="flex flex-col mb-5">
//           <h1 className="text-2xl font-medium">MicroSim</h1>
//           <div className="text-xs italic">
//             <span className="italic text-neutral-950">Powered by </span>
//             <span className="italic text-neutral-950">Execubots</span>
//           </div>
//         </div>
//         <div className="flex items-center justify-center mb-3">
//       <div className="w-full max-w-xl">
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <h2 className="text-center text-2xl mb-6">Forgot Password</h2>
//           <form onSubmit={handleResetPassword}>
//             <div className="mb-4">
//               {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                 Email Address
//               </label> */}
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="email"
//                 type="email"
//                 placeholder="Email Address"
//                 value={emailValue}
//                   onChange={(e) => setEmailValue(e.target.value)}
//                 required
//               />
//             </div>
//             <Link href="/login" className="block text-right text-blue-500 mb-3 ">
//               Got password? Login
//             </Link>
//             <div className="mb-6">
//             {!waiting&& <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
//                 Submit
//                 </button>}
//                 {waiting&& <button type="disabled" className="bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
//                 Submiting...
//                 </button>}
//             </div>
//           </form>
//           <p className="text-center">
//             Don't Have Account?{' '}
//             <Link href="/register" className="text-blue-500">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//     <ToastContainer position="bottom-right" />
//     </main>
//   );
// };

// export default ForgotPassword;


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 // Import useRouter hook

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState('');
  const [waiting,setWaiting] = useState(false)
  const router = useRouter(); // Use useRouter hook to access query parameters
  const { uidb64, token } = router.query; // Access query parameters from router object

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      setWaiting(true)
      const response = await fetch(`${process.env.API_URL}/api/password-reset/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
        }),
      });

      if (response.ok) {
        toast.success('Reset Link Sent to Your Email!');
        setWaiting(false)
      } else if (response.status === 404) {
        toast.error('Entered email does not have an account yet!');
      } else {
        toast.error('No user is associated with this email address.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
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
            <h2 className="text-center text-2xl mb-6">Forgot Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Email Address"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
              {!waiting&& <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
            Submit
           </button>}
            {waiting&& <button type="disabled" className="bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
            Submiting...
             </button>}
              </div>
            </form>
            <p className="text-center">
              Don't Have an Account?{' '}
              <Link href="/register" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </main>
  );
};

export default ForgotPassword;

