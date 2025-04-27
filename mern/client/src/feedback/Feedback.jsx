import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/Feedback.module.css';
import LogoutButton from '../signup-login/LogoutButton';
import { useNavigate } from 'react-router-dom';
import RecallContext from '../recall/RecallContext';
import NoteContext from '../notes/NoteContext';

function Feedback() {
  const ntx = useContext(NoteContext);
  const navigate = useNavigate();
  const rtx = useContext(RecallContext);

  const [curnote, setcurnote] = useState("");
  const [attemptacc, setAttemptAcc] = useState({ prev_attempt: "", prev_accuracy: "" });
  const [percent, setPercent] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPrevAttempt();
        await fetchNoteContent();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchPrevAttempt = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://echohaus-backend.onrender.com/api/v0/recall/${ntx.currentNote.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const json = await response.json();
    const latestArr = json.allarray[json.allarray.length - 1];
    const latestAcc = latestArr.accuracy[latestArr.accuracy.length - 1];
    const latestAns = latestArr.user_answer[latestArr.user_answer.length - 1];
    setAttemptAcc({ prev_accuracy: latestAcc, prev_attempt: latestAns });
  };

  const fetchNoteContent = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://echohaus-backend.onrender.com/api/v0/note/${ntx.currentNote.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const json = await response.json();
    setcurnote(json.text);
  };

  const buttonSubmit = async () => {
    const newData = {
      prev_attempt: attemptacc.prev_attempt,
      prev_accuracy: attemptacc.prev_accuracy,
      original_notes: curnote
    };

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
    Organize the feedback as a short, useful few sentences of what the person got wrong (don’t tell them what the correct answer is or anything that they missed).
    Here are the inputs:
    Original Notes: ${newData.original_notes}
    New recall attempt: ${rtx.currentRecall}`;

    try {
      const res = await fetch('https://echohaus-backend.onrender.com/api/v0/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();

      console.log('Generated Response:', data.response);

      const accuracyMatch = data.response.match(/Percentage:\s*(\d+)/);
      const feedbackMatch = data.response.match(/Feedback:\s*(.+)/s);

      const accuracy = accuracyMatch?.[1] || null;
      const feedbackValue = feedbackMatch?.[1] || "";

      console.log('Parsed Accuracy:', accuracy);
      console.log('Parsed Feedback:', feedbackValue);

      setPercent(accuracy);
      setFeedback(feedbackValue);

    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  useEffect(() => {
    if (percent !== null && feedback !== "") {
      updateRecalls();
    }
  }, [percent, feedback]);

  const updateRecalls = async () => {
    if (percent === null || feedback === "") {
      console.error('Accuracy or feedback is missing. Cannot update recalls (inside useEffect).');
      return;
    }

    const newrecall = {
      accuracy: percent,
      user_answer: rtx.currentRecall,
    };

    const token = localStorage.getItem('token');
    const response = await fetch(`https://echohaus-backend.onrender.com/api/v0/recall/${ntx.currentNote.id}`, {
      method: 'PUT',
      body: JSON.stringify(newrecall),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update recall data');
    }
  };

  const handleStudy = async () => {
    const token = localStorage.getItem('token');
    await fetch(`https://echohaus-backend.onrender.com/api/v0/recall/num/${ntx.currentNote.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
    })
    .catch((err) => {
      throw err;
    })
  };

  const handleRepeatStudy = () => {
    handleStudy();
    navigate("/study");
  };
  
  return (
    <div className={styles.feedback}>
      <div className={styles.container}>
        <h2 className={styles.phase}>Phase 4</h2>
        <h1 className={styles.title}>Feedback</h1>
        <div className={styles.notebook}>
          <div className={styles.textcontainer}>
            <div className={styles.text}>
              <div>
                <span className={styles.acc}>Accuracy:</span>
                {percent !== null ? `${percent}%` : null}
              </div>
              <div>{feedback}</div>
            </div>
          </div>
        </div>
        <LogoutButton />
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => navigate("/intermission")}>
            Repeat
          </button>
          <button className={styles.button} onClick={handleRepeatStudy}>
            I need to study more
          </button>
          <button className={styles.button} onClick={buttonSubmit} disabled={loading}>
            Show feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;