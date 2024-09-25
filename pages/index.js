import Layout from "./components/layout/Layout";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Link from "next/link";
import SearchInputsm from './components/SearchInput'
import Footer from "./components/layout/Footer";


export default function HomePage() {
  const {user} = useContext(AuthContext)

  return ( 

      <>
      <div className="flex flex-col justify-center items-center ">
        <img src="/static/images/wikitube_logo.png"  alt="Wikitube" className=" sm:max-w-[400px] max-w-[200px]"/>
        <h1 className="font-semibold md:text-4xl">“Remix the Web”</h1>
        <p className="font-semibold text-xl pt-8">
      Get Updates
      </p> 

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
