import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main.components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main1 from './components/main.deceased';
import Main2 from './components/main.addpayee';
import Main3 from './components/main.claimwill';

function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
    
      <header className="App-header">
        
        <Routes>
       <Route path="/" element={<Main/>}/>
       <Route path="/Deceased" element={<Main1/>}/>
       <Route path="/AddPayee" element={<Main2/>}/>
       <Route path="/ClaimWill" element={<Main3/>}/>
       
       </Routes>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
