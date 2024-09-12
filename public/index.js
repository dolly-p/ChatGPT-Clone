const textarea = document.getElementById('prompt-textarea');
const sendButton = document.getElementById('send-button');
const deleteButton = document.getElementById('delete-button');
const messageContainer = document.querySelector("#message-container");
const suggestionBox = document.querySelector(".suggestion-box")
const API_KEY = "AIzaSyDxrRFFFj8LZ-IUqFSpLqogmWY56bcflEo"

const getResponse = async(value)=>{
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "contents": [{
        "parts":[{"text": value}]
        }]
        })
    })
    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    lsSet(text,text)
    aiResponseCard(text);
}

// get items stores in local storage i mean ls anyhow
const getItemsInOrder = (()=>{
    // Retrieve the keyOrder array from localStorage
    let keyOrder = JSON.parse(localStorage.getItem('keyOrder')) || [];
    console.log(keyOrder)
    if (keyOrder.length >= 1){
        for (let i=0; i < keyOrder.length;){
            userCard(localStorage.getItem(keyOrder[i]))
            aiResponseCard(localStorage.getItem(keyOrder[i+1]));
            i = i + 2
            console.log(i)
        }
    }
  })()

textarea.addEventListener('keydown', async(e) => {
    textarea.style.color = "white"
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        lsSet(textarea.value,textarea.value)
        userCard(lsGet(textarea.value))
        getResponse(lsGet(textarea.value));
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




//the user's prompt
function userCard (userInput){
        suggestionBox.style.display = "none";
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'flex items-center gap-2 py-2';
        const userIcon = document.createElement('img');
        userIcon.src = 'images/boy.jpg'; 
        userIcon.className = 'w-[20px] h-[20px] rounded-md';
        const userMessage = document.createElement('p');
        userMessage.textContent = userInput;
        userMessage.className = 'text-black dark:text-white';
        userMessageDiv.appendChild(userIcon);
        userMessageDiv.appendChild(userMessage);
        messageContainer.appendChild(userMessageDiv);
}


//the ai response div
function aiResponseCard (response){
        const aiResponseDiv = document.createElement('div');
        aiResponseDiv.className = 'flex items-center gap-2 py-2'; 

        const aiIcon = document.createElement('img');
        aiIcon.src = 'images/torch.png';  
        aiIcon.className = 'w-[20px] h-[20px]';
            
        const aiMessage = document.createElement('p');
        aiMessage.textContent = response;
        aiMessage.className = 'text-gray-600 dark:text-gray-400'; 
        aiResponseDiv.appendChild(aiIcon);
        aiResponseDiv.appendChild(aiMessage);
        messageContainer.appendChild(aiResponseDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
}

//send icon 
sendButton.addEventListener('click', () => {
        const userInput = textarea.value.trim();
        textarea.value = '';
        lsSet(userInput,userInput)
        userCard(lsGet(userInput))
        getResponse(lsGet(userInput));
  });

// delete icon
deleteButton.addEventListener('click', ()=> {
    textarea.value = "";
})

// local storage setting
function lsSet(key,value){
    localStorage.setItem(key, value);
    let keyOrder = JSON.parse(localStorage.getItem('keyOrder')) || [];
    keyOrder.push(key);
    localStorage.setItem('keyOrder', JSON.stringify(keyOrder));
}

// local storage getting
function lsGet(name){
    return localStorage.getItem(name)
}

