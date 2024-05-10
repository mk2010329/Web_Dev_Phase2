'use client'

import React from "react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Line } from "react-chartjs-2"
import {faker} from "@faker-js/faker"

export default function LineApp( {theLabels, theData} ) {

    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    )

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

    const data = {
    labels,
    datasets: [
        {
        label: "Number Of Purchases",
        data: theData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
    ]
    }


    return (
        <div style={{ position: 'relative', width: 600, height: 600 }}>
            <Line options={options} data={data} />
        </div>
    
    )
}