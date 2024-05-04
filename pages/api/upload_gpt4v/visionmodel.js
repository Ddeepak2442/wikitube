// Import necessary modules from Next.js and any other libraries you're using
import { NextApiResponse } from 'next';
import OpenAI from 'openai';

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// The main handler for your API route
export default async function handler(req, res) {
  // Only allow POST requests; reject others with a 405 Method Not Allowed
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  console.log('Starting the image processing API call');

  // Destructure and extract data from the request body
  const { file: base64Image, prompt: customPrompt, detail, max_tokens } = req.body;

  // Validate the presence of the base64Image in the request
  if (!base64Image) {
    console.error('No file found in the request');
    return res.status(400).json({ success: false, message: 'No file found' });
  }

  // Define a default prompt if none is provided
  const promptText = customPrompt || "Analyse the image in brief";
  console.log(`Using prompt: ${promptText}`);

  // Attempt to send the request to OpenAI
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
                ...(detail && { detail: detail }) // Include the detail field only if it exists
              }
            }
          ]
        }
      ],
      max_tokens: max_tokens
    });

    // Log and return the response from OpenAI
    console.log('Received response from OpenAI');
    const analysis = response?.choices[0]?.message?.content;
    console.log('Analysis:', analysis);

    // Respond with the analysis result
    return res.status(200).json({ success: true, analysis: analysis });
  } catch (error) {
    // Log and respond with error information
    console.error('Error sending request to OpenAI:', error);
    return res.status(500).json({ success: false, message: 'Error sending request to OpenAI', error: error.message });
  }
}