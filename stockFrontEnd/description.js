

async function getDescription(ticker) {
    if (!ticker) {
        return "No ticker provided."
    }
    if (localStorage[`description_${ticker}`]) {
        return localStorage[`description_${ticker}`]
    }
    const API_KEY = "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"
    return fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          //"HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
          //"X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.1-8b-instruct:free",
          "messages": [
            {
              "role": "user",
              "content": `In a few sentences, describe ${ticker}`
            }
          ]
        })
      }).then(response => response.json()).then(data => {
        let content = data.choices[0].message.content
        localStorage[`description_${ticker}`] = content
        return content
      }).catch(error => console.error(error));
}

export default getDescription;