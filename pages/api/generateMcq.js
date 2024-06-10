import OpenAI from "openai";
import Cors from 'cors';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const whitelist = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(',') : '*' ;

const cors = Cors({
  origin: whitelist
})

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey:apiKey,
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}


export default async function (req, res) {
  await runMiddleware(req, res, cors);

  if (!apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const summary = req.body.summary || '';
  if (summary.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid summary",
      }
    });
    return;
  }

  console.log('User summary:', summary);

  try {
    const completion = await openai.chat.completions.create({
      // model:"gpt-3.5-turbo",
      model:"gpt-3.5-turbo",
  messages:[
    {"role": "system", "content": "You are a helpful assistant to give response as json."},
    {"role": "user", "content": `${summary}`},
    {"role": "assistant", "content": "Generate 2 MCQs using the above-given content.  Exact Format the output as follows: \n// const questions = [\n  {\n    question: \"Question text\",\n    options: [\n      \"Option A\",\n      \"Option B\",\n      \"Option C\",\n      \"Option D\"\n    ],\n    correctAnswer: \"optionX\"\n  },\n];dont go beyond the content"},
  ]
    });
  console.log(completion); 
  console.log("mcq: " + completion.choices[0].message.content);
  res.status(200).json({  mcq: completion.choices[0].message.content});
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.'
        }
      });
    }
  }
}
