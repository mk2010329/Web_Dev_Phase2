'use client'

import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

export default function CountApp( {count} ) {

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

  return(
   
      <CountUp end={count} delay={0.5} duration={5}/>
      
  ) ;
}
