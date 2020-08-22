import React from 'react';
import './App.css';
import {Registration} from "./components/Registration";
import {Login} from "./components/Login";
import {HomePage} from "./components/homePage/homePage";
import {FeedPage} from "./components/feedPage/FeedPage";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Route path="/registration" component={Registration}/>
              <Route path="/login" render={ () => <Login />}/>
              <Route path="/home" render={ () => <HomePage />}/>
              <Route path="/feed" component={FeedPage}/>
          </div>
      </BrowserRouter>

  );
}

export default App;
