import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import NavbarComp from './components/navbar';
import Roster from './components/rosters';
import Team from './components/team';
import LeagueCompiler from './components/leaguecompiler';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rankings from './components/rankings';
import Footer from './components/footer';
import Trade from './components/trade'


function App() {
  return (
    <div className="App">
      <NavbarComp/>
        <div className="main">
          <Route path="/" exact component={Home} />
          <Route path="/rankings" exact component={Rankings} />
          <Route path="/rosters" exact component={Roster} />
          <Route path="/team/:id" exact component={Team} />
          <Route path="/about" exact component={About} />
          <Route path="/compile" exact component={LeagueCompiler} />
          <Route path="/trade" exact component={Trade} />
        </div>
      <Footer/>
    </div>
  );
}

export default App;
