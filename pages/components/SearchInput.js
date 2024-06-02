import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput() {
    return (
        <div className='hidden md:flex rounded-lg items-center justify-center border-emerald-500 border-2'>
            <input 
                type='search' 
                placeholder='Search...' 
                className='p-2 bg-transparent w-96'  
            />
            <button type='button'>
                <MagnifyingGlassIcon 
                    className="h-6 w-6 text-emerald-600 ml-2 mr-2" 
                    aria-hidden="true" 
                /> 
            </button>
        </div>
    );
}


export function SearchInputSm(){
    return (
        <div className='md:hidden sm:flex rounded-lg items-center justify-center border-emerald-500 border-2 flex'>
            <input 
                type='search' 
                placeholder='Search...' 
                className='p-2 bg-transparent w-96'  
            />
            <button type='button'>
                <MagnifyingGlassIcon 
                    className="h-6 w-6 text-emerald-600 ml-2 mr-2" 
                    aria-hidden="true" 
                /> 
            </button>
        </div>
    );
}