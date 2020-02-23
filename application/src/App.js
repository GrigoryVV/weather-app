import React from 'react';
import { Container } from '@material-ui/core';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

client.query({
  query: gql`
    {
      getWeather(city: "Novosibirsk", countryCode: "RU") {
        main {
          temp
        }
      }
    }
  `
}).then(
  result => console.log(result) 
)

function App() {

  return (
    <div style={{flexGrow: 1}}>
      <Container maxWidth='lg'>
        <Header/>
        <Main/>
      </Container>
    </div>
  );
}

export default App;
