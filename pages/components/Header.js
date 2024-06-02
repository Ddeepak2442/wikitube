// import Link from "next/link";

// export default function Header() {
//     // return (
//     //   <div className="flex justify-between items-center">
      
//     //   <h1 className="text-2xl font-medium text-start mr-5">Hello User!</h1>
//     //   <header
//     //     className="flex justify-center items-center px-16 py-2 whitespace-nowrap max-w-[1211px] text-neutral-950"
//     //     aria-label="Header"
//     //   >
      
        
//     //     <div className="flex flex-col ml-5 mr-5">
//     //       <h1 className="text-2xl font-medium ">MicroSim</h1>
//     //       <div className="text-xs italic">
//     //         <span className="italic text-neutral-950">Powered by </span>
//     //         <span className="italic text-neutral-950">Execubots</span>
//     //       </div>
//     //     </div>
        
//     //   </header>

//     //   <button type="button" className="w-20 bg-emerald-500 hover:bg-emerald-700 text-white py-2 rounded-lg  transition duration-300 ml-5"><Link href="/">Log Out</Link></button>
//     //   </div>
//     // );
  
//   }
import { Fragment } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import {  MagnifyingGlassCircleIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import SearchInput from './SearchInput'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-white-800">
      {({ open }) => (
        <>
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-left">
                <div className="flex  flex-col flex-shrink-0 items-center">
                <h1 className="text-2xl font-medium ">MicroSim</h1>
                <div className="text-xs italic">
                <span className="italic text-neutral-950">Powered by </span>
                <span className="italic text-neutral-950">Execubots</span>
                </div>
                </div>
                
              </div>

              <SearchInput/>


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
                          <a
                            href="#"
                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Manoj
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="/"
                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>

        </>
      )}
      
    </Disclosure>
  )
}
