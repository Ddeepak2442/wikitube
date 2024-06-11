export default function TextInput({textInput, onChange, onSubmit, waiting, selectVal, selectChange,TextPrompt, egArray }) {
    return (
      <div className="rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
        <div className="flex justify-between xs:mb-2">
          <h3 className="font-semibold text-gray-500">Text prompt</h3>
          <select 
            name="examples" 
            id="eg-select" 
            value={selectVal}
            className="bg-emerald-100 rounded text-sm px-1 text-gray-600"
            onChange={selectChange}
            >
              <option value="">Choose an example</option>
              {egArray?.map((eg, index) => {
                  return <option value={eg.value} key={index}>{eg.value}</option>
                }
              )}
          </select>
        </div>
        <form onSubmit={onSubmit} className="w-full">
          <textarea key="textarea-01" className="block min-h-[50px] xs:min-h-[70px] border-[1.5px] border-emerald-500 p-2 rounded w-full mb-2 text-sm
          disabled:border-gray-300 disabled:text-gray-600 disabled:bg-gray-100"
            type="text"
            name="prompt"
            placeholder="Enter a text prompt for a p5.js sketch. Click the dropdown for examples."
            value={textInput}
            onChange={onChange}
            disabled={waiting}
          />
          { waiting && TextPrompt ? 
          <button className="bg-gray-300 p-2 rounded w-full text-white text-sm px-3" type="submit" disabled>
            <img src="loading.png" alt="loading icon" className="animate-spin w-4 h-4 mr-2 inline" />
            Generating MicroSim...
          </button>
          : 
          <button className="bg-emerald-500 hover:bg-emerald-700 p-2 rounded w-full text-white text-sm px-3 cursor-pointer" type="submit">Generate MicroSim</button> }
          
        </form>
      </div>
    );
  }