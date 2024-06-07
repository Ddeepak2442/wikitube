

export default function Summary({onClick,result}){

  return (
    <div className="rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
      <div className="flex justify-between xs:mb-2">
        <h3 className="font-semibold text-gray-500">Summary</h3>
      </div>
      <form  className="w-full">
        <textarea key="textarea-01" className="block min-h-[50px] xs:min-h-[70px] border-[1.5px] border-emerald-500 p-2 rounded w-full mb-2 text-sm
        disabled:border-gray-300 disabled:text-gray-600 disabled:bg-gray-100"
          type="text"
          name="summary"
          value={result}
        />

          <button className="bg-emerald-500 p-2 rounded w-full text-white text-sm px-3 cursor-pointer"  onClick={onClick}>Generate Mcq</button>
        
      </form>
    </div>
  );
}


