import Head from "next/head";
import { useState, useCallback, useEffect } from "react";
import TextInput from "./components/TextInput";
import Editor from "./components/Editor";
import RunContainer from "./components/RunContainer";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";
import WikipediaInput from "./components/WikipediaInput";

import { useRouter } from 'next/router';


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
    {
      value: "2D flocking animation",
      prompt: "2D flocking animation",
      code: `const flock = [];
  
      function setup() {
        createCanvas(800, 600);
        
        for(let i = 0; i < 100; i++) {
          flock.push(new Boid());
        }
      }
      
      function draw() {
        background(255);
        
        for(let boid of flock) {
          boid.flock(flock);
          boid.update();
          boid.edges();
          boid.show();
        }
      }
      
      class Boid {
        constructor() {
          this.position = createVector(random(width), random(height));
          this.velocity = p5.Vector.random2D();
          this.velocity.setMag(random(2, 4));
          this.acceleration = createVector();
          this.maxForce = 0.2;
          this.maxSpeed = 4;
        }
        
        flock(boids) {
          let alignment = createVector();
          let cohesion = createVector();
          let separation = createVector();
          
          let perceptionRadius = 50;
          let total = 0;
          
          for(let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            
            if(other != this && distance < perceptionRadius) {
              alignment.add(other.velocity);
              cohesion.add(other.position);
              separation.add(p5.Vector.sub(this.position, other.position));
              total++;
            }
          }
          
          if(total > 0) {
            alignment.div(total);
            alignment.setMag(this.maxSpeed);
            alignment.sub(this.velocity);
            alignment.limit(this.maxForce);
            
            cohesion.div(total);
            cohesion.sub(this.position);
            cohesion.setMag(this.maxSpeed);
            cohesion.sub(this.velocity);
            cohesion.limit(this.maxForce);
            
            separation.div(total);
            separation.setMag(this.maxSpeed);
            separation.sub(this.velocity);
            separation.limit(this.maxForce);
          }
          
          this.acceleration.add(alignment);
          this.acceleration.add(cohesion);
          this.acceleration.add(separation);
        }
        
        update() {
          this.velocity.add(this.acceleration);
          this.velocity.limit(this.maxSpeed);
          this.position.add(this.velocity);
          this.acceleration.mult(0);
        }
        
        show() {
          strokeWeight(8);
          stroke(55, 139, 255);
          point(this.position.x, this.position.y);
        }
        
        edges() {
          if(this.position.x > width) this.position.x = 0;
          else if(this.position.x < 0) this.position.x = width;
          
          if(this.position.y > height) this.position.y = 0;
          else if(this.position.y < 0) this.position.y = height;
        }
      }`
    },
    {
      value: "3D forms panning",
      prompt: "Panning around a 3d scene with spheres, cubes, pyramids",
      code: `const spheres = [];
      const cubes = [];
      const pyramids = [];
      
      function setup() {
        createCanvas(400, 400, WEBGL);
        for (let i = 0; i < 5; i++) {
          spheres.push(new Sphere(random(-100, 100), random(-100, 100), random(-100, 100)));
          cubes.push(new Cube(random(-100, 100), random(-100, 100), random(-100, 100)));
          pyramids.push(new Pyramid(random(-100, 100), random(-100, 100), random(-100, 100)));
        }
      }
      
      function draw() {
        background(200);
        noStroke();
        lights();
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        for (let i = 0; i < 5; i++) {
          spheres[i].show();
          cubes[i].show();
          pyramids[i].show();
        }
      }
      
      class Sphere {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }
        show() {
          push();
          translate(this.x, this.y, this.z);
          sphere(20);
          pop();
        }
      }
      
      class Cube {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }
        show() {
          push();
          translate(this.x, this.y, this.z);
          box(40);
          pop();
        }
      }
      
      class Pyramid {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }
        show() {
          push();
          translate(this.x, this.y, this.z);
          beginShape();
          vertex(0, -20, 0);
          vertex(10, 10, -10);
          vertex(-10, 10, -10);
          endShape(CLOSE);
          pop();
        }
      }`
    },
    {
      value: "Radial lines on click",
      prompt: "A line in a random direction starts from where the user presses",
      code: `function setup() {
        createCanvas(400, 400);
      }
      
      function draw() {
        strokeWeight(2);
        if (mouseIsPressed) {
          let angle = random(0, 360);
          let dx = cos(angle);
          let dy = sin(angle);
          line(mouseX, mouseY, mouseX + dx * 50, mouseY + dy * 50);
        }
      }`
    },
    {
      value: "Gravity balls on click",
      prompt: "every click creates a bouncing ball that eventually rests on the floor",
      code: `function setup() {
        createCanvas(400,400);
        rectMode(CENTER);
      }
      
      let balls = [];
      
      function draw() {
        background(200);
        for(let ball of balls) {
          ball.show();
          ball.move();
          ball.bounce();
          ball.stop();
        }
      }
      
      function mousePressed() {
        balls.push(new Ball(mouseX,mouseY,random(10,30)));
      }
      
      class Ball {
        constructor(x,y,r) {
          this.pos = createVector(x,y);
          this.vel = createVector(random(-3,3),random(-8,-3));
          this.acc = createVector(0,0.1);
          this.r = r;
          this.rest = false;
        }
        
        show() {
          strokeWeight(2);
          stroke(0);
          fill(255,0,0);
          ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
        }
        
        move() {
          if(!this.rest) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
          }
        }
        
        bounce() {
          if(this.pos.y+this.r > height) {
            this.vel.y *= -0.8;
            this.pos.y = height-this.r;
          }
        }
        
        stop() {
          if(this.vel.y < 0.1 && this.pos.y+this.r >= height) {
            this.rest = true;
            this.vel = createVector(0,0);
            this.acc = createVector(0,0);
          }
        }
      }`
    },
    {
      value: "Bouncing balls on click",
      prompt: "bouncing balls everywhere",
      code: `let balls = [];

      function setup() {
        createCanvas(windowWidth, windowHeight);
      }
      
      function draw() {
        background(220);
      
        for (let i = 0; i < balls.length; i++) {
          balls[i].update();
          balls[i].show();
        }
      }
      
      class Ball {
        constructor(x, y, speedX, speedY, size) {
          this.x = x;
          this.y = y;
          this.speedX = speedX;
          this.speedY = speedY;
          this.size = size;
        }
      
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
      
          if (this.x < 0 || this.x > width) {
            this.speedX *= -1;
          }
          if (this.y < 0 || this.y > height) {
            this.speedY *= -1;
          }
        }
      
        show() {
          noStroke();
          fill(random(255), random(255), random(255));
          ellipse(this.x, this.y, this.size);
        }
      }
      
      function mousePressed() {
        balls.push(new Ball(mouseX, mouseY, random(-10, 10), random(-10, 10), random(20, 50)));
      }`
    },
    {
      value: "Color noise static",
      prompt: "CRT TV static",
      code: `const numRects = 500;
      const rectWidth = 2;
      const rectHeight = 2;
      let rects = [];
      
      function setup() {
        createCanvas(windowWidth, windowHeight);
        for (let i = 0; i < numRects; i++) {
          rects.push({
            x: random(width),
            y: random(height),
            r: random(255),
            g: random(255),
            b: random(255)
          });
        }
        background(0);
      }
      
      function draw() {
        for (let i = 0; i < numRects; i++) {
          noStroke();
          fill(rects[i].r, rects[i].g, rects[i].b);
          rect(rects[i].x, rects[i].y, rectWidth, rectHeight);
          if (random(100) < 1) {
            rects[i].x = random(width);
            rects[i].y = random(height);
          }
        }
      }`
    },
    {
      value: "Zen ripples",
      prompt: "perlin noise moving ripples, super zen",
      code: `const ripples = [];
  
      function setup() {
        createCanvas(windowWidth, windowHeight);
        stroke(255);
        noFill();
        for (let i = 0; i < 10; i++) {
          ripples.push(new Ripple(random(width), random(height)));
        }
      }
      
      function draw() {
        background(0);
        for (let i = 0; i < ripples.length; i++) {
          ripples[i].update();
          ripples[i].display();
        }
      }
      
      class Ripple {
        constructor(x, y) {
          this.pos = createVector(x, y);
          this.r = 50;
          this.maxR = 500;
        }
      
        update() {
          this.r += noise(frameCount / 100, this.pos.y / 100) * 5;
          if (this.r > this.maxR) {
            this.r = 0;
            this.pos.x = random(width);
            this.pos.y = random(height);
          }
        }
      
        display() {
          ellipse(this.pos.x, this.pos.y, this.r, this.r / 2);
        }
      }`
    },
  ];

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


  // wikipedia code
  const [wikipediaInput,setwikipediaInput] = useState("");
  const [wikipediaPrompt,setwikipediaPrompt]=useState(false);

  
  function wikipediaInputChange(event) {
    event.preventDefault();
    setwikipediaInput(event.target.value);
  }

  
  async function wikipediaInputSubmit(event) {
    event.preventDefault();
    setlogMsg("");
    setWaiting(true);
    setwikipediaPrompt(true);
    setResult("// Please be patient, this may take a while...");
    setSelVal("");
    try {
      const response = await fetch('/api/checkWikipediaLink', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wikipedia_link: wikipediaInput }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setResult(data.code);
      } else if (response.status === 404) {
        const data = await response.json();
        alert(data.message);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch(error) {
      console.error(error);
      alert(error.message);
    } finally {
      setWaiting(false);
    }
  }


  const [selectPrompt,setselectPrompt] = useState(""); //for selecting prompt in Remix
  const [file, setFile] = useState(null); // Holds the selected image file
  const [preview, setPreview] = useState(''); // URL for the image preview
  const [analysisresult, setanalysisResult] = useState(''); // Stores the analysis result
  const [uploadProgress, setUploadProgress] = useState(0); // Manages the upload progress
  const [statusMessage, setStatusMessage] = useState(''); // Displays status messages to the user
  const [dragOver, setDragOver] = useState(false); // UI state for drag-and-drop
  const [base64Image, setBase64Image] = useState('');

  
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
          const analysisObject = JSON.parse(apiResponse.analysis); 
          const coderesult = analysisObject.code; 
          setResult(coderesult);
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
  
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    if (!analysisresult || !file) {
      alert('No analysis result or file to save.');
      return;
    }
  
    // Parse the analysisresult JSON string into an object
    const analysisObject = JSON.parse(analysisresult);
    
  
    try {
      // Prepare the payload with the parsed data and the SVG
      const payload = {
        prompt_name: analysisObject.prompt_name,
        prompt: analysisObject.prompt,
        wikipedia_link: analysisObject.wikipedia_link,
        code: analysisObject.code,
        imageBase64: base64Image
        // flashcard_svg: svgData // This should be the SVG data as a string
      };
  
      // Send the payload to your backend for saving to the database
      const response = await fetch('/api/savePrompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Record saved successfully!');
        setIsSaved(true);
        // Handle success, maybe clear state or redirect
      } else {
        // Handle errors
        alert(`Failed to save record: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record.');
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
            <WikipediaInput key="wikipediainput-01" wikipediaInput={wikipediaInput} onChange={wikipediaInputChange} onSubmit={wikipediaInputSubmit} waiting={waiting} wikipediaPrompt={wikipediaPrompt} />
          
            <Editor key="editor-01" result={result} onChange={editorChange} waiting={waiting}/>
            {/* Conditionally render the Save button */}
            {analysisresult && (
        <button
          className={`bg-emerald-500 p-2 rounded w-full text-white text-sm px-3 cursor-pointer ${isSaved ? 'bg-gray-500' : ''}`}
          onClick={handleSave}
          disabled={isSaved} // Disable the button based on isSaved state
        >
          {isSaved ? 'Saved to Database' : 'Save'} {/* Change button text based on isSaved state */}
        </button>
      )}
      </div>

            
          <div className="flex flex-col gap-4 2xl:w-1/2">
            <RunContainer key="runcont-01" sandboxRunning={sandboxRunning} clickPlay={runClickPlay} clickStop={runClickStop} result={result} logMsg={logMsg} waiting={waiting}/>
          </div>
        </div>
      </div>
    </>
  );
}
