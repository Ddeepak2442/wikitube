// import React, { useState, useContext, useEffect } from "react";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword,setConfirmPasswordPassword] = useState("")
//   const [Passerror, setPassError] = useState('');
//   const [waiting,setWaiting] = useState(false)
//   // const router = useRouter();

//   async function submitHandler (e){
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setPassError('Passwords do not match');
//     }
//      else {
//       setPassError('');
//       // Handle the form submission (e.g., send data to server)
//       console.log('Passwords match');
//     }

//     try {
//       setWaiting(true)
//         const response = await fetch(`${process.env.API_URL}api/password-reset-confirm/<uidb64>/<token>/`, {
//           method: "POST",
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             new_password: confirmPassword,
//           }),
//         });
    
//         if (response.ok) {
//           toast.success('Password Reseted') 
//           setWaiting(false)   
//         } 
//       } catch(error) {
//         console.error(error);
//         toast.error(error.message);
//       }
//   };

//   return (
//     <main className='p-20 text-center'>
//       <div className="flex flex-col mb-5 ">
//         <h1 className="text-2xl font-medium">MicroSim</h1>
//         <div className="text-xs italic">
//           <span className="italic text-neutral-950">Powered by </span>
//           <span className="italic text-neutral-950">Execubots</span>
//         </div>
//       </div>
//       <div className="flex items-center justify-center mb-3">
//         <div className="w-full max-w-xl">
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-center text-2xl font-semibold mb-4">Reset Password</h2>
//             <form onSubmit={submitHandler}>
//               <div className="mb-4">
//                 <input type="password"
//                 name="password"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 minLength={8}
//                 required
//                 />
//             </div>
          
//             <div className="mb-4">
//                 <input type="password"
//                 name="password"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPasswordPassword(e.target.value)}
//                 minLength={8}
//                 required
//                 />

//                 <div>
//                 {Passerror && <p className="text-red-500">{Passerror}</p>}
//                 </div>
//             </div>
//               {!waiting&& <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
//                 Submit
//                 </button>}
//                 {waiting&& <button type="disabled" className="bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
//                 Submiting...
//                 </button>}
//             </form>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();
  const { uidb64, token } = router.query;

  async function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassError('Passwords do not match');
      return;
    } else {
      setPassError('');
    }

    try {
      setWaiting(true);
      const response = await fetch(`${process.env.API_URL}/api/password-reset-confirm/${uidb64}/${token}/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: password,
        }),
      });

      console.log(response.status)

      if (response.status===302) {
        toast.success('Password Reset Successfully');
        router.push('/reset-password-success'); // Redirect to login page after successful password reset
        console.log(response.status)
      } 
    } catch (error) {
      console.error(error);
      console.log(response.status)
      toast.error(error.message);
    } finally {
      setWaiting(false);
    }
  }

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
            <h2 className="text-center text-2xl font-semibold mb-4">Reset Password</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <input 
                  type="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
              <div className="mb-4">
                <input 
                  type="password"
                  name="confirm_password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  required
                />
                {passError && <p className="text-red-500">{passError}</p>}
              </div>
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
                {waiting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </main>
  );
};

export default ResetPassword;

