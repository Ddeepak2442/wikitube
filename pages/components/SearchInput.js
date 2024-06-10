import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function SearchInputSm({WikipediaInput, onChange, onSubmit, waiting}){
    return (
        <form onSubmit={onSubmit}>
        <div className='md:hidden sm:flex rounded-lg items-center justify-center border-emerald-500 border-2 flex'>
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
    );
}