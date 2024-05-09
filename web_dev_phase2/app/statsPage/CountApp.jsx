'use client'

import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

export default function CountApp( {count} ) {

  return(
   
      <CountUp end={count} delay={0.5} duration={5}/>
      
  ) ;
}
