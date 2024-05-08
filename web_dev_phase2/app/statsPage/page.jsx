
import ItemsRepo from "@/app/repo/ItemsRepo";
// import { Pie } from 'react-chartjs-2';
import React from 'react';
import PieApp from "./PieApp"
import CountApp from "./CountApp"
import styles from "@/app/page.module.css"

export default async function Home() {

    // const totalPurchasesPerItemPerYear = await ItemsRepo.getTotalPurchasesPerItemPerYear();
    // const top3ItemsLastSixMonths = await ItemsRepo.getTop3ItemsLastSixMonths();
     const response = await fetch('http://localhost:3000/api/items')
     const items = await response.json()
    // const items = await ItemsRepo.getAllItems()
    return(
    <main className={styles.main}>

      <h1 style={{padding: "0.2em"}}>Stats at a Glance:</h1>
      <div className={styles.gridGlance}>
        <div className={styles.card}>
            <img
              src="/person.png"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          <h2>Total Users</h2>
          <h1><CountApp count={67}/></h1>
        </div>
        <div className={styles.card}>
            <img
              src="/shopping_bag.png"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          <h2>Total Items</h2>
          <h1><CountApp count={123}/></h1>
        </div>
        <div className={styles.card}>
            <img
              src="/payments.png"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          <h2>Total Transactions</h2>
          <h1><CountApp count={456}/></h1>
        </div>
      </div>
      
      <h1 style={{padding: "2em"}}>Stats in Detail:</h1>

      <div style={{padding: "2em"}}>
        {items.map((item) => (
          <div key={item.itemName} className={styles.grid}>
            <h2>{item.itemName}</h2>
            <p>Quantity : {item.quantity}</p>
          </div>
        ))}
        <PieApp />
      </div>
      

          <p>Date : 6th may 2024</p>
   

    </main>);
}
  