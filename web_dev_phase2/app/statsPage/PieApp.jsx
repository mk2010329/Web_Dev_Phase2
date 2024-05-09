'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import * as ItemsRepo from "@/app/repo/ItemsRepo";
import React, { useState, useEffect } from 'react';
import { Metrophobic } from 'next/font/google';

export default function PieApp() {

  ChartJS.register(ArcElement, Tooltip, Legend);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items')
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const data = {
    labels: items.map(i => i.itemName),
    datasets: [
      {
        label: 'Quantity of Items',
        data: items.map(i => i.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return(
    <div style={{ position: 'relative', width: 400, height: 400 }}>
      <Pie data={data} />
      </div>
  ) ;
}
