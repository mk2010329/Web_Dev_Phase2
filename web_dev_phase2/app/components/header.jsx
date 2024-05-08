import React from 'react'
import styles from '@/app/components/header.css'
import Link from 'next/link'

export default function header() {
    return (

    <header id="headbar" className={styles.headBar}>
            <h1><a href="home_page.html">Qtech</a></h1>
            <div id="centerDiv" className={styles.centerDiv}>
                <ul class="ulbar" className={styles.ulbar}>
                <li><a href="/home_page.html">HOME</a></li>
                <li><a href="/home_page.html#heading-id">CATEGORIES</a></li>
                <li><a href="/upload.html">SELL</a></li>
                {/* <li><a href="/statsPage">STATISTICS</a></li> */}
                </ul>
            </div>

             <div>
                    <ul id="rightHeader" class="ulbar" className={styles.ulbar}>
                    <li>
                <a href="/purchase/purchase.html"
                ><img src="/images/icons/shopping-cart.svg" alt="shopping-cart icon"
                /></a>
                </li>

                <li>
                    <a href="/seller_portfolio/index.html"
                    ><img src="/images/icons/user-round.svg" alt="user icon"
                    /></a>
                </li>
                <li id="log-in-icon" class="hidden" className={styles.hidden}>
                    <a href=""><img src="/images/icons/log-in.svg" alt="log out icon" /></a>
                </li>

                <li>
                    <a href="/login.html"
                    ><img src="/images/icons/log-out.svg" alt="log in icon"
                    /></a>
                </li>
                </ul>
            </div>
        </header>
   
    )
}

{/* <ul>
<li><Link href="/">Home</Link></li>
<li><Link href="/accounts/add">Add Account</Link></li>
<li><Link href="/accounts/transaction">Transaction</Link></li>
</ul> */}