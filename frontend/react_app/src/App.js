import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import NavbarComp from './components/navbar';
import Roster from './components/rosters';
import Team from './components/team';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <NavbarComp/>
        <Route path="/" exact component={Home} />
        <Route path="/rosters" exact component={Roster} />
        <Route path="/team/:id" exact component={Team} />
        <Route path="/about" exact component={About} />
    </div>
  );
}

export default App;
