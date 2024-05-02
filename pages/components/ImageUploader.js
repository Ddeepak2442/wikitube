import React from "react";
import imageCompression from 'browser-image-compression';

function ImageUploader(props) {
  const {
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileChange: originalHandleFileChange,
    preview,
    uploadProgress,
    handleSubmit,
    analysisresult,
    statusmessage,
    dragOver,
    PromptChange,
    Remix,
    selectPrompt,
  } = props;
    // Compress image if it's more than 1MB
    const handleFileChange = async (file) => {
      console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      if (file.size > 1024 * 1024) { // file size is more than 1MB
        try {
          const options = {
            maxSizeMB: 1, // (max file size in MB)
            maxWidthOrHeight: 1920, // (compressed file width)
            useWebWorker: true
          };
          const compressedFile = await imageCompression(file, options);
          console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
          originalHandleFileChange(compressedFile);
        } catch (error) {
          console.error(error);
        }
      } else {
        originalHandleFileChange(file);
      }
    };
  

  return (
    <div className="rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
      <div className="flex justify-between xs:mb-2">
        <h3 className="font-semibold text-gray-500">Image Prompt</h3>
        { analysisresult?( <select
          name="Prompts"
          id="Prompt-select"
          value={selectPrompt}
          className="bg-emerald-100 rounded text-sm px-1 text-gray-600"
          onChange={PromptChange}
        >
          <option value="">Remix</option>
          {Remix?.map((eg, index) => {
            return <option value={eg.prompt.concat(analysisresult)} key={index}>{eg.value}</option>
          }
          )}
        </select>):( null )}
      </div>
      <div
        className={`border-2 border-dashed border-gray-400 rounded-lg p-10 cursor-pointer mb-5 ${dragOver ? 'border-blue-300 bg-gray-100' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileUpload')?.click()}
      >
        <input
          id="fileUpload"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileChange(e.target.files[0]);
            }
          }}
          accept="image/*"
          className="hidden"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="max-w-full max-h-48 mb-5 mx-auto" />
        ) : (
          <p>Drag and drop an image here, or click to select an image to upload.</p>
        )}
      </div>
      <div className="flex justify-center items-center mb-5">
        {uploadProgress === 0 || uploadProgress === 100 ? (
          <button onClick={handleSubmit} className="bg-emerald-500 p-2 rounded w-full text-white text-sm px-3 cursor-pointer">
            Generate MicroSim
          </button>
        ) : (
          <progress value={uploadProgress} max="100" className="w-1/2"></progress>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;