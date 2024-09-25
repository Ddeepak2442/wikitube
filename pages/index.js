import Layout from "./components/layout/Layout";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Link from "next/link";
import SearchInputsm from './components/SearchInput'
import Footer from "./components/layout/Footer";
import { useRouter } from "next/router";


export default function HomePage() {
  const {user} = useContext(AuthContext)
  const navigate = useRouter()
 

  return ( 

      <>
      <div className="flex flex-col justify-center items-center ">
        <img src="/static/images/wikitube_logo.png"  alt="Wikitube" className=" sm:max-w-[400px] max-w-[200px]"/>
        <h1 className="font-semibold md:text-4xl">“Remix the Web”</h1>
        <button onClick={()=>(navigate.push('https://docs.google.com/forms/d/1ijPTExQlW-h-LeyrDLvPUSvOacdeHtRxwWhwu21p9PI/viewform?ts=66f41f03&edit_requested=true'))} className= " rounded-full border-2 p-2 font-semibold border-black mt-8 hover:bg-emerald-500 hover:text-white hover:border-white">
      Get Updates
      </button> 

      {/* <h1 className="font-semibold text-xl">
      “Remix the Web”
      </h1>
      <p className="font-semibold text-xl pt-8">
      Get Updates
      </p> */}



      </div>
        </>

  );
}
