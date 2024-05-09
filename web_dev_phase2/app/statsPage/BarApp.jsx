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
import * as ItemsRepo from "@/app/repo/ItemsRepo";
import React, { useState, useEffect } from 'react';
import { Metrophobic } from 'next/font/google';
import {faker} from "@faker-js/faker"

export default function BarApp( {userData} ) {

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
      
      const labels = userData.map(d => d.shippingAddress)
      
      const data = {
        labels,
        datasets: [
          {
            label: "Number of Buyers",
            data: userData.map(d => d._count.shippingAddress),
            backgroundColor: "rgba(0, 0, 0, 0.6)"
          }
        ]
      }

  return(
    <div style={{ position: 'relative', width: 600, height: 600 }}>
      <Bar options={options} data={data} />
      </div>
  )
}
