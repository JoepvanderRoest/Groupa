import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BoardOverview from './pages/BoardOverview'
import Board from './pages/Board'
import Header from './navigation/Header'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#92d5d3",
      },
      secondary: {
        main: '#ff7f6c',
      },
      action: {
        main: '#c4ffb2',
      },      
      tirth: {
        main: '#ffda80',
      },
    },
  });

    return <ThemeProvider theme={theme}>
        <Router>
    <main className="App-content">
      <Header/>
    <Routes>
      <Route path="/" exact={true} element={<BoardOverview/>} />
      <Route path="/board/:board_id" exact={true} element={<Board/>} />
      </Routes>
      </main>
      </Router>
      </ThemeProvider>
}

export default App;
