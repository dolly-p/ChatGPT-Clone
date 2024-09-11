import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"

dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//
let value = "hi"
async function getResponse(userMessage) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    //
    const chat = model.startChat();
    let result = await chat.sendMessage(userMessage);
    console.log(result.response.text());
}

getResponse(value)