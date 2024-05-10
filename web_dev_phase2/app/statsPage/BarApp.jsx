'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';

export default function BarApp( {theLabels, theData} ) {

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
          }
        }
      }
      
      const labels = theLabels
      console.log(theLabels);
      const data = {
        labels,
        datasets: [
          {
            label: "Number of Buyers",
            data: theData,
            backgroundColor: "rgba(400, 23, 45, 0.6)"
          }
        ]
      }

  return(
    <div style={{ position: 'relative', width: 600, height: 600 }}>
      <Bar options={options} data={data} />
      </div>
  )
}
