import { useState } from "react"
import React from "react";

export async function fetchChatCompletion(question) {
    if (!question) {
        return;
      }
  
      let apiResponse;
  
      try {
        return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/openai/chatCompletion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: question }],
          }),
        }).then((response) => {
          if (!response.ok) {
            return Error(response);
          }
          return response.json();
        }).then((data) => {
            apiResponse = data.message;
            return apiResponse;
        })
      } catch (e) {
        console.log(e);
       return apiResponse = "Something is going wrong, Please try again.";
      }
}

const ChatbotApp = () => {

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");

  const onKeyDownHandler = async(event) => {
    if(event.key === 'Enter') {
        setLoading(true);
        const response = await fetchChatCompletion(prompt);
        console.log('response is ', response);
        setApiResponse(response);
        setLoading(false);
    }
  };

  return (
      <div>
          <input 
          type="text"
          placeholder="Message"
          className="form-control"
          value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(event) => onKeyDownHandler(event)}
          />

            {loading}
            {loading && !apiResponse && "Generating..."}
            {apiResponse && (
              <div
              >
                <strong>API response:</strong>
                {apiResponse}
              </div>
            )}
      </div>
  );
};


export default ChatbotApp;