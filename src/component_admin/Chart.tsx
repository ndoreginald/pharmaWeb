import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const defaultChartData = {
  pie: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  },
  line: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  },
  bar: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'orders',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  },
};

type ChartProps = {
  type: 'pie' | 'line' | 'bar';
};

function Chart({ type }: ChartProps) {
  const [chartData, setChartData] = useState(defaultChartData[type]);

  useEffect(() => {
    axios.get('http://localhost:3001/e-Ectro/command/')
      .then(response => {
        const data = response.data;
        // Agréger les données pour le graphique à secteurs
        if (type === 'pie') {
          const aggregatedData = data.reduce((acc, item) => {
            if (!acc[item.paymentMethod]) {
              acc[item.paymentMethod] = 0;
            }
            acc[item.paymentMethod] += item.total;
            return acc;
          }, {});

          const labels = Object.keys(aggregatedData);
          const values = Object.values(aggregatedData);

          const updatedChartData = {
            ...defaultChartData[type],
            datasets: [
              {
                ...defaultChartData[type].datasets[0],
                data: values,
              },
            ],
            labels: labels,
          };
          setChartData(updatedChartData);
        } else {
          // Traitez les autres types de graphiques ici
          const updatedChartData = {
            ...defaultChartData[type],
            datasets: [
              {
                ...defaultChartData[type].datasets[0],
                data: data.map(item => item.total), // Supposons que les données contiennent un champ 'value'
              },
            ],
            labels: data.map(item => item.paymentMethod), // Supposons que les données contiennent un champ 'label'
          };
          setChartData(updatedChartData);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [type]);

  switch (type) {
    case 'pie':
      return <Pie data={chartData} />;
    case 'line':
      return <Line data={chartData} />;
    case 'bar':
      return <Bar data={chartData} />;
    default:
      return null;
  }
}

export default Chart;
