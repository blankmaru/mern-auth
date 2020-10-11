import React from 'react'
import { Header, Button } from 'semantic-ui-react'

import axios from 'axios'

const Home = () => {
  const getData = (e) => {
    e.preventDefault();

    axios.get("/api/users").then(res => {
      console.log(res.data);
    });
  };

  return(
    <div style={{marginTop: '2rem'}}>
      <Header size='medium'>Home Page</Header>
      <Button onClick={getData}>
        GET
      </Button>
    </div>
  )
} 

export default Home