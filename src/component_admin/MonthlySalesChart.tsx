import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const defaultChartData = {
  labels: [],
  datasets: [],
};

function MonthlySalesChart() {
  const [chartData, setChartData] = useState(defaultChartData);

  useEffect(() => {
    axios.get('http://localhost:3001/e-Ectro/command/monthly-sales')
      .then(response => {
        const data = response.data;
        const labels: string[] = [];
        const datasets = {};

        data.forEach((item: { _id: { year: any; month: any; }; totalSales: any; }) => {
          const { year, month } = item._id;
          const label = `${year}-${String(month).padStart(2, '0')}`;
          if (!labels.includes(label)) {
            labels.push(label);
          }
          if (!datasets[year]) {
            datasets[year] = {
              label: year,
              data: [],
              fill: false,
              borderColor: getRandomColor(),
              tension: 0.1,
            };
          }
          datasets[year].data.push(item.totalSales);
        });

        const formattedDatasets = Object.values(datasets);
        const updatedChartData = {
          labels: labels.sort(),
          datasets: formattedDatasets,
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
          stepSize: 1000, // Ajustez cette valeur en fonction de vos données
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default MonthlySalesChart;
