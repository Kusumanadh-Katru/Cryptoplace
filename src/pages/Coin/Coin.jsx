import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';

const Coin = () => {
  const {coinId} = useParams();
  const [coinData , setCoinData] = useState(null);
  const {currency} = useContext(CoinContext)

  const fetchCoinData = async ()=>{
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-yqBJDtgQdq2vnkw422e2286j",
      },
    };

   try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data); // Set the fetched data
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };
  

  useEffect(() => {
    fetchCoinData();
  }, [coinId,currency]);

  // Render loading state if coinData is undefined or null
  if (!coinData) {
    return(
    <div className='spinner'>
      <div className='spin'></div>
    </div>)
  }
 
  return (
    <div className='coin'>
      <div className='coin-name'>
        <img src={coinData.image.large} alt={coinData.name}/>
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>

      </div>
        
    </div>
  )
  }

export default Coin