import React from 'react';
import { Link } from 'react-router-dom';
import './gamepage.css'
import { Chart } from "react-google-charts";
import Rating from './rating';

function GamePage({ game }) {
  
  const data = [
    ["Task", "Hours per Day"],
    ["Positive", game.positive],
    ["Negative", game.negative],
    ["Neutral", game.neutral]
  ]
  const options = {
    title: "Sentiment Analysis",
    backgroundColor: 'transparent',
    titleTextStyle: {
      color: 'white', 
      fontSize: 20 
    },
    legendTextStyle: {
      color: 'white', 
      fontSize: 14 
    },
    height:500,
    width:600
  };
  console.log(game)
 
  const getColor = (rating) => {
    if (rating >= 80) {
      return 'green'; 
    } else if (rating >= 60) {
      return 'orange'; 
    } else {
      return 'red'; 
    }
  }
  
  return (
    <div className="game-page">
      <div className="game-header">
        <h1>{game.title}</h1>
        <Link to="/" className="back-link">Back to Games</Link>
      </div>
      <div className="game-details">
        <img src={game.src} alt={game.title} className="game-image" />
        <div className="description">
          <p>Description:
            {game.description}</p>
          <p>Release Date: {game.releaseDate}</p>
          <p>Genre: {game.genre}</p>
          <p>Platform: {game.platform}</p>
        </div>
        <div className="chart-container">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="rating-container">
        <Rating score={game.metacritic}/>
      </div>
      </div>
    </div>
  );
}

export default GamePage;