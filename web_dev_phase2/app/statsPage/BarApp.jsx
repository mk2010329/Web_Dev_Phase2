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
import ItemsRepo from "@/app/repo/ItemsRepo";
import React, { useState, useEffect } from 'react';
import { Metrophobic } from 'next/font/google';
import {faker} from "@faker-js/faker"

export default function PieApp() {

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
            text: "Chart.js Bar Chart"
          }
        }
      }
      
      const labels = ["January", "February", "March", "April", "May", "June", "July"]
      
      const data = {
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: "rgba(255, 99, 132, 0.5)"
          },
          {
            label: "Dataset 2",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: "rgba(53, 162, 235, 0.5)"
          }
        ]
      }

  return(
    <div style={{ position: 'relative', width: 600, height: 600 }}>
      <Bar options={options} data={data} />
      </div>
  )
}
