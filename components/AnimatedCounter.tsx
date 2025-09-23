'use client'
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount}:{amount: number}) => {
  return (
    <div className='w-full'>
        <CountUp 
        start={0} 
        prefix="$" 
        end={amount} 
        duration={2} 
        separator="," 
        decimals={2}
        />
    </div>
  )
}

export default AnimatedCounter