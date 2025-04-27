import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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

// Register necessary components for Chart.js
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
  // Initial study session data (first round) - Time since the note was uploaded
  const [timeArray1, setTimeArray1] = useState([0, 12, 24, 48, 72]); // Time in hours since the note was uploaded
  const [accuracyArray1, setAccuracyArray1] = useState([100, 85, 75, 60, 50]); // First session accuracies

  // Second study session data (after revisiting the notes) - Time since the first upload
  const [timeArray2, setTimeArray2] = useState([96, 108, 120, 144, 168]); // Time since first upload in hours
  const [accuracyArray2, setAccuracyArray2] = useState([100, 90, 85, 80, 75]); // Second session accuracies (improved after reviewing)

  // Prepare data for the chart (pair time and accuracy for both sessions)
  const data1 = timeArray1.map((time, index) => ({
    x: time,
    y: accuracyArray1[index],
  }));

  const data2 = timeArray2.map((time, index) => ({
    x: time,
    y: accuracyArray2[index],
  }));

  // Chart.js datasets configuration for both lines
  const datasets = [
    {
      label: 'First Study Session (Original)',
      data: data1,
      fill: false,
      borderColor: 'rgb(75, 192, 192)', // First line color
      tension: 0.1,
      pointRadius: 5,
      pointBackgroundColor: 'rgb(75, 192, 192)', // Color for points
      borderWidth: 2,
    },
    {
      label: 'Second Study Session (After Review)',
      data: data2,
      fill: false,
      borderColor: 'rgb(255, 99, 132)', // Second line color (a different color for differentiation)
      tension: 0.1,
      pointRadius: 5,
      pointBackgroundColor: 'rgb(255, 99, 132)', // Color for points in the second line
      borderWidth: 2,
    },
  ];

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Time Since First Upload (hours)', // Show the time since the first upload
        },
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Accuracy Percentage',
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
            return `${tooltipItem.raw.y.toFixed(2)}%`; // Show percentage with two decimal points
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      },
    },
    chartArea: {
      backgroundColor: 'white',
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={{ datasets }} options={options} />
    </div>
  );
};

export default ForgettingCurveChart;
