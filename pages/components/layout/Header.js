import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import Link from "next/link";
import { UserCircleIcon } from '@heroicons/react/24/outline'
import SearchInput from '../SearchInput'
import AuthContext from "../../../context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({WikipediaInput, onChange, onSubmit, waiting}) {
  const { loading, user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  }
  return (
    <Disclosure as="nav" className="bg-white-800">
      {({ open }) => (
        <>
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-left">
                <Link href='/'>
                <div className="flex  flex-col flex-shrink-0 items-center hover:text-emerald-600">
                <h1 className="text-2xl font-medium ">MicroSim</h1>
                <div className="text-xs italic">
                <span className="italic text-neutral-950">Powered by </span>
                <span className="italic text-neutral-950">Execubots</span>
                </div>
                </div>
                </Link>
              </div>

              {/* <SearchInput/> */}
              <form onSubmit={onSubmit}>
        <div className='hidden md:flex rounded-lg items-center justify-center border-emerald-500 border-2'>
            <input 
                type='search' 
                placeholder='Search With Wikipidea Link...' 
                className='p-2 bg-transparent w-96' 
                value={WikipediaInput}
            onChange={onChange}
            disabled={waiting} 
            />
            <button type='submit'>
                <MagnifyingGlassIcon 
                    className="h-6 w-6 text-emerald-600 ml-2 mr-2" 
                    aria-hidden="true" 
                /> 
            </button>
        </div>
        </form>

              {/* condition If logined shows profile Icon else login Button */}
              {user ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ">
                  <div>
                    <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 hover:bg-emerald-100">
                       <UserCircleIcon className="h-10 w-10 text-emerald-600" aria-hidden="true" />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                           href='' 
                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-800 ')}
                          >
                            {user.first_name}
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                          
                          onClick={logoutHandler}
                          href="/login"
                          className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-800')
                              
                            }
                          >
                            Log out
                          
                          </Link>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div> ): (
            !loading && (
              <Link href="/login">
                <div className=" absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                <button className='bg-emerald-500 hover:bg-emerald-700 p-2 rounded w-full text-white text-sm px-3 cursor-pointer'>Login</button>
                </div>
              </Link>
            )
          )}
            </div>

        </>
      )}
      
    </Disclosure>
  )
}
