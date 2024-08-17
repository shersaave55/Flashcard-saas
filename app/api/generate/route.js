/*
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = `
You are a flashcard creator. You take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(req) {
  const data = await req.text();

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro", // Ensure you use the correct model name
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  // Send the system prompt with the user data to Gemini AI
  const result = await chatSession.sendMessage(systemPrompt + data);

  // Assuming the result is in the format we expect (plain text containing JSON)
  let flashcards;
  try {
    flashcards = JSON.parse(result.response.text());
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse response from Gemini AI' }, { status: 500 });
  }

  return NextResponse.json(flashcards.flashcard);
} */

  import { NextResponse } from "next/server";
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  const systemPrompt = `
  You are a Flashcard Generator AI designed to help users create effective, customizable flashcards for learning and memorization.
  Your primary goal is to generate flashcards based on user-provided content, criteria, and preferences. 
  The flashcards should be well-organized, easy to understand, and tailored to the user's input.
  
  Understand and interpret user inputs, whether they are text, lists, questions, definitions, formulas, images, or a mix of these.
  Recognize the context of the content (e.g., academic subject, language learning, test preparation) to generate appropriate flashcard content.
  
  Create flashcards with a clear structure: a question or prompt on one side and an answer or explanation on the other.
  
  The user will specify the number of flashcards to generate and the type of flashcards. Adhere to these specifications.
  If they ask for 0 flashcards, they want you to decide on the number of flashcards. Please decide on an appropriate number based on the notes provided.
  
  These are the flashcard types, please only generate the types indicated by the user (
  Question and Answer: Simple question on one side, answer on the other.
  Fill-in-the-Blank: Partial statements or formulas that require completion.
  Multiple Choice: A question with several answer options, including the correct one.
  True/False: Statements where the user needs to determine the validity.
  Concept Explaination: One side is the name of the concept, the other side is an explaination.
  )
  
  Return the flashcards in the following JSON format:
      {
          "flashcards":[
              {
                  "front": "Front of the card",
                  "back": "Back of the card"
              }
          ]
      }
  Do not include any markdown formatting such as \`\`\`json in your response.
  Analyze the given text thoroughly and create flashcards that effectively aid in learning and retention of the material.`;
  
  const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
  });
  
  export async function POST(req) {
      const { text, numFlashcards, flashcardTypes } = await req.json();
      
      try {
          const result = await model.generateContent([
              { text: systemPrompt },
              { text: `Number of flashcards: ${numFlashcards}` },
              { text: `Types of flashcards: ${flashcardTypes.join(', ')}`},
              { text: text }
          ]);
          
          const response = result.response;
          let responseText = response.text();
          
          // Remove any markdown formatting
          responseText = responseText.replace(/```json\n?|\n?```/g, '');
          console.log('Raw API response:', responseText);
          // Attempt to parse the JSON
          const flashcardsJson = JSON.parse(responseText);
          
          return NextResponse.json(flashcardsJson.flashcards);
      } catch (error) {
          console.error('Error generating flashcards:', error);
          return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
      }
  }