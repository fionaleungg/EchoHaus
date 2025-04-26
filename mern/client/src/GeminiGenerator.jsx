import React from 'react';
import { useState } from 'react';
import RecallContext from './recall/RecallContext';

function GeminiGenerator() {
  const rtx = React.useContext(RecallContext);
  const [generationData, setGenerationData] = useState({prev_attempt: "", prev_accuracy: "", original_notes: ""});
  const [response, setResponse] = useState('');
  const new_attempt = rtx.currentRecall;
  
  const buttonSubmit = async () => {
    const newData = {
      prev_attempt: 'The fundamental frequency is the lowest frequency',
      prev_accuracy: 15,
      original_notes: `What is the fundamental frequency? How does perception change when the fundamental frequency is removed?

      The fundamental frequency of a complex sound is the lowest common denominator of the frequencies of the simple tones that make up the complex sound. The perceived pitch of the sound may change if the fundamental frequency is removed. If the fundamental frequency is removed, but the other frequencies that make up the complex tone still have a lowest common denominator that is equivalent to the fundamental frequency, we will still perceive the sound as having an unchanged pitch. However, if that fundamental frequency is removed and the lowest common denominator frequency is no longer equivalent to the fundamental frequency, then we will perceive the sound as having a different pitch.`,
    };

    setGenerationData(newData);

  const prompt = `I will give you my original notes and my new attempt at recalling them. 

  Previous recall attempt: ${newData.prev_attempt}

  Previous recall accuracy percentage: ${newData.prev_accuracy}

  Please rate the overall accuracy of the new recall as a single percentage (0–100%), based on the following criteria:

  How accurate the definition is

  How complete the explanation is

  Whether important terminology is preserved

  Whether the logic and meaning are consistent with the original

  Then provide:

  Percentage: <>

  Feedback: <>

  Organize the feedback as a short, useful list of what the person got wrong (don’t tell them what the correct answer is or anything that they missed).

  Here are the inputs:

  Original Notes: ${newData.original_notes}

  New recall attempt: ${new_attempt}
  `;

    try {
      console.log(prompt);
      const res = await fetch('http://localhost:5050/api/v0/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setResponse(data.response); // Display generated content
      const accuracyMatch = data.response.match(/Percentage:\s*(\d+)/);
      const feedbackMatch = data.response.match(/Feedback:\s*(.+)/s); // 's' flag allows dot to match newlines

      const accuracy = accuracyMatch?.[1] || '';
      const feedback = feedbackMatch?.[1] || '';

      console.log('Parsed Accuracy:', accuracy);
      console.log('Parsed Feedback:', feedback);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <div>
      <button onClick={buttonSubmit}>Generate Content</button>
      {response && <div><strong>Generated Content:</strong><p>{response}</p></div>}
    </div>
  );
}

export default GeminiGenerator;