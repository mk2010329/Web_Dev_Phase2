

// import { Pie } from 'react-chartjs-2';
import React from 'react';
import PieApp from "./PieApp"
import CountApp from "./CountApp"
import BarApp from "./BarApp"
import LineApp from "./LineApp"
import styles from "@/app/page.module.css"

export default async function Home() {
    var response;

    // getting number of total users
     response = await fetch('http://localhost:3000/api/stats/getTotalUsers')
     const numTotalUsers = await response.json()

     // getting number of total items
     response = await fetch('http://localhost:3000/api/stats/getTotalItems')
     const numTotalItems = await response.json()

     // getting number of total transactions
     response = await fetch('http://localhost:3000/api/stats/totalSalesCount')
     const numTotalTransacs = await response.json()

     // getting Buyers Per Location 
     response = await fetch('http://localhost:3000/api/stats/getBuyersPerLocation')
     const buyersPerLocation = await response.json()
     
    return(
    <main className={styles.main}>

      {/* counters to show total number of users, items, etc. */}
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
          <h1><CountApp count={numTotalUsers}/></h1>
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
          <h1><CountApp count={numTotalItems}/></h1>
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
          <h1><CountApp count={numTotalTransacs}/></h1>
        </div>
      </div>
      
      <h1 style={{padding: "2em"}}>Stats in Detail:</h1>

      {/* Pie chart for distribution of item quantities */}
      {/* <h2>Quantity of Items Relative to each other:</h2>
      <div style={{padding: "2em"}} className={styles.gridGlance}>
        <div>
          {items.map((item) => (
            <div key={item.itemName} >
              <h2>{item.itemName}</h2>
              <p>Quantity : {item.quantity}</p>
            </div>
          ))}
        </div>
        <div className={styles.centerChart}>
          <PieApp />
        </div>
      </div> */}
      
      {/* bar chart  */}
      <h2>Total Buyers Per Location:</h2>
      <div>
        <BarApp userData={buyersPerLocation}/>
      </div>

      {/* Line chart */}
      {/* <h2>Items Most Bought Over the Last Six Months:</h2>
      <div>
        <LineApp />
      </div> */}
   

    </main>);
}
  