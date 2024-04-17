import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameCard from './gamecard.js';
import GamePage from './gamepage.js'; 
import './App.css'
import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json';
import { listTodos } from './graphql/queries';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


Amplify.configure(config);


const client = generateClient();

function App() {
  const [data, setData] = useState([]);
  const [genreFilter, setGenreFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await client.graphql({ query: listTodos });
      setData(result.data.listTodos.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const games = data.filter(item => {
    if (genreFilter && item.genre !== genreFilter) {
      return false;
    }
    if (priceFilter && item.price > priceFilter) {
      return false;
    }
    return true;
  }).map(item => ({
    title: item.title,
    src: item.src,
    link: `/game/${item.title.toLowerCase().replace(/\s+/g, '-')}`,
    neutral: item.neu,
    positive: item.pos,
    negative: item.neg,
    description: item.description,
    metacritic: item.metacritic,
    genre: item.genre,
    platform: item.platform,
    releaseDate: item.releaseDate,
    price: item.price 
  }));

  return (
    <Router>
      <div className="container">
        <div className="center-text">S.A.B.E.R</div>
        <div className="main-content">
          <div className="filters">
            <label>
              Genre:
              <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="Survival">Survival</option>
                {/* Add more genres as needed */}
              </select>
            </label>
            <label>
              Max Price:
              <input
                type="number"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
              />
            </label>
          </div>
          <Routes>
            <Route path="/" element={
              <div>
                {games.map((game, index) => (
                  <GameCard key={index} title={game.title} src={game.src} link={game.link} />
                ))}
              </div>
            } />
            {games.map((game) => (
              <Route key={game.title} path={game.link} element={<GamePage game={game} />} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;