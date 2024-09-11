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




//for the textarea

const textarea = document.getElementById('prompt-textarea');
  const sendButton = document.getElementById('send-button');

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      console.log('Sending message:', textarea.value);
      textarea.value = '';
    } else if (e.key === 'Enter' && e.shiftKey ) {
      e.preventDefault();
      const currentValue = textarea.value;
      const cursorPosition = textarea.selectionStart;
      const newLine = '\n';
      textarea.value = currentValue.substring(0, cursorPosition) + newLine + currentValue.substring(cursorPosition);
      textarea.selectionStart = cursorPosition + 1;
      textarea.selectionEnd = cursorPosition + 1;
      textarea.focus();
    }
  });

  sendButton.addEventListener('click', () => {
    
    console.log('Sending message:', textarea.value);
    
    textarea.value = '';
  });