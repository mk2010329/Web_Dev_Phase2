'use client'

import React, {useState, useEffect} from "react";
import PieApp from "./PieApp";
import CountApp from "./CountApp";
import BarApp from "./BarApp";
import LineApp from "./LineApp";
import StackApp from "./StackApp";
import styles from "@/app/page.module.css";

export default function Home() {
  var response;

  const [numTotalUsers, setNumTotalUsers] = useState({})
  const [numTotalItems, setNumTotalItems] = useState({})
  const [numTotalTransacs, setTotalTransacs] = useState({})
  const [buyersPerLocation, setBuyersPerLocation] = useState("")
  const [purchasesPproductPyear, setPurchasesPproductPyear] = useState("")
  const [top3ProductsLast6Months, setTop3ProductsLast6Months] = useState("")
  const [purchasesPerMonth, setPurchasesPerMonth] = useState("")
  const [sellerUsers, setSellerUsers] = useState("")
  const [buyerUsers, setBuyerUsers] = useState("")
  const [itemsCount, setItemsCount] = useState("")

  
  useEffect(() => {

    // getting number of total users
    fetch("http://localhost:3000/api/stats/getTotalUsers")
    .then((response) => response.json())
      .then((data) => {
        setNumTotalUsers(data)
      })
  

    // getting number of total items
    fetch("http://localhost:3000/api/stats/getTotalItems")
      .then((response) => response.json())
        .then((data) => {
          setNumTotalItems(data)
        })
    

    // getting number of total transactions
    fetch("http://localhost:3000/api/stats/totalSalesCount")
      .then((response) => response.json())
        .then((data) => {
        setTotalTransacs(data)
        })
    

    // // getting Buyers Per Location
    fetch("http://localhost:3000/api/stats/getBuyersPerLocation")
      .then((response) => response.json())
        .then((data) => {
          setBuyersPerLocation(data)
        })

    // // Purchases Per Product Per Year
    fetch("http://localhost:3000/api/stats/getPurchasesPerProductPerYear")
      .then((response) => response.json())
        .then((data) => {
        setPurchasesPproductPyear(data)
        })
    

    // // top3ProductsLast6Months
    fetch("http://localhost:3000/api/stats/top3ProductsLast6Months")
      .then((response) => response.json())
        .then((data) => {
        setTop3ProductsLast6Months(data)
        })

    // // Purchases Per Month
    fetch("http://localhost:3000/api/stats/getPurchasesPerMonth")
      .then((response) => response.json())
        .then((data) => {
          setPurchasesPerMonth(data)
          })
    // // getSellerUsersWithItemCount
    fetch("http://localhost:3000/api/stats/getSellerUsersWithItemCount")
    .then((response) => response.json())
      .then((data) => {
        setSellerUsers(data)
        })
        
    // // getBuyerUsersWithItemCount
    fetch("http://localhost:3000/api/stats/getBuyerUsersWithItemCount")
    .then((response) => response.json())
      .then((data) => {
        setBuyerUsers(data)
        })

    // // getItemsCountByType
    fetch("http://localhost:3000/api/stats/getItemsCountByType")
    .then((response) => response.json())
      .then((data) => {
        setItemsCount(data)
        })
    
  }, [])

  

  return (
    <main className={styles.main}>
      {/* counters to show total number of users, items, etc. */}
      <h1 style={{ padding: "0.2em" }}>Stats at a Glance:</h1>
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
          <h1>
            <CountApp count={numTotalUsers} />
          </h1>
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
          <h1>
            <CountApp count={numTotalItems} />
          </h1>
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
          <h1>
            <CountApp count={numTotalTransacs} />
          </h1>
        </div>
      </div>

      <h1 style={{ padding: "2em" }}>Stats in Detail:</h1>

      {/* bar chart  */}
      <h2>Total Buyers Per Location:</h2>
      <div>
        <BarApp
          theLabels={buyersPerLocation && buyersPerLocation.map((d) => d.shippingAddress)}
          theData={buyersPerLocation && buyersPerLocation.map((d) => d._count.shippingAddress)}
        />
      </div>

      {/* bar chart  */}
      <h2>The Top 3 Products Bought Over the Last 6 Months:</h2>
      <div>
        <BarApp
          theLabels={top3ProductsLast6Months && top3ProductsLast6Months.map((p) => Object.values(p)[1])}
          theData={top3ProductsLast6Months && top3ProductsLast6Months.map((p) => Object.values(p)[0])}
        />
      </div>

      {/* Stacked bar chart  */}
      <h2>Number of Purchases Per Product Per Year:</h2>
      <div>
        <StackApp 
          theLabels={Object.keys(purchasesPproductPyear)}
          theData={purchasesPproductPyear} 
        />
      </div>

      {/* Line chart */}
      <h2>Number of Purchases Per Month:</h2>
      <div>
        <LineApp 
          theLabels={Object.keys(purchasesPerMonth)}
          theData={Object.keys(purchasesPerMonth)
            .map(month => purchasesPerMonth[month]["totalAmount"])}
        />
      </div>

      {/* Pie chart for distribution of item quantities */}
      <h2>Number Of Buyers and Sellers Relative to Each Other:</h2>
      <div className={styles.centerChart}>
        <PieApp
          theLabels={["Sellers", "Buyers"]}
          theData={[sellerUsers.length, buyerUsers.length]}
        />
      </div>
      <br />
      <br />
      <h2>Quantity of Items Being Sold Relative to Each Other:</h2>
      <div className={styles.centerChart}>
        <PieApp
          theLabels={itemsCount && itemsCount.map(item => item["itemName"])}
          theData={itemsCount && itemsCount.map(item => item["_count"]["itemName"])}
        />
      </div>
      
    </main>
  );
}
