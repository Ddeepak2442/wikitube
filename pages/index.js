import Layout from "./components/layout/Layout";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Link from "next/link";


export default function HomePage() {
  const {user} = useContext(AuthContext)

  return (
    <Layout title="Landing Page">
      <div className="w-full p-5 flex flex-col gap-5 max-w-2xl min-w-[320px] relative 2xl:max-w-7xl text-center">
        {!user ?
        <div className="bg-slate-50 rounded-xl shadow shadow-emerald-600/30 p-5">
        <p className="mb-3"> <strong>Welcome to wikitube..</strong></p>
      <p className="mb-2">Your ultimate destination for knowledge and interactive learning. As we are currently in the development stage, we appreciate your patience and enthusiasm. </p>
      <p className="mb-2">We includes
Explore a wide array of topics, ranging from science to history
Test your knowledge with our engaging multiple-choice questions (MCQs) designed to enhance your learning experience.</p>

      <p className="mb-2">Join our community of learners and contributors. Share your knowledge and help us grow, link given below
      Enjoy a user-friendly interface that makes learning fun and accessible
      </p>

      <p>You have first <strong>Login into the account</strong> to access the content of the main website click the login button. </p>
      </div>: 
      <div className="bg-slate-50 rounded-xl shadow shadow-emerald-600/30 p-5">
      <p className="mb-3"> <strong>Welcome to wikitube..</strong></p>
      <p className="mb-2">Upload your flashcard images to find code prompts, Wikipedia links and summary notes to learn that interest you.
      and answered the  generate  MCQS to   test yourself. </p>
      
          <strong>Stay Tuned!</strong>
      <p className="mb-2"> We are constantly updating our site with new features and content. </p>
      <p className="mb-2">Stay tuned for exciting updates and enhancements that will make your learning journey even more enjoyable. </p>
      <strong>Have a nice day and happy learning! </strong>
      <div className="flex justify-end">
      <Link href="/main">
                <div className=" flex flex-row  m-5 md:w-56 ">
                <button className='bg-emerald-500 hover:bg-emerald-700 p-2 rounded w-full text-white text-sm  cursor-pointer' type="button">Get Started</button>
                </div>
                </Link>
                </div>
      </div>
      }
      </div>
    </Layout>
  );
}
