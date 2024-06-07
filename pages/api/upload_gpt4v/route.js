import OpenAI from "openai";


// Initialize the OpenAI client with the API key. This key is essential for authenticating 
// the requests with OpenAI's API services.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Logging the start of the image processing API call
    console.log('Starting the image processing API call');

    // Extracting the file (in base64 format) and an optional custom prompt 
    // from the request body. This is essential for processing the image using OpenAI's API.
    const { file: base64Image } = req.body;
    
    // Check if the image file is included in the request. If not, return an error response.
    if (!base64Image) {
      console.error('No file found in the request');
      return res.status(400).json({ success: false, message: 'No file found' });
    }

    // Log the receipt of the image in base64 format
    console.log('Received image in base64 format');

    // Utilize the provided custom prompt or a default prompt if it's not provided.
    const promptText = "given image is the flashcard that contains prompt name,prompt,prompt image,wikipedia link related to prompt.your task is to generate p5.js code that is ready to run in compiler.do not explain anything answer only in json with keys prompt_title:prompt title,prompt:prompt,wikipedia_link,code:code based on prompt_title genarate summary:summary.give only json without any ```json```";

    // Log the chosen prompt
    console.log(`Using prompt: ${promptText}`);

    // Sending the image and prompt to OpenAI for processing. This step is crucial for the image analysis.
    console.log('Sending request to OpenAI');
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: promptText },
              {
                type: "image_url",
                image_url: {
                  url: base64Image,
                }
              }
            ]
          }
        ],
        max_tokens: 500,
      });

      // Log the response received from OpenAI, which includes the analysis of the image.
      console.log('Received response from OpenAI');

      // Extract and log the analysis from the response
      const analysis = response?.choices[0]?.message?.content;
      console.log('Analysis:', analysis);

      // Return the analysis in the response
      return res.status(200).json({ success: true, analysis: analysis });
    } catch (error) {
      // Log and handle any errors encountered during the request to OpenAI
      console.error('Error sending request to OpenAI:', error);
      return res.status(500).json({ success: false, message: 'Error sending request to OpenAI' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}