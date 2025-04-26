import { useState } from 'react';

function GeminiGenerator() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setResponse(data.response); // Display generated content
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <div>
      <h1>Gemini Content Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleGenerate}>Generate Content</button>
      {response && <div><strong>Generated Content:</strong><p>{response}</p></div>}
    </div>
  );
}

export default GeminiGenerator;