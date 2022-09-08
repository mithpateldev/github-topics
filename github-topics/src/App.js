import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import TopicLists from './components/TopicLists';
import TopicDetails from './components/TopicDetails';
import Layout from './components/Layout';


function App() {
  return (
    <div className="App" data-testid='app'>
      <main>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />} >
              <Route path="/" element={<TopicLists />} />
              <Route path="/:topic" element={<TopicDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
