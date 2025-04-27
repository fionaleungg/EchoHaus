import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import NoteContext from '../notes/NoteContext'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ForgettingCurveChart = () => {
  const ntx = React.useContext(NoteContext);
  const [recalls, setRecalls] = useState([]);
  const [firstrecall, setFirstRecall] = useState("");

  useEffect(() => {
    fetchPrevAttempt();
    fetchNoteContent();
  }, []);

  const fetchPrevAttempt = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5050/api/v0/recall/${ntx.currentNote.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const json = await response.json();
    setRecalls(json.allarray || []);
  };

  const fetchNoteContent = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5050/api/v0/note/${ntx.currentNote.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const json = await response.json();
    setFirstRecall(json.time_uploaded);
  };

  const firstTimeRecalled = firstrecall;
  // Dynamically build datasets
  const datasets = (recalls || []).map((session, sessionIndex) => {
    const sessionData = (session.accuracy || []).map((_, i) => {
  
  if (!firstTimeRecalled) return { data: [] };
      const timeRecalled = session.time_recalled?.[i];
    
    // Calculate the time difference in hours between the current timeRecalled and the first timeRecalled
    const timeDiffInHours = timeRecalled ? (new Date(timeRecalled).getTime() - new Date(firstTimeRecalled).getTime()) / (1000 * 60 * 60) : null;

    return {
      x: timeDiffInHours,
        y: parseFloat(session.accuracy[i]) || 0,
      };
    }).filter(point => point.x !== null);

    const colors = [
      'rgb(75, 192, 192)',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 206, 86)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)',
    ];

    return {
      label: `Session ${sessionIndex + 1}`,
      data: sessionData,
      fill: false,
      borderColor: colors[sessionIndex % colors.length],
      tension: 0.1,
      pointRadius: 5,
      pointBackgroundColor: colors[sessionIndex % colors.length],
      borderWidth: 2,
    };
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Time Recalled (hours)', // Time in hours
        },
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Accuracy (%)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw.y.toFixed(2)}%`;
          },
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={{ datasets }} options={options} />
    </div>
  );
};

export default ForgettingCurveChart;
