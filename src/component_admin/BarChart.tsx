import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const defaultChartData = {
  labels: [],
  datasets: [
    {
      label: 'Quantité vendue',
      data: [],
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    },
  ],
};

function BarChart() {
  const [chartData, setChartData] = useState(defaultChartData);

  useEffect(() => {
    axios.get('http://localhost:3001/e-Ectro/command/sales')
      .then(response => {
        const data = response.data;
        const labels = data.map((item: { _id: any; }) => item._id);
        const quantities = data.map((item: { totalQuantity: any; }) => item.totalQuantity);

        const updatedChartData = {
          ...defaultChartData,
          labels: labels,
          datasets: [
            {
              ...defaultChartData.datasets[0],
              data: quantities,
            },
          ],
        };
        setChartData(updatedChartData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

 
    const options = {
        
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Ajustez cette valeur pour définir l'intervalle des graduations
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
