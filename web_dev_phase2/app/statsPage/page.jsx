
import ItemsRepo from "@/app/repo/ItemsRepo";
// import { Pie } from 'react-chartjs-2';
import React from 'react';
import PieApp from "./PieApp"

export default async function Home() {

    // const totalPurchasesPerItemPerYear = await ItemsRepo.getTotalPurchasesPerItemPerYear();
    // const top3ItemsLastSixMonths = await ItemsRepo.getTop3ItemsLastSixMonths();
     const response = await fetch('http://localhost:3000/api/items')
     const items = await response.json()
    // const items = await ItemsRepo.getAllItems()
    return(
    <main>
        {/* <h1>{totalPurchasesPerItemPerYear}</h1>
        {top3ItemsLastSixMonths.map((item) => (
        <div key={item.itemId}>
          <h2>{item.itemId}</h2>
          <p>Date : {item.dateOfPurchase}</p>
        </div>
      ))} */}

      {items.map((item) => (
        <div key={item.itemName}>
          <h2>{item.itemName}</h2>
          <p>Quantity : {item.quantity}</p>
        </div>
      ))}
      
      <PieApp />

    </main>);
}
  