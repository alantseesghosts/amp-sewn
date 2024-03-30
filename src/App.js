// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Collection } from '@aws-amplify/ui-react';
import GameCard from './gamecard.js';
import GamePage from './gamepage.js'; // Assuming this is where your individual game pages are located
import './App.css'
import { DataStore } from '@aws-amplify/datastore';
import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json';
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
Amplify.configure(config);


const client = generateClient();
/*
const newTodo = await client.graphql({
  query: createTodo,
  variables: {
      input: {
  "name": "https://assets-prd.ignimgs.com/2022/03/09/planetzoo-1646788240786.jpg",
  "description": "https://assets-prd.ignimgs.com/2022/03/09/planetzoo-1646788240786.jpg",
  "img_link": "https://assets-prd.ignimgs.com/2022/03/09/planetzoo-1646788240786.jpg",
  "before_pos": 0.7056629657745361,
  "before_neutral": 0.032207898795604706,
  "before_negative": 0.032207898795604706,
  "metactritic": 79.0
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
    title: item.name, // Assuming name is the field in DynamoDB containing the game name
    src: item.img_link, // You can use a default image or item.image if you have image data in your DynamoDB
    link: `/${item.name}`, // You can use item.id or any other unique identifier for the link
    neutral: item.before_neutral,
    description: item.description
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
