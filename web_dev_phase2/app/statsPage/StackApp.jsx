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
import {faker} from "@faker-js/faker"

export default function StackApp( {theLabels, theData} ) {

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
    
    const options = {
        plugins: {
          title: {
            display: true,
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
    }
      
    const labels = theLabels

    const data = {
        labels,
        datasets: [
            {
            label: "Headphones",
            data: theLabels.map(year => theData[year]["Headphones"]["totalAmount"]),
            backgroundColor: "rgb(255, 99, 132)"
            },
            {
            label: "Laptop",
            data: theLabels.map(year => theData[year]["Laptop"]["totalAmount"]),
            backgroundColor: "rgb(75, 192, 192)"
            },
            {
            label: "Phone",
            data: theLabels.map(year => theData[year]["Phone"]["totalAmount"]),
            backgroundColor: "rgb(53, 162, 235)"
            },
            {
            label: "Desktop",
            data: theLabels.map(year => theData[year]["Desktop"]["totalAmount"]),
            backgroundColor: "rgb(53, 192, 25)"
            }
        ]
    }

  return(
    <div style={{ position: 'relative', width: 600, height: 600 }}>
      <Bar options={options} data={data} />
    </div>
  )
}
