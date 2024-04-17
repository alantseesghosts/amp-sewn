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
import { listTodos } from './graphql/queries';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


Amplify.configure(config);


const client = generateClient();
/*
const newTodo = await client.graphql({
  query: createTodo,
  variables: {
      input: {
  "title": "Lorem ipsum dolor sit amet",
  "description": "Lorem ipsum dolor sit amet",
  "price": 70,
  "platform": "Lorem ipsum dolor sit amet",
  "src": "Lorem ipsum dolor sit amet",
  "releaseDate": "Lorem ipsum dolor sit amet",
  "genre": "Lorem ipsum dolor sit amet",
  "metacritic": 20,
  "pos": 123.45,
  "neg": 123.45,
  "neu": 123.45
}
  }
});
*/
const result = await client.graphql({ query: listTodos });
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
      const result = await client.graphql({ query: listTodos });
      setData(result.data.listTodos.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const games = data.map(item => ({
    title: item.title, 
    src: item.src, 
    link: `/${item.title}`, 
    neutral: item.neu,
    positive: item.pos,
    negative: item.neg,
    description: item.description,
    metacritic: item.metacritic,
    genre:item.genre,
    platform:item.platform,
    releaseDate: item.releaseDate
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
            <div>
              {games.map((game, index) => (
                <GameCard key={index} title={game.title} src={game.src} link={`/${game.title}`} />
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
