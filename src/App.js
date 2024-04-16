import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Collection } from '@aws-amplify/ui-react';
import GameCard from './gamecard.js';
import GamePage from './gamepage.js'; 
import './App.css'
import { DataStore } from '@aws-amplify/datastore';
import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json';
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';
import { listSentimentDatas } from './graphql/queries';
Amplify.configure(config);


const client = generateClient();
/*
const newTodo = await client.graphql({
  query: createTodo,
  variables: {
      input: {
  "name": "Ghosts of Tsushima",
  "description": "Uncover the hidden wonders of Tsushima in this open-world action adventure from Sucker Punch Productions and PlayStation Studios, available for PS5 and PS4.\nForge a new path and wage an unconventional war for the freedom of Tsushima. Challenge opponents with your katana, master the bow to eliminate distant threats, develop stealth tactics to ambush enemies and explore a new story on Iki Island.",
  "img_link": "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/b3iB2zf2xHj9shC0XDTULxND.png",
  "before_pos": 0.7056629657745361,
  "before_neutral": 0.032207898795604706,
  "before_negative": 0.032207898795604706,
  "metacritic": 83.0
}
  }
});
*/
const result = await client.graphql({ query: listSentimentDatas });
console.log(result);


//const result = await client.graphql({ query: listTodos });
//console.log(result);




//import { API, graphqlOperation } from 'aws-amplify';
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const result = await client.graphql({ query: listSentimentDatas });
      setData(result.data.listSentimentData.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const games = data.map(item => ({
    title: item.Game, 
    src: item.Image, 
    link: `/${item.Game}`, 
    neutral: item.Neutral,
    positive: item.Positive,
    negative: item.Negative,
    description: item.Description,
    platform:    item.Platforms,
    genre:    item.Genre,
    release:   item.ReleaseDate,
    metacritic: item.Metacritic
  }));

  /*[

    {
      title: 'Call of Duty',
      src: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Black_Ops_3.jpg',
      link: '/call-of-duty',
    },
    {
      title: 'Spider-Man 2',
      src: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/2028edeaf4c0b60142550a3d6e024b6009853ceb9f51591e.jpg',
      link: '/spider-man-2',
    },
    {
      title: 'Minecraft',
      src: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/811461b8d1cacf1f2da791b478dccfe2a55457780364c3d5a95fbfcdd4c3086f',
      link: '/minecraft',
    },
    // Other game objects
  ];
*/


  return (
    <Router>
      <div className="container">
      <div className="center-text">S.A.B.E.R</div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <Collection items={games} type="list" direction="row" gap="20px" wrap="nowrap">
                {(item, index) => (
                  <GameCard key={index} {...item} />
                )}
              </Collection>
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
