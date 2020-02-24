import React from 'react';
import { Container } from '@material-ui/core';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

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
