import Head from "next/head";
import { useState, useCallback, useEffect } from "react";
import TextInput from "./components/TextInput";
import Editor from "./components/Editor";
import RunContainer from "./components/RunContainer";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";

export default function Home() {
  const [result, setResult] = useState("// type a text prompt or provide flashcard above and click 'Generate Microsim'");
  const [textInput, setTextInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [sandboxRunning, setSandboxRunning] = useState(false);
  const [logMsg, setlogMsg] = useState("");
  const [selVal, setSelVal] = useState("");
  const [TextPrompt,setTextPrompt] = useState(false);

  const egArray = [
    {
      value: "Conway's Game of Life",
      prompt: "Conway's Game of Life",
      code: `function setup() {
          createCanvas(400, 400);
          background(255);
          frameRate(10);
          cells = Array(floor(width / 20));
          for (let i = 0; i < cells.length; i++) {
            cells[i] = Array(floor(height / 20));
            for (let j = 0; j < cells[i].length; j++) {
              cells[i][j] = floor(random(2));
            }
          }
        }
        function draw() {
          background(255);
          for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
              let x = i * 20;
              let y = j * 20;
              if (cells[i][j] == 1) {
                fill(0);
                stroke(0);
                rect(x, y, 20, 20);
              }
            }
          }
          let nextGen = Array(cells.length);
          for (let i = 0; i < cells.length; i++) {
            nextGen[i] = Array(cells[i].length);
            for (let j = 0; j < cells[i].length; j++) {
              let state = cells[i][j];
              let neighbours = countNeighbours(cells, i, j);
              if (state == 0 && neighbours == 3) {
                nextGen[i][j] = 1;
              } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                nextGen[i][j] = 0;
              } else {
                nextGen[i][j] = state;
              }
            }
          }
          cells = nextGen;
        }
        function countNeighbours(cells, x, y) {
          let sum = 0;
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              let col = (x + i + cells.length) % cells.length;
              let row = (y + j + cells[0].length) % cells[0].length;
              sum += cells[col][row];
            }
          }
          sum -= cells[x][y];
          return sum;
        }`
    },
  ]

  const Remix = [
    {
      value: "Review",
      prompt: "You are an expert P5.js engineer with advanced degrees in Computation, Robotics, Engineering, Audio, Television and Energy domains.you are provided with a flashcard that has three items one is a prompt,second is an Image,lastly wikipedia and p5.js links,all these things describes a concept.You are also provided with a P5.js code at the end.Now,your task is to review the code, check for any errors and consider a different approach to this P5.js visualization described in flashcard.Answer only in code,do not try to explain.And the code you have to work is as follows:",
    },
    {
      value: "Controls",
      prompt: "You are an expert P5.js engineer with advanced degrees in Computation, Robotics, Engineering, Audio, Television and Energy domains.you are provided with a flashcard that has three items one is a prompt,second is an Image,lastly wikipedia and p5.js links,all these things describes a concept.You are also provided with a P5.js code at the end.Provided code is pretty cool and close to what I was looking for.Now,your task is to add inline controls to adjust key parameters.Answer only in code,do not try to explain.And the code you have to work is as follows:",
    },
    {
      value: "Simplify",
      prompt: "You are an expert P5.js engineer with advanced degrees in Computation, Robotics, Engineering, Audio, Television and Energy domains.you are provided with a flashcard that has three items one is a prompt,second is an Image,lastly wikipedia and p5.js links,all these things describes a concept.You are also provided with a P5.js code at the end.Now,your task is to re-evaluate provided code and described concept in flashcard.And it seems like a simpler approach may help make a more effective visualization.Answer only in code,do not try to explain.And the code you have to work is as follows:",
    },
    {
      value: "Chunk",
      prompt: "You are an expert P5.js engineer with advanced degrees in Computation, Robotics, Engineering, Audio, Television and Energy domains.you are provided with a flashcard that has three items one is a prompt,second is an Image,lastly wikipedia and p5.js links,all these things describes a concept.You are also provided with a P5.js code at the end.Now,your task is to re-evaluate provided code and described concept in flashcard.And it seems like a simpler approach may help make a more effective visualization and consider chunking the concept and try coding a smaller, single serving P5.js visualization based on a key concept.Answer only in code,do not try to explain.And the code you have to work is as follows:",
    },
    {
      value: "Get Creative",
      prompt: "You are an expert P5.js engineer with advanced degrees in Computation, Robotics, Engineering, Audio, Television and Energy domains.you are provided with a flashcard that has three items one is a prompt,second is an Image,lastly wikipedia and p5.js links,all these things describes a concept.You are also provided with a P5.js code at the end.The provided code is not working good.Now,your task is to review the concept and try a fun, silly or creative approach but with serious consideration of the P5.js library to make sure it works.Answer only in code,do not try to explain.And the code you have to work is as follows:",
    },
  ]

  const [selectPrompt,setselectPrompt] = useState(""); //for selecting prompt in Remix
  const [file, setFile] = useState(null); // Holds the selected image file
  const [preview, setPreview] = useState(''); // URL for the image preview
  const [analysisresult, setanalysisResult] = useState(''); // Stores the analysis result
  const [uploadProgress, setUploadProgress] = useState(0); // Manages the upload progress
  const [statusMessage, setStatusMessage] = useState(''); // Displays status messages to the user
  const [dragOver, setDragOver] = useState(false); // UI state for drag-and-drop
  const [base64Image, setBase64Image] = useState('');

  const handleFileChange = useCallback(async (selectedFile) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setStatusMessage('Image selected. Click "Analyze Image" to proceed.');
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result.toString());
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaiting(true);
    setResult("// Please be patient, this may take a while...");
    if (!file) {
      setStatusMessage('No file selected!');
      return;
    }

    setStatusMessage('Sending request...');
    setUploadProgress(40);

    const response = await fetch('/api/upload_gpt4v/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64Image,
      }),
    });

    setUploadProgress(60);

    // Check if the response status is in the range of 200 to 299
    if (response.ok) {
      try {
        const apiResponse = await response.json();
        setUploadProgress(80);

        if (apiResponse.success) {
          setanalysisResult(apiResponse.analysis);
          setStatusMessage('Analysis complete.');
          setUploadProgress(100);
          const coderesult = apiResponse.analysis;
          const extractedCode = coderesult.slice(14, -3);
          setResult(extractedCode);
          setSandboxRunning(true);
          setWaiting(false);
        } else {
          setStatusMessage(apiResponse.message);
        }
      } catch (error) {
        console.error(error);
        setStatusMessage('Error parsing response.');
      }
    } else {
      // Handle the case where the response status is not in the OK range
      setStatusMessage(`HTTP error! status: ${response.status}`);
    }
  };

  const PromptChange = async (event) => {
    event.preventDefault();
    setselectPrompt(event.target.value);
    const prompt = event.target.value;    
    console.log(prompt);
    setWaiting(true);
    setResult("// Please be patient, this may take a while...");
    if (!file) {
      setStatusMessage('No file selected!');
      return;
    }

    setStatusMessage('Sending request...');
    setUploadProgress(40);

    const response = await fetch('/api/remix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64Image,
	      prompt: prompt,
      }),
    });

    setUploadProgress(60);

    // Check if the response status is in the range of 200 to 299
    if (response.ok) {
      try {
        const apiResponse = await response.json();
        setUploadProgress(80);

        if (apiResponse.success) {
          setanalysisResult(apiResponse.analysis);
          setStatusMessage('Analysis complete.');
          setUploadProgress(100);
          const coderesult = apiResponse.analysis;
          const extractedCode = coderesult.slice(14, -3);
          setResult(extractedCode);
          setSandboxRunning(true);
          setWaiting(false);
        } else {
          setStatusMessage(apiResponse.message);
        }
      } catch (error) {
        console.error(error);
        setStatusMessage('Error parsing response.');
      }
    } else {
      // Handle the case where the response status is not in the OK range
      setStatusMessage(`HTTP error! status: ${response.status}`);
    }
  };

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files.length) {
      handleFileChange(files[0]);
    }
  }, [handleFileChange]);

  useEffect(() => {
    let ranOnce = false;

    const handler = event => {
      const data = JSON.parse(event.data)
      if (!ranOnce) {
        setlogMsg(data.logMsg);
        ranOnce = true;
      } else {
        setlogMsg(msg => msg + '\n' + data.logMsg);
      }
    }

    window.addEventListener("message", handler)

    // clean up
    return () => window.removeEventListener("message", handler)
  }, [result, sandboxRunning])

  function textInputChange(event) {
    event.preventDefault();
    setTextInput(event.target.value);
  }

  async function textInputSubmit(event) {
    event.preventDefault();
    setlogMsg("");
    setWaiting(true);
    setTextPrompt(true);
    setResult("// Please be patient, this may take a while...");
    setSelVal("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_API_URL || ''}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        setWaiting(false);
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResult(data.code);
      setSandboxRunning(true);
      setWaiting(false);
    } catch(error) {
      console.error(error);
      alert(error.message);
      setWaiting(false);
    }
  }

  const editorChange = useCallback((value, viewUpdate) => {
    setResult(value);
  }, []);
  
  function runClickPlay(event) {
    event.preventDefault();
    setSandboxRunning(true);
  }

  function runClickStop(event) {
    event.preventDefault();
    setSandboxRunning(false);
    setlogMsg("");
  }

  function textSelectChange(event) {
    setSelVal(event.target.value);
    event.preventDefault();
    const search = event.target.value;
    const selectedEg = egArray.find((obj) => obj.value === search);
    if(selectedEg) {
      setlogMsg('');
      setTextInput(selectedEg.prompt);
      setResult(selectedEg.code);
      setSandboxRunning(true);
    } else {
      setlogMsg('');
      setTextInput('');
      setResult('');
      setSandboxRunning(false);
    }
  }

  return (
    <>
      <Head>
        <title>MicroSim</title>
        <meta name="description" content="Turn text into p5.js code using GPT and display it" />
      </Head>
      <div className="w-full p-5 flex flex-col gap-5 max-w-2xl min-w-[320px] relative 2xl:max-w-7xl">
        <Header />
        <div className="flex flex-col gap-4 2xl:flex-row w-full">
          <div className="flex flex-col gap-4 2xl:w-1/2">
            <TextInput key="textinput-01" textInput={textInput} onChange={textInputChange} onSubmit={textInputSubmit} waiting={waiting} selectVal={selVal} selectChange={textSelectChange} TextPrompt={TextPrompt} egArray={egArray}/>
              <ImageUploader
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleFileChange={handleFileChange}
              preview={preview}
              uploadProgress={uploadProgress}
              handleSubmit={handleSubmit}
              statusMessage={statusMessage}
              analysisresult={analysisresult}
              dragOver={dragOver}
              Remix={Remix}
              selectPrompt={selectPrompt}
              PromptChange={PromptChange}
            />
            <Editor key="editor-01" result={result} onChange={editorChange} waiting={waiting}/>
          </div>
          <div className="flex flex-col gap-4 2xl:w-1/2">
            <RunContainer key="runcont-01" sandboxRunning={sandboxRunning} clickPlay={runClickPlay} clickStop={runClickStop} result={result} logMsg={logMsg} waiting={waiting}/>
          </div>
        </div>
      </div>
    </>
  );
}
